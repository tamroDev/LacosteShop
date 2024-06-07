const collections = document.querySelector(".btn-scroll");

collections.addEventListener("click", () => {
  var targetPosition = document.getElementById("collection").offsetTop * 7;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
});

const imageColor = [
  "/img/men/2.avif",
  "/img/men/4.avif",
  "/img/men/5.avif",
  "/img/men/7.avif",
  "/img/men/5.avif",
];

const colors = document.querySelectorAll(".color-product");

colors.forEach((item) => {
  const color = item.querySelectorAll("div");

  color.forEach((item, index) => {
    let oldSrc;
    item.addEventListener("mouseover", (e) => {
      const parentElement = e.target.parentNode.parentNode;
      const image = parentElement.querySelector(".img-product img");
      oldSrc = image.src;
      image.src = imageColor[index];
    });

    item.addEventListener("mouseleave", (e) => {
      const parentElement = e.target.parentNode.parentNode;
      const image = parentElement.querySelector(".img-product img");
      image.src = oldSrc;
    });
  });
});
