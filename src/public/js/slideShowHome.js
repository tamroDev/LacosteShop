const arrSlide = [
  {
    title: "LACOSTE FW24 FASHION SHOW",
    description:
      "Discover the looks of the Lacoste FW24 fashion show by Pelagia Kolotouros, the House's Creative Director.",
    action: "WATCH THE SHOW",
    img: "/img/home/slide-show-bottom.avif",
    backgroundColor: "#b79f83",
  },
  {
    title: "FRENCH FASHION SPORT",
    description:
      "Lacoste unveils its new signature look, a fashion and sport silhouette that celebrates its French heritage. Bold, minimalist, fashionable and contemporary.",
    action: "READ THE LACOSTE NEWS ARTICLE",
    img: "/img/home/slide-show-bottom-2.avif",
    backgroundColor: "#002d18",
  },
  {
    title: "LACOSTE X HIGHSNOBIETY",
    description:
      "Lacoste blends streetwear codes and tennis codes in a unique collaboration with cultural leader Highsnobiety, featuring the groundbreaking L003 2K24 sneaker and a textile capsule.",
    action: "DISCOVER",
    img: "/img/home/slide-show-bottom-3.avif",
    backgroundColor: "#d7c096",
  },
  {
    title: "CHAMPIONS' OUTFITS",
    description:
      "Support the Lacoste team with the outfits worn in Australia by Novak Djokovic and Daniil Medvedev. Combining performance and style, Arthur Fils, Bernarda Pera and all the other members of the team are also geared up for the first Grand Slam of the year.",
    action: "THE SPORTS SHOP",
    img: "/img/home/slide-show-bottom-4.avif",
    backgroundColor: "#457b9d",
  },
];
document.addEventListener("DOMContentLoaded", () => {
  const containerSlide = document.querySelector(".slide-show-bottom");
  const plus = document.querySelector(".plus");
  const minus = document.querySelector(".minus");
  const currentSlide = document.querySelector(".currentSlide");
  const totalSlide = document.querySelector(".totalSlide");
  const actionLink = document.querySelector(".action-link");
  const descriptionSlide = document.querySelector(".description-slide");
  const titleSlide = document.querySelector(".title-slide");
  const image = document.querySelector(".imageSlide");
  let indexValue = 0;

  totalSlide.textContent = arrSlide.length;

  plus.addEventListener("click", () => {
    indexValue++;

    if (indexValue > arrSlide.length - 1) {
      indexValue = 0;
    }

    currentSlide.textContent = indexValue + 1;

    const content = arrSlide[indexValue];

    // Thêm lớp active để kích hoạt hiệu ứng chuyển đổi
    containerSlide.classList.add("active");
    image.classList.add("active");

    setTimeout(() => {
      // Loại bỏ lớp active sau khi hiệu ứng kết thúc
      containerSlide.classList.remove("active");
      image.classList.remove("active");

      containerSlide.style.backgroundColor = content.backgroundColor;
      image.src = content.img;
      actionLink.textContent = content.action;
      descriptionSlide.textContent = content.description;
      titleSlide.textContent = content.title;
    }, 300); // Chờ 300ms, tương ứng với thời gian của hiệu ứng CSS
  });

  minus.addEventListener("click", () => {
    indexValue--;

    if (indexValue < 0) {
      indexValue = arrSlide.length - 1;
    }

    currentSlide.textContent = indexValue + 1;

    const content = arrSlide[indexValue];

    // Thêm lớp active để kích hoạt hiệu ứng chuyển đổi
    containerSlide.classList.add("active");
    image.classList.add("active");

    setTimeout(() => {
      // Loại bỏ lớp active sau khi hiệu ứng kết thúc
      containerSlide.classList.remove("active");
      image.classList.remove("active");

      containerSlide.style.backgroundColor = content.backgroundColor;
      image.src = content.img;
      actionLink.textContent = content.action;
      descriptionSlide.textContent = content.description;
      titleSlide.textContent = content.title;
    }, 300); // Chờ 300ms, tương ứng với thời gian của hiệu ứng CSS
  });
});
