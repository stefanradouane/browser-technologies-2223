// Variables
const image = document.querySelector("[data-image]");
const input = document.querySelector("[data-input]");
const display = document.querySelector("[data-display]");
const form = document.querySelector("[data-form]");
const label = document.querySelector("[data-label]");

if (input && image) {
  /**
   * Show the input with the file as the first input field
   */
  // label.style.order = "-1";

  /**
   * Create and display @file after input
   */
  input.addEventListener("change", (e) => {
    // Check if FileReader is availible
    if (window.FileReader) {
      const file = input.files[0];
      if (!file) {
        display.classList.remove("image-form__display--active");
        form.reset();
        return (image.src = "");
      }
      fillFormBasedOnFile(form, file);
    } else {
      // Fallback for when there is no filereader in the window.
      // I did not make a fallback, so if filereader is not availible.
      // Then the image will never be showed.
    }
    // const reader = new FileReader();

    // reader.onload = (e) => {
    //   image.src = e.target.result;
    //   display.classList.add("image-form__display--active");

    //   const file = e.target;
    //   const view = new DataView(new ArrayBuffer(file.result));
    //   console.log(view);
    // };

    // if (!file) {
    //   display.classList.remove("image-form__display--active");
    //   return (image.src = "");
    // }
    // reader.readAsDataURL(file);
  });
}

function fillFormBasedOnFile(form, file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (e) => {
    image.src = e.target.result;
    display.classList.add("image-form__display--active");
  };

  console.log(file);
  const inputArray = Array.from(form).filter((input) => input.accept == "");
  inputArray.forEach((input) => {
    if (input.name == "img-name") {
      input.value = file.name.split(".")[0];
    } else if (input.name == "img-date") {
      input.valueAsDate = file.lastModifiedDate;
    } else if (input.name == "img-location") {
      input.value = "onbekend";
    }
  });
}

// return new Promise((resolve, reject) => {
//   const reader = new FileReader()
//   resolve()

//   reject('Geen EXIF data gevonden')
// })

// Variables
const input_list = document.querySelector("[data-list-input]");
const input_caroussel = document.querySelector("[data-caroussel-input]");
const caroussel = document.querySelector("[data-caroussel]");

// Define the class names
// These class names are used by css to change the styling
const classCaroussel = "caroussel__form--caroussel";
const classLijst = "caroussel__form--list";
const carItems = caroussel
  ? Array.from(caroussel.querySelector("section>section").children)
  : null;

// Change the class on change of the radio buttons
if (input_list && input_caroussel) {
  input_list.addEventListener("change", (e) => {
    if (input_list.checked) {
      caroussel.classList.toggle(classCaroussel);
      caroussel.classList.toggle(classLijst);
      carItems.forEach((item, i) => {
        item.classList.remove("active");
        obeserver.unobserve(item);
      });
    }
  });

  input_caroussel.addEventListener("change", (e) => {
    if (input_caroussel.checked) {
      caroussel.classList.toggle(classCaroussel);
      caroussel.classList.toggle(classLijst);

      carItems.forEach((item, i) => {
        obeserver.observe(item);
        if (i == 0) {
          item.classList.add("active");
        }
      });
    }
  });
}

// Caroussel

const scrollCarrousel = caroussel
  ? caroussel.querySelector("section>section")
  : null;
let index = 0;

function newIndex(sum) {
  return sum > carItems.length - 1 ? carItems.length - 1 : sum;
}

function activeResetAndSet(activeIndex) {
  carItems.forEach((item) => {
    item.classList.remove("active");
  });

  carItems[activeIndex].classList.add("active");
}

const prevBtn = document.querySelector("[data-prev]");
const nextBtn = document.querySelector("[data-next]");
const scroller = document.querySelector(".slider");

if (prevBtn && nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToNextItem();
  });
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToPrevItem();
  });
}

function scrollToNextItem() {
  const itemWidth = carItems[0].clientWidth;

  if (scroller.scrollLeft < scroller.scrollWidth - itemWidth) {
    index = newIndex(index + 1);
    // activeResetAndSet(index);

    scroller.scrollBy({ left: itemWidth, top: 0, behavior: "smooth" });
  }
  // The scroll position is not at the beginning of last item
  // Last item reached. Go back to first item by setting scroll position to 0
  else {
    index = 0;
    // activeResetAndSet(index);
    scroller.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }
}
function scrollToPrevItem() {
  const itemWidth = carItems[0].clientWidth;

  if (scroller.scrollLeft != 0) {
    index = index - 1;
    // activeResetAndSet(index);
    // The scroll position is not at the beginning of first item
    scroller.scrollBy({ left: -itemWidth, top: 0, behavior: "smooth" });
  }
  // This is the first item. Go to last item by setting scroll position to scroller width
  else {
    index = carItems.length - 1;
    // activeResetAndSet(index);
    scroller.scrollTo({
      left: scroller.scrollWidth,
      top: 0,
      behavior: "smooth",
    });
  }
}

let obeserver;
if ("IntersectionObserver" in window) {
  obeserver = new IntersectionObserver(
    (entries, cb) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          index = carItems.indexOf(entry.target);
          const event = new Event("intersect");
          dispatchEvent(event);
        }
      });
    },
    { threshold: 0.5 }
  );
} else {
  // Make sure the active class is removed from everything
  carItems.forEach((item) => {
    item.classList.add("no-observer");
  });
}

// Make an item active
window.addEventListener(
  "intersect",
  debounce((e) => {
    carItems.filter((item) => item == e.target);
    activeResetAndSet(index);
  }, 100)
);

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const detailpage = document.querySelector(".detailpage");
const detailimage = detailpage?.querySelector("img");

if (detailpage && detailimage) {
  console.log(detailimage);
}
