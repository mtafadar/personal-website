function filterBlogs() {
  const searchInput = document.getElementById("searchInput");
  const searchValue = searchInput.value.toLowerCase();
  const blogItems = document.getElementsByClassName("blog-item");

  for (let i = 0; i < blogItems.length; i++) {
    const tags = blogItems[i].getElementsByClassName("tag");
    let found = false;

    for (let j = 0; j < tags.length; j++) {
      const tagText = tags[j].textContent.toLowerCase();

      if (tagText.indexOf(searchValue) > -1) {
        found = true;
        break;
      }
    }

    if (found) {
      blogItems[i].style.display = "block";
    } else {
      blogItems[i].style.display = "none";
    }
  }
}

// Add event listener to search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", filterBlogs);
