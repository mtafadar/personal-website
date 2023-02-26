
const sections = document.querySelectorAll(".section");
      const buttons = document.querySelectorAll(".option");
      
      buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
          console.log(`Button ${index + 1} clicked`);
          sections.forEach((section) => {
            section.style.display = "none";
          });
          sections[index].style.display = "block";
        });
      });
