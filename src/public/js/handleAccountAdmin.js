window.addEventListener("DOMContentLoaded", () => {
  const tdSelect = document.querySelectorAll(".select");
  const selectStatus = document.querySelectorAll(".selectStatus");

  tdSelect.forEach((item) => {
    const select = item.querySelector("select");
    const role = item.querySelector(".role").textContent.trim();
    select.querySelectorAll("option").forEach((option) => {
      if (option.value === role) {
        option.setAttribute("selected", "selected");
      }
    });
  });

  selectStatus.forEach((item) => {
    const select = item.querySelector("select");
    const role = item.querySelector(".role").textContent.trim();
    select.querySelectorAll("option").forEach((option) => {
      if (option.value === role) {
        option.setAttribute("selected", "selected");
      }
    });
  });

  const select = document.querySelectorAll(".select select");
  const formUpdate = document.querySelector(".form-update-role");
  select.forEach((item) => {
    item.addEventListener("change", () => {
      const role = formUpdate.querySelector("input");
      role.value = item.value;
      const id = item.getAttribute("data-id");
      formUpdate.action = `/admin/account/${id}/updateRole?_method=PATCH`;
      formUpdate.submit();
    });
  });

  const selectStatus2 = document.querySelectorAll(".selectStatus select");
  const formStatus = document.querySelector(".form-update-status");

  selectStatus2.forEach((item) => {
    item.addEventListener("change", () => {
      const status = formStatus.querySelector("input");
      status.value = item.value;
      const id = item.getAttribute("data-id");
      formStatus.action = `/admin/account/${id}/updateStatus?_method=PATCH`;
      formStatus.submit();
    });
  });
});
