const listImg = document.querySelectorAll(".list-img .img-more");
const oldImg = document.querySelector(".img-product img");

listImg.forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    const imgFocus = item.querySelector("img");

    listImg.forEach((img) => {
      img.querySelector("img").classList.remove("blur");
    });

    imgFocus.classList.add("blur");

    oldImg.src = imgFocus.src;
  });
});
