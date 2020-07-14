import { h } from "preact";
import { useEffect } from "preact/hooks";

(function() {
  const scrollButton = document.querySelector(".scrollButton");
  if (scrollButton) {
    const OFFSET = 50;

    window.addEventListener("scroll", onScroll);

    scrollButton.addEventListener("click", onScrollButtonClick);

    function onScroll() {
      if (document.body.scrollTop > OFFSET || document.documentElement.scrollTop > OFFSET) {
        scrollButton.classList.remove("scrollButton--hidden");
      } else {
        scrollButton.classList.add("scrollButton--hidden");
      }
    }

    function onScrollButtonClick() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
})();
