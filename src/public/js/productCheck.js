const form = document.querySelector("form");

const inputs = document.querySelectorAll("input");
const input = [...inputs].slice(1);
const text = form.querySelector("textarea");

form.addEventListener("submit", (e) => {
  if (text.value.length === 0) {
    text.classList.add("check");
  }
  input.forEach((item) => {
    if (item.value.length === 0) {
      item.classList.add("check");
      e.preventDefault();
    }

    item.addEventListener("focus", (e) => {
      item.classList.remove("check");
    });

    text.addEventListener("click", (e) => {
      if (e.target === text) {
        text.classList.remove("check");
      }
    });
  });
});

// Nếu tất cả các trường input đều hợp lệ, thực hiện hành động mặc định của form (gửi đi)
