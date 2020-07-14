(function() {
  const copyright = document.querySelector(".copyright__year");
  const year = new Date().getFullYear();
  copyright.innerHTML = year;
})();
