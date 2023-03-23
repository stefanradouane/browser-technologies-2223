console.log("hello")

const degradeBtn = document.querySelector("[data-slideshow-degrade]")
const enhanceBtn = document.querySelector("[data-slideshow-enhance]")
const enhanceImgs = document.querySelectorAll("[data-slideshow-image]")

const active = "card__slideshow-image--active";
let index = 0;


degradeBtn.addEventListener("click", (e) => {
    e.preventDefault()
    slideshow(false)
})
enhanceBtn.addEventListener("click", (e) => {
    e.preventDefault()
    slideshow(true)
})

function slideshow(enhance) {
    if (enhance) {
        if (enhanceImgs.length - 1 == index) {
            return
        }

        degradeBtn.removeAttribute("disabled", true)

        enhanceImgs[index].classList.remove(active)
        index = index + 1
        enhanceImgs[index].classList.add(active)

        if (enhanceImgs.length - 1 == index) {
            enhanceBtn.setAttribute("disabled", true)
            return
        } else {
            enhanceBtn.removeAttribute("disabled", true)
        }
    } else {
        if (index == 0) {
            return
        }
        enhanceBtn.removeAttribute("disabled", true)

        enhanceImgs[index].classList.remove(active)
        index = index - 1
        enhanceImgs[index].classList.add(active)

        if (index == 0) {
            degradeBtn.setAttribute("disabled", true)
            return
        } else {
            degradeBtn.removeAttribute("disabled", true)
        }
    }
}