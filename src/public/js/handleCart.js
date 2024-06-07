const prices = document.querySelectorAll(".price");
const quantitys = document.querySelectorAll(".quantity input");
const data1 = document.querySelector(".dt1");
const data2 = document.querySelector(".dt2");
const data3 = document.querySelector(".dt3");
const output = document.querySelector(".number-total");

let totalPrice = 0;
let totalQuantity = 0;
prices.forEach((item, index) => {
  totalPrice += Number(item.textContent.split(" ")[0]);

  totalQuantity += Number(quantitys[index].value);
});

data1.textContent = totalQuantity;
data2.textContent = totalPrice + " EUR";

output.textContent =
  totalPrice -
  totalPrice / Number(data3.textContent.split("").slice(0, 2).join("")) +
  " EUR";

const quantity2 = document.querySelectorAll(".quantity");

const totalCart = () => {
  let totalPrice = 0;
  let totalQuantity = 0;
  const quantitys = document.querySelectorAll(".quantity input");
  const data1 = document.querySelector(".dt1");
  const data2 = document.querySelector(".dt2");
  const data3 = document.querySelector(".dt3");
  const output = document.querySelector(".number-total");

  quantitys.forEach((item, current) => {
    const price = item.value * prices[current].textContent.split(" ")[0];

    totalPrice += price;
    totalQuantity += Number(item.value);
  });

  data1.textContent = totalQuantity;
  data2.textContent = totalPrice + " EUR";
  output.textContent =
    totalPrice -
    totalPrice / Number(data3.textContent.split("").slice(0, 2).join("")) +
    " EUR";
};

quantity2.forEach((item, current) => {
  const minus = item.querySelector(".minus");
  const plus = item.querySelector(".plus");
  let total = item.querySelector(".total-quantity");
  let index = 1;

  const quantitys = document.querySelectorAll(".quantity input");

  minus.addEventListener("click", (e) => {
    index--;
    if (index <= 1) {
      index = 1;
    }

    total.value = index;
    totalCart();
  });

  plus.addEventListener("click", (e) => {
    index++;

    total.value = index;
    totalCart();
  });
});
