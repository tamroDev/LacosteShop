document.addEventListener("DOMContentLoaded", () => {
  const noti = document.querySelector(".noti p");
  const img = document.querySelector(".noti img");

  if (noti) {
    if (noti.textContent === "Registration failed") {
      noti.style.color = "red";
      img.src = "/img/account/x-circle-16-solid.svg";
    }
  }
  const form = document.querySelector(".form-register");

  form.addEventListener("submit", (e) => {
    const listInput = form.querySelectorAll("input");
    const lable = form.querySelector(".text-checkbox");

    const inputValue = [...listInput].slice(0, 5);
    const inputCheckbox = [...listInput].slice(5, 6)[0];

    if (!inputCheckbox.checked) {
      lable.classList.add("cl-red");
    }
    lable.addEventListener("click", () => lable.classList.remove("cl-red"));

    inputValue.forEach((input) => {
      if (input.value.length <= 0) {
        input.classList.add("check-border");
        e.preventDefault();
      }

      input.addEventListener("focus", (e) => {
        input.classList.remove("check-border");
      });
    });
  });
});
