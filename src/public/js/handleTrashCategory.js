document.addEventListener("DOMContentLoaded", () => {
  const listBtnRestore = document.querySelectorAll(".btn-restore");
  const listBtnDelete = document.querySelectorAll(".btn-delete");
  let product_id;
  const formDelete = document.forms["delete-category-form"];
  const formRestore = document.forms["restore-category-form"];
  const btnDelete = document.getElementById("btn-delete-coure");

  listBtnRestore.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      product_id = item.getAttribute("data-id");
      formRestore.action =
        "/admin/category/" + product_id + "/restore?_method=PATCH";
      formRestore.submit();
    });
  });

  listBtnDelete.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      product_id = item.getAttribute("data-id");
    });
    btnDelete.addEventListener("click", (e) => {
      formDelete.action =
        "/admin/category/" + product_id + "/hardDelete?_method=DELETE";
      formDelete.submit();
    });
  });
});
