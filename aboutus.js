(function () {
  const burger3 = document.querySelector(".burger3");
  const burger = document.querySelector(".burger");
  const navMiddle = document.querySelector(".navMiddle");

  burger.addEventListener("click", () => {
    navMiddle.classList.toggle("mobile-menu");
  });

  burger3.addEventListener("click", function () {
    return burger3.classList.toggle("on");
  });
}).call(this);
