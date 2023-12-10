const swup = new Swup();

swup.on('pageView', () => {
  // This runs after every page change

  scrollTop();
  getNewCol();
  checkHomeContactLink();
  projectCard();
});



//Scroll to page top
function scrollTop() {
  setTimeout(function () {
    window.scrollTo(0, 0)
  }, 50);
}





//Scroll Enable/Disable

let scrollPos = 0;

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

window.onscroll = function () {
  const subnav = document.getElementById("subnav");
  const currentScrollPos = window.pageYOffset;
  if ((prevScrollPos > currentScrollPos) || (currentScrollPos <= 24)) {
    navbar.classList.remove('slide--up');
    navbar.classList.add('slide--down');
    if (subnav) {
      subnav.classList.add('slide--up');
      subnav.classList.remove('slide--down');
    } else { }
  } else {
    navbar.classList.add('slide--up');
    navbar.classList.remove('slide--down');
    if (subnav) {
      setTimeout(function () {
        subnav.classList.remove('slide--up');
        subnav.classList.add('slide--down');
      }, 100)
    } else { }
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

//check if this page is homepage
function checkHomeContactLink() {

  const triggerOpenHome = document.getElementById("trigger--home");

  if (triggerOpenHome) {
    triggerOpenHome.addEventListener('click', function () { showContact(); });
  } else { }
}
checkHomeContactLink();





//Randomize accent colour from 4 options

const colours = ['#d3a226', '#05995c', '#a82c3e', '#3f46bf']


//assign color to designated elements
function changeCol(color) {
  const elements = document.querySelectorAll('.col--switch');
  const bgElements = document.querySelectorAll('.bgcol--switch');

  elements.forEach(element => {
    element.style.color = color;
  });

  bgElements.forEach(element => {
    element.style.background = color;
  });
}

//randomize between bank of colours and store the result
function getRandomCol() {
  const randomIndex = Math.floor(Math.random() * colours.length);
  return colours[randomIndex];
}

//run the previous two functions as one function
function getNewCol() {
  let accentCol = getRandomCol();
  changeCol(accentCol);
}

getNewCol();





//Project card hover interaction

function projectCard() {
  let projects = document.querySelectorAll('.project');

  projects.forEach(project => {
    const text = project.querySelector('.heading.is--dim');

    project.addEventListener('mouseover', function () {
      text.style.color = 'black';
    });

    project.addEventListener('mouseout', function () {
      text.style.color = 'rgba(0, 0, 0, 0.4)';
    });
  });
}
projectCard();


