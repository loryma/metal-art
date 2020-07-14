function setMasonry() {
  let masonries = document.querySelectorAll(".masonry");
  const masonryEvents = ["load", "resize"];

  function resizeMasonryItem(grid, item) {
    let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap") || 16);

    let itemHeight = item.querySelector("img").getBoundingClientRect().height;
    let rowHeightWithGap = rowGap;
    let span = Math.ceil(itemHeight / rowHeightWithGap);
    // if (item.style.gridRowEnd) {
    item.style.gridRowEnd = "span " + span;
    // }
  }

  function resizeAllMasonryItems() {
    for (let i = 0; i < masonries.length; i++) {
      const masonry = masonries[i];

      let allItems = masonry.querySelectorAll(".brick");

      for (let i = 0; i < allItems.length; i++) {
        resizeMasonryItem(masonry, allItems[i]);
      }
    }
  }

  for (let i = 0; i < masonries.length; i++) {
    const masonry = masonries[i];
    masonry.dataset.count = 0;
    const items = masonry.querySelectorAll(".brick");

    for (let n = 0; n < items.length; n++) {
      const img = items[n].querySelector("img");
      img.addEventListener("load", onImageLoad);
    }

    function onImageLoad(e) {
      masonry.dataset.count = Number(masonry.dataset.count) + 1;
      if (+masonry.dataset.count == masonry.childElementCount) {
        for (let p = 0; p < items.length; p++) {
          resizeMasonryItem(masonry, items[p]);
        }
        masonry.style.minHeight = "initial";
      }
    }
  }

  masonryEvents.forEach(function(event) {
    window.addEventListener(event, resizeAllMasonryItems);
  });
}

export default setMasonry;
