(function (window, document) {
  "use strict";

  var ITEM_SELECTOR = "[data-pswp-gallery='article-reader-gallery']";

  function positiveNumber(value) {
    var number = parseInt(value, 10);
    return number > 0 ? number : 0;
  }

  function imageSize(anchor) {
    var image = anchor.querySelector("img");
    var width = image ? positiveNumber(image.naturalWidth || image.getAttribute("width")) : 0;
    var height = image ? positiveNumber(image.naturalHeight || image.getAttribute("height")) : 0;
    if (!width || !height) {
      width = 1600;
      height = 1200;
    }
    return { width: width, height: height };
  }

  function prepareAnchor(anchor) {
    var size = imageSize(anchor);
    anchor.setAttribute("data-pswp-width", String(size.width));
    anchor.setAttribute("data-pswp-height", String(size.height));
    var image = anchor.querySelector("img");
    if (image && !image.complete && !image.__wfPhotoSwipeSizeBound) {
      image.__wfPhotoSwipeSizeBound = true;
      image.addEventListener("load", function () {
        var loadedSize = imageSize(anchor);
        anchor.setAttribute("data-pswp-width", String(loadedSize.width));
        anchor.setAttribute("data-pswp-height", String(loadedSize.height));
      }, { once: true });
    }
  }

  function prepareGallery(root) {
    Array.prototype.slice.call((root || document).querySelectorAll(ITEM_SELECTOR)).forEach(prepareAnchor);
  }

  function captionText(itemData) {
    var element = itemData && itemData.element;
    return element ? String(element.getAttribute("data-caption") || "").trim() : "";
  }

  function init() {
    prepareGallery(document);
    if (window.__wfArticlePhotoSwipe || !document.querySelector(ITEM_SELECTOR)) {
      return;
    }
    if (!window.PhotoSwipe || !window.PhotoSwipeLightbox) {
      return;
    }

    var lightbox = new window.PhotoSwipeLightbox({
      gallery: ".aiph-richtext",
      children: ITEM_SELECTOR,
      pswpModule: window.PhotoSwipe,
      bgOpacity: 0.94,
      showHideAnimationType: "fade",
      closeOnVerticalDrag: false,
      pinchToClose: false,
      wheelToZoom: true,
      imageClickAction: "zoom-or-close",
      tapAction: "toggle-controls",
      doubleTapAction: "zoom",
      secondaryZoomLevel: 2,
      maxZoomLevel: 4,
      preload: [1, 2],
      returnFocus: true,
      closeTitle: "关闭图片预览",
      zoomTitle: "缩放图片",
      arrowPrevTitle: "上一张图片",
      arrowNextTitle: "下一张图片",
      indexIndicatorSep: " / ",
      errorMsg: "图片加载失败，请稍后重试。",
      paddingFn: function (viewportSize) {
        return viewportSize.x <= 720
          ? { top: 58, bottom: 82, left: 10, right: 10 }
          : { top: 54, bottom: 86, left: 28, right: 28 };
      }
    });

    lightbox.addFilter("itemData", function (itemData) {
      if (itemData.element) {
        prepareAnchor(itemData.element);
        var size = imageSize(itemData.element);
        itemData.width = size.width;
        itemData.height = size.height;
      }
      return itemData;
    });

    lightbox.on("uiRegister", function () {
      lightbox.pswp.ui.registerElement({
        name: "wf-caption",
        order: 9,
        isButton: false,
        appendTo: "root",
        html: "",
        onInit: function (element, pswp) {
          function updateCaption() {
            var text = captionText(pswp.currSlide && pswp.currSlide.data);
            element.textContent = text;
            element.hidden = !text;
          }
          pswp.on("change", updateCaption);
          updateCaption();
        }
      });
    });

    lightbox.init();
    window.__wfArticlePhotoSwipe = lightbox;
  }

  window.WfArticlePhotoSwipe = {
    init: init,
    refresh: function (root) {
      prepareGallery(root || document);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})(window, document);
