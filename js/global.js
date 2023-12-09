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

//Scroll enable/disable

let scrollPos = 0; //Variable to store current scroll positon

function scrollDisable() {
  document.body.classList.add('scroll--disabled');
  scrollPos = window.scrollY;
}

function scrollEnable() {
  document.body.classList.remove('scroll--disabled');
  window.scrollTo(0, scrollPos)
}


//Show and hide nav menu when scrolling up and down

let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("nav");
const navbarHeight = navbar.offsetHeight;

window.onscroll = function () {
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


//Show and hide contact card

const contact = document.getElementById("contact");
const contactCard = document.getElementById("contact__card");
const triggerOpen = document.getElementById("trigger--open");
const triggerClose = document.getElementById("trigger--close");
const triggerCloseBg = document.getElementById("contact__bg");


function showContact() {
  scrollDisable();
  contact.classList.remove('is--hidden');
  setTimeout(function () {
    triggerCloseBg.classList.remove('is--transparent');
    contactCard.classList.add('slide--left');
    contactCard.classList.remove('slide--right');
  }, 50)
}

function hideContact() {
  scrollEnable();
  triggerCloseBg.classList.add('is--transparent');
  contactCard.classList.remove('slide--left');
  contactCard.classList.add('slide--right');
  setTimeout(function () { contact.classList.add("is--hidden") }, 250);
}

triggerOpen.addEventListener('click', function () { showContact(); });
triggerClose.addEventListener('click', function () { hideContact(); });
triggerCloseBg.addEventListener('click', function () { hideContact(); });
