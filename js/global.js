const swup = new Swup();

swup.on('pageView', () => {
  // This runs after every page change

  function scrollTop() {
    setTimeout(function () {
      window.scrollTo(0, 0)
    }, 50);
  }

  scrollTop();
});


let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("nav");
const navbarHeight = navbar.offsetHeight;

window.onscroll = function() {
  const currentScrollPos = window.pageYOffset;
  if ((prevScrollPos > currentScrollPos) || (currentScrollPos <= 24)) {
    navbar.classList.remove('slide--up');
    navbar.classList.add('slide--down');
  } else {
    navbar.classList.add('slide--up');
    navbar.classList.remove('slide--down');
  }
  prevScrollPos = currentScrollPos;
};