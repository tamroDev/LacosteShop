document.addEventListener("DOMContentLoaded", function () {
  var video = document.getElementById("myVideo");
  var pauseBtn = document.getElementById("pauseBtn");
  var pauseIcon = document.querySelector("#pauseBtn i");

  // Hàm dừng video
  function pauseVideo() {
    if (!video.paused) {
      video.pause();
      pauseIcon.classList.remove("fa-pause");
      pauseIcon.classList.add("fa-play");
    }
  }

  // Hàm chạy video
  function playVideo() {
    if (video.paused) {
      video.play();
      pauseIcon.classList.remove("fa-play");
      pauseIcon.classList.add("fa-pause");
    }
  }

  // Khi click vào nút pause
  pauseBtn.addEventListener("click", function () {
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });

  // Xác định khi nào video hiển thị trong viewport
  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Trigger khi video hiển thị 50% trong viewport
  };

  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        playVideo();
      } else {
        pauseVideo();
      }
    });
  }, options);

  observer.observe(video);
});
