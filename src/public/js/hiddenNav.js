const nav = document.querySelector(".nav");
const banner = document.querySelector(".banner");
let lastScrollPosition = window.scrollY;

window.addEventListener("scroll", (e) => {
  let currentScrollPosition = window.scrollY;

  if (currentScrollPosition >= 60) {
    if (currentScrollPosition > lastScrollPosition) {
      nav.classList.add("hidden");
    } else if (currentScrollPosition < lastScrollPosition) {
      nav.classList.remove("hidden");
    }
  }

  lastScrollPosition = currentScrollPosition;
});
