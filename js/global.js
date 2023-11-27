const swup = new Swup();

swup.on('pageView', () => {
  // This runs after every page change

  function scrollTop() {
    setTimeout(function () {
      window.scrollTo(0, 0)}, 50);
  }

  scrollTop();
});