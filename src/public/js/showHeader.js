const listNav = document.querySelectorAll("nav ul li");
const bottomHeader = document.querySelector(".bottom-header");
const offHeader = document.querySelector(".offHeader");

listNav.forEach((item) => {
  item.addEventListener("click", (e) => {
    bottomHeader.classList.remove("hidden-header");
    offHeader.classList.remove("hiddenOffHeader");
  });
});

document.addEventListener("click", (e) => {
  if (
    e.target !== bottomHeader &&
    !bottomHeader.contains(e.target) &&
    ![...listNav].includes(e.target)
  ) {
    bottomHeader.classList.add("hidden-header");
    offHeader.classList.add("hiddenOffHeader");
  }
});

const directionalItem = document.querySelectorAll(".directional-item");

if ([...directionalItem].length <= 5) {
  bottomHeader.classList.add("grid-4");
}
