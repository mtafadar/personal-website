import base64
import hashlib
import requests
import secrets
from snowflake.snowpark import Session
from util.user import User
from flask import Flask, redirect, request, session, url_for
from flask_cors import CORS
from util.user import User
from config import config
from flask import Blueprint
from flask_login import login_required

from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)


auth = Blueprint('auth', __name__)


@auth.route("/")
@login_required
def home():
    print("Hello")
    # This check is now redundant since 'signin' is within the same blueprint
    signin_url = url_for('auth.signin')
    print(f"URL for signin: {signin_url}")
    return redirect(signin_url)


@auth.route('/signin', methods=['GET', 'POST'])
def signin():
    # store app state and code verifier in session
    session['app_state'] = secrets.token_urlsafe(64)
    session['code_verifier'] = secrets.token_urlsafe(64)

    # calculate code challenge
    hashed = hashlib.sha256(session['code_verifier'].encode('ascii')).digest()
    encoded = base64.urlsafe_b64encode(hashed)
    code_challenge = encoded.decode('ascii').strip('=')

    # get request params
    query_params = {'client_id': config["client_id"],
                    'redirect_uri': config["redirect_uri"],
                    'scope': "openid email profile",
                    'state': session['app_state'],
                    'code_challenge': code_challenge,
                    'code_challenge_method': 'S256',
                    'response_type': 'code',
                    'response_mode': 'query'}
    # build request_uri
    request_uri = "{base_url}?{query_params}".format(
        base_url=config["auth_uri"],
        query_params=requests.compat.urlencode(query_params)
    )
    print("Build request was successful, redirecting to request url")
    return redirect(request_uri)


@auth.route("/authorization-code/callback")
def callback():
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    code = request.args.get("code")
    app_state = request.args.get("state")
    if app_state != session['app_state']:
        return "The app state doesn't match"
    if not code:
            return "The code wasn't returned or isn't accessible", 403
    query_params = {'grant_type': 'authorization_code',
                    'code': code,
                    'redirect_uri': request.base_url,
                    'code_verifier': session['code_verifier'],
                    }
    query_params = requests.compat.urlencode(query_params)
    exchange = requests.post(
        config["token_uri"],
        headers=headers,
        data=query_params,
        auth=(config["client_id"], config["client_secret"]),
    ).json()

    # Get tokens and validate
    if not exchange.get("token_type"):
            return "Unsupported token type. Should be 'Bearer'.", 403
    access_token = exchange["access_token"]
    id_token = exchange["id_token"]

    # Authorization flow successful, get userinfo and sign in user
    userinfo_response = requests.get(config["userinfo_uri"],
                                    headers={'Authorization': f'Bearer {access_token}'}).json()
    print(userinfo_response)

    unique_id = userinfo_response["sub"]
    user_email = userinfo_response["email"]
    user_name = userinfo_response["given_name"]


    user = User(
        id_=unique_id, 
        name=user_name, 
        email=user_email
    )
    if not User.get(unique_id):
            User.create(unique_id, user_name, user_email)
            

    login_user(user)
    return redirect(url_for("main.profile"))


