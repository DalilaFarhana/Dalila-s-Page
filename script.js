const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

  menuButton.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuButton.textContent = isOpen ? "✕" : "☰";

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });

}

const categories = document.querySelectorAll(".category-card");
const sections = document.querySelectorAll(".portfolio-section");

categories.forEach(function (button) {

  button.addEventListener("click", function () {

    const category = button.dataset.category;

    categories.forEach(function (item) {

      item.classList.toggle(
        "active",
        item === button
      );

    });

    sections.forEach(function (section) {

      section.classList.toggle(
        "active",
        section.id === category
      );

    });

  });

});

const commentForm = document.getElementById("commentForm");

if (commentForm) {

  commentForm.addEventListener(
    "submit",
    async function (event) {

      // Stay on the same page
      event.preventDefault();

      const submitButton = commentForm.querySelector(
        'button[type="submit"]'
      );

      const formStatus = document.getElementById(
        "formStatus"
      );

      submitButton.disabled = true;

      if (formStatus) {
        formStatus.textContent = "Sending your message...";
      }

      try {

        const response = await fetch(
          commentForm.action,
          {
            method: "POST",
            body: new FormData(commentForm),
            headers: {
              "Accept": "application/json"
            }
          }
        );

        if (response.ok) {

          alert(
            "Your message has been sent successfully!\n\n" +
            "Thank you for your feedback. ♡"
          );

          commentForm.reset();

          if (formStatus) {
            formStatus.textContent = "";
          }

        }

        else {

          alert(
            "Sorry! Your message could not be sent.\n\n" +
            "Please try again."
          );

          if (formStatus) {
            formStatus.textContent =
              "Message not sent. Please try again.";
          }

        }

      }

      catch (error) {

        alert(
          "Connection error!\n\n" +
          "Please check your internet connection."
        );

        if (formStatus) {
          formStatus.textContent =
            "Connection error. Please try again.";
        }

      }

      finally {

        submitButton.disabled = false;

      }

    }
  );

}
