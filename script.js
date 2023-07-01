window.addEventListener('load', function() {
  var coll = document.getElementsByClassName("project_collapse");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      // Check if the button clicked is the "Blogging" button
      if (this.innerText.trim() === "Blogging") {
        // Redirect to a different HTML page
        window.location.href = "blogging/blog-main.html";
        return; // Stop further execution of the function
      }

      // Toggle the active class
      this.classList.toggle("active");

      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
});

