from flask import Blueprint, render_template
from flask_login import login_required
import toml
import base64
import hashlib
import requests
import secrets
import toml
from snowflake.snowpark import Session
from util.user import User
from flask import Flask, render_template, redirect, request, session, url_for
from flask_cors import CORS
from util.user import User
from config import config




from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)

main = Blueprint('main', __name__)

@main.route("/thankyou")
@login_required
def thankyou():
    return render_template("thankyou.html")



def read_secrect_data():
    toml_file_path = ".secrets/secret.toml"
    secrect_data = {}

    try:
        with open(toml_file_path, "r") as file:
            data = toml.load(file)
            snowflake_data = data.get("snowflake")

            if snowflake_data:
                secrect_data["user"] = snowflake_data.get("user")
                secrect_data["password"] = snowflake_data.get("password")
                secrect_data["account"] = snowflake_data.get("account")
            else:
                raise ValueError("'snowflake' section not found in the TOML file.")
    except FileNotFoundError:
        raise FileNotFoundError(f"File not found at {toml_file_path}")
    except Exception as e:
        raise Exception(f"An error occurred: {e}")
    return secrect_data




@main.route("/profile", methods=['GET', 'POST'])
@login_required
def profile():
    if request.method == 'POST':
        user_email = request.form['email']
        user_reason = request.form['reason']
        user_warehouse = request.form['warehouse']
        user_name = request.form['username']
        
        
        val = read_secrect_data()
        print(val)
        
        snowflake_username= val['user']
        snowflake_password = val['password']
        snowflake_account = val['account']
        
        
        connection_parameters = {
            "account": snowflake_account, 
            "user": snowflake_username,
            "password": snowflake_password,
            "database": "request",
            "schema":  "PUBLIC"
        }
    
        new_session = Session.builder.configs(connection_parameters).create()
        print(new_session)  
        sql = "INSERT INTO USER_DETAILS (USERNAME, EMAIL, OPTION, REASON) VALUES ('{}', '{}', '{}', '{}')".format(user_name,  user_email, user_warehouse, user_reason)
        print(sql)
        new_session.sql(sql).collect()
        return redirect(url_for('main.thankyou'))


    return render_template("profile.html", user=current_user)






##App.py for reference 

import base64
import hashlib
import requests
import secrets
import toml
from snowflake.snowpark import Session
from util.user import User
from flask import Flask, redirect, request, session, url_for
from flask_cors import CORS
from util.user import User
from config import config
from blueprints.main import main
from blueprints.auth import  auth

from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)


app = Flask(__name__)
app.config.update({'SECRET_KEY': secrets.token_hex(64)})
CORS(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.signin'


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


app.register_blueprint(auth)
app.register_blueprint(main)


@app.route("/signout", methods=["GET", "POST"])
@login_required
def signout():
    logout_user()
    session.clear() 
    return redirect(url_for('auth.signin'))

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
    
    

