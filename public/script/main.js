// Variables
const image = document.querySelector("[data-image]");
const input = document.querySelector("[data-input]");
const display = document.querySelector("[data-display]");

if (input && image) {
  /**
   * Create and display @file after input
   */
  input.addEventListener("change", (e) => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target.result;
      display.classList.add("image-form__display--active");
    };

    if (!file) {
      display.classList.remove("image-form__display--active");
      return (image.src = "");
    }
    reader.readAsDataURL(file);
  });
}

// Variables
const input_list = document.querySelector("[data-list-input]");
const input_caroussel = document.querySelector("[data-caroussel-input]");
const caroussel = document.querySelector("[data-caroussel]");

// Define the class names
// These class names are used by css to change the styling
const classCaroussel = "caroussel__form--caroussel";
const classLijst = "caroussel__form--list";

// Change the class on change of the radio buttons
if (input_list && input_caroussel) {
  input_list.addEventListener("change", (e) => {
    if (input_list.checked) {
      caroussel.classList.toggle(classCaroussel);
      caroussel.classList.toggle(classLijst);
    }
  });

  input_caroussel.addEventListener("change", (e) => {
    if (input_caroussel.checked) {
      caroussel.classList.toggle(classCaroussel);
      caroussel.classList.toggle(classLijst);
    }
  });
}
