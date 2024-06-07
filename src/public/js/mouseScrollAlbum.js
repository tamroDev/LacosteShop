document.addEventListener("DOMContentLoaded", function () {
  var isDown = false;
  var startX;
  var scrollLeft;

  var slider = document.querySelector(".card-album");

  slider.addEventListener("mousedown", function (e) {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", function () {
    isDown = false;
  });

  slider.addEventListener("mouseup", function () {
    isDown = false;
  });

  slider.addEventListener("mousemove", function (e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - slider.offsetLeft;
    var walk = (x - startX) * 1; // Tăng tốc độ cuộn
    slider.scrollLeft = scrollLeft - walk;
  });
});
