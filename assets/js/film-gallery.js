window.Fancybox?.bind("[data-fancybox]", {
  Carousel: { transition: "fade" },
  contentClick: "toggleZoom",
  Images: { Panzoom: { maxScale: 2 } }
});
