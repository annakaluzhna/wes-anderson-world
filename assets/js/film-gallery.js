window.Fancybox?.bind("[data-fancybox]", {
  Carousel: { transition: "fade", Panzoom: { touch: true } },
  wheel: "slide",
  contentClick: "toggleZoom",
  Images: { Panzoom: { maxScale: 2 } }
});
