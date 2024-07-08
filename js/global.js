const swup = new Swup({
  plugins: [new SwupProgressPlugin()]
});

swup.hooks.on('page:view', () => {
  // This runs after every page change

  scrollTop();
  getNewCol();
  checkHomeContactLink();
  projectCard();
  projectCardLocked();
  urlCheck();
  urlHover();
  createPlayPauseButtons();
  aboutTextAnimate();    
});

swup.hooks.on('visit:end', () => {
  // This runs after each Swup transition completes
  console.log('Transition completed. Initializing slideshows...');
  initializeSlideshowsInContent();
  resizeImagesInSlideshows();
});






//Scroll to page top
function scrollTop() {
  setTimeout(function () {
    window.scrollTo(0, 0);
    
  }, 50);
}




//Check URL and highlight links

const linkContainer = document.getElementById('links');
let links = linkContainer.querySelectorAll('a');

function urlCheck() {
  links.forEach(link => {
    if ((link.href.includes('portfolio')) && (window.location.href.includes('portfolio'))) {
      link.style.color = 'black';
      link.setAttribute('data-status', 'active');
    } else if ((link.href.includes('about')) && (window.location.href.includes('about'))) {
      link.style.color = 'black'
      link.setAttribute('data-status', 'active');
    } else {
      link.style.color = 'rgba(0, 0, 0, 0.4)';
      link.removeAttribute('data-status');
    }
  });
}

urlCheck();

function urlHover() {
  links.forEach(link => {
    if (!link.hasAttribute(`data-status`)) {
      link.addEventListener('mouseover', function () {
        link.style.color = 'black';
      })
    }

    if (!link.hasAttribute(`data-status`)) {
      link.addEventListener('mouseout', function () {
        link.style.color = 'rgba(0, 0, 0, 0.4)';
      });
    } else {
      link.addEventListener('mouseout', function () {
        link.style.color = 'black';
      });
    }
  });
}

urlHover();



//Scroll Enable/Disable

let scrollPos = 0;

function scrollDisable() {
  document.body.classList.add('scroll--disabled');
  scrollPos = window.scrollY;
}

function scrollEnable() {
  document.body.classList.remove('scroll--disabled');
  window.scrollTo(0, scrollPos);
}





//Open and close mobile nav menu

const mobileNav = document.getElementById('nav__mobile');
const mobileMenuBtn = document.getElementById('nav__btn');
const mobileCloseBtn = document.getElementById('close__btn');



mobileNav.classList.add('nav__collapse');
document.getElementById('mobile__link1').classList.add('link__hide');
document.getElementById('mobile__link2').classList.add('link__hide');
// document.getElementById('mobile__link3').classList.add('link__hide');
document.getElementById('mobile__link4').classList.add('link__hide');
document.getElementById('mobile__link5').classList.add('link__hide');
document.getElementById('mobile__link6').classList.add('link__hide');
document.getElementById('mobile__link7').classList.add('link__hide');
document.getElementById('mobile__link8').classList.add('link__hide');


function mobileNavOpen() {

  scrollDisable();
  mobileNav.classList.remove('is--hidden');
  mobileMenuBtn.classList.add('is--hidden');
  mobileCloseBtn.classList.remove('is--hidden');

  setTimeout(function () {
    mobileNav.classList.remove('nav__collapse');
    mobileNav.classList.add('nav__expand');
  }, 25);

  setTimeout(function () {
    document.getElementById('mobile__link1').classList.remove('link__hide');
    document.getElementById('mobile__link1').classList.add('link__show');
  }, 150);
  setTimeout(function () {
    document.getElementById('mobile__link2').classList.remove('link__hide');
    document.getElementById('mobile__link2').classList.add('link__show');
  }, 200);
  // setTimeout(function() {
  //   document.getElementById('mobile__link3').classList.remove('link__hide');
  //   document.getElementById('mobile__link3').classList.add('link__show');
  // }, 0);
  setTimeout(function () {
    document.getElementById('mobile__link4').classList.remove('link__hide');
    document.getElementById('mobile__link4').classList.add('link__show');
  }, 250);
  setTimeout(function () {
    document.getElementById('mobile__link5').classList.remove('link__hide');
    document.getElementById('mobile__link5').classList.add('link__show');
  }, 400);
  setTimeout(function () {
    document.getElementById('mobile__link6').classList.remove('link__hide');
    document.getElementById('mobile__link6').classList.add('link__show');
  }, 450);
  setTimeout(function () {
    document.getElementById('mobile__link7').classList.remove('link__hide');
    document.getElementById('mobile__link7').classList.add('link__show');
  }, 500);
  setTimeout(function () {
    document.getElementById('mobile__link8').classList.remove('link__hide');
    document.getElementById('mobile__link8').classList.add('link__show');
  }, 550);
}

function mobileNavClose() {

  scrollEnable();

  mobileMenuBtn.classList.remove('is--hidden');
  mobileCloseBtn.classList.add('is--hidden');

  setTimeout(function () {
    document.getElementById('mobile__link8').classList.add('link__hide');
    document.getElementById('mobile__link8').classList.remove('link__show');
  }, 25);
  setTimeout(function () {
    document.getElementById('mobile__link7').classList.add('link__hide');
    document.getElementById('mobile__link7').classList.remove('link__show');
  }, 50);
  setTimeout(function () {
    document.getElementById('mobile__link6').classList.add('link__hide');
    document.getElementById('mobile__link6').classList.remove('link__show');
  }, 75);
  setTimeout(function () {
    document.getElementById('mobile__link5').classList.add('link__hide');
    document.getElementById('mobile__link5').classList.remove('link__show');
  }, 100);
  setTimeout(function () {
    document.getElementById('mobile__link4').classList.add('link__hide');
    document.getElementById('mobile__link4').classList.remove('link__show');
  }, 200);
  // setTimeout(function() {
  //   document.getElementById('mobile__link3').classList.add('link__hide');
  //   document.getElementById('mobile__link3').classList.remove('link__show');
  // }, 0);
  setTimeout(function () {
    document.getElementById('mobile__link2').classList.add('link__hide');
    document.getElementById('mobile__link2').classList.remove('link__show');
  }, 250);
  setTimeout(function () {
    document.getElementById('mobile__link1').classList.add('link__hide');
    document.getElementById('mobile__link1').classList.remove('link__show');
  }, 300);

  setTimeout(function () {
    mobileNav.classList.add('nav__collapse');
    mobileNav.classList.remove('nav__expand');
  }, 100);

  setTimeout(function () {
    mobileNav.classList.add('is--hidden');
  }, 600);
}

mobileMenuBtn.addEventListener('click', function () { mobileNavOpen(); });
mobileCloseBtn.addEventListener('click', function () { mobileNavClose(); });

//Simulate click on shadow link to delay navigation until menu is closed
document.getElementById('mobile__link1').addEventListener('click', function () {
  mobileNavClose();
  setTimeout(function () {
    document.getElementById('shadow__link1').click();
  }, 400);
});

document.getElementById('mobile__link2').addEventListener('click', function () {
  mobileNavClose();
  setTimeout(function () {
    document.getElementById('shadow__link2').click();
  }, 400);
});






//Simulate click on logo and close mobile nav if needed
document.getElementById('wordmark').addEventListener('click', function () {
  if (mobileNav.classList.contains('is--hidden')) {
    document.getElementById('shadow__link0').click();
  } else {
    mobileNavClose();
    setTimeout(function () {
      document.getElementById('shadow__link0').click();
    }, 400);
  }
});

//simulate click on contact link
document.getElementById('mobile__link4').addEventListener('click', function () {
  mobileNavClose();
  showContact();
});




//Close nav menu if device width is greater than 479px

function checkWindowWidth() {
  const windowWidth = window.innerWidth;

  if (windowWidth > 479) {
    mobileNavClose();
  }
}

window.addEventListener('resize', checkWindowWidth);



//Show and hide nav menu when scrolling up and down

let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("nav");

window.onscroll = function scrollUpDown() {
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

const form = document.getElementById('form');
const formInputs = form.querySelectorAll('input, textarea, select');

const contact = document.getElementById("contact");
const contactCard = document.getElementById("contact__card");
const submitCard = document.getElementById("contact__submit");
const triggerOpen = document.getElementById("trigger--open");
const triggerClose = document.getElementById("trigger--close");
const submitClose = document.getElementById("submit--close");
const triggerCloseBg = document.getElementById("contact__bg");


function showContact() {

  scrollDisable();
  contact.classList.remove('is--hidden');
  setTimeout(function () {
    contactCard.scrollTop = 0;
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
  submitCard.classList.add('slide--right');
  setTimeout(function () {
    contact.classList.add("is--hidden");
    submitCard.classList.remove('slide--right');
  }, 350);

  // Clear all form fields
  formInputs.forEach(input => {
    if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
      input.value = '';
    } else if (input.tagName === 'SELECT') {
      input.selectedIndex = 0;
    }
  });

  //if in submitted state, revert to contact card
  document.getElementById('contact__submit').classList.add('is--hidden');
  document.getElementById('contact__card').classList.remove('is--hidden');
  document.getElementById('timer__bar').classList.remove('is--filled');
  clearTimeout(closeSubmitTimeout);
}




function hideContactCheck() {
  function checkFormChanges() {
    let formChanged = false;

    formInputs.forEach(input => {
      if (
        (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') && input.defaultValue !== input.value ||
        (input.tagName === 'SELECT' && input.selectedIndex !== 0)
      ) {
        formChanged = true;
      }
    });

    if (formChanged) {
      const confirmClose = window.confirm("Are you sure you want to close this form?");
      if (confirmClose) {
        hideContact(); // Call hideContact if changes detected and confirmed
      }
    } else {
      hideContact(); // Call hideContact directly if no changes detected
    }
  }

  // Call checkFormChanges when needed, e.g., when closing or navigating away from the page
  // Example: checkFormChanges();

  // Simulate calling checkFormChanges when a user attempts to close the form
  // Replace this with your actual event trigger or call the function as needed
  // For instance, attach it to a 'Close' button or a 'beforeunload' event
  checkFormChanges();
}

triggerOpen.addEventListener('click', function () { showContact(); });
triggerClose.addEventListener('click', function () { hideContactCheck(); });
submitClose.addEventListener('click', function () { hideContact(); });
triggerCloseBg.addEventListener('click', function () { hideContactCheck(); });

//check if this page is homepage
function checkHomeContactLink() {

  const triggerOpenHome = document.getElementById("trigger--home");

  if (triggerOpenHome) {
    triggerOpenHome.addEventListener('click', function () { showContact(); });
  } else { }
}
checkHomeContactLink();





// Textarea form input customization

const textarea = document.getElementById('form__message');
const defaultLines = 6; // Change this to your desired default number of lines

function updateTextarea() {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

textarea.addEventListener('input', function () {
  const lineBreaks = (this.value.match(/\n/g) || []).length;
  const totalLines = lineBreaks + 1;

  if (totalLines > defaultLines) {
    if (this.value.slice(-1) !== '\n') {
      this.value += '\n';
      updateTextarea();
    }
  } else {
    updateTextarea();
  }
});

textarea.addEventListener('keydown', function (e) {
  if (e.key === 'Backspace' && textarea.scrollHeight > textarea.offsetHeight) {
    setTimeout(updateTextarea, 0);
  }
});

updateTextarea();




//Stop form refresh when submitting

document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const formData = new FormData(this);

  // Send form data to Formspree using Fetch API
  fetch('https://formspree.io/f/xpzvabzd', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      // Handle successful form submission response
      console.log('Form submitted successfully', data);

      // Hide contact__card, show contact__submit for 5 seconds, then revert

      document.getElementById('contact__card').classList.add('is--hidden');
      document.getElementById('contact__submit').classList.remove('is--hidden');
      submitCard.scrollTop = 0;
      setTimeout(() => {
        document.getElementById('timer__bar').classList.add('is--filled');
      }, 50);


      let closeSubmitTimeout = setTimeout(() => {
        hideContact();
      }, 8000);
    })
    .catch(error => {
      // Handle errors
      console.error('Error submitting form', error);
    });
});





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




//Project card locked hover interaction
function projectCardLocked() {
  const projects = document.querySelectorAll('.project');

  projects.forEach(project => {
    project.addEventListener('mouseenter', () => {
      const lockedElement = project.querySelector('.project__locked');
      if (lockedElement) {
        lockedElement.classList.add('active');
      }
    });

    project.addEventListener('mouseleave', () => {
      const lockedElement = project.querySelector('.project__locked');
      if (lockedElement) {
        lockedElement.classList.remove('active');
      }
    });
  });
}
projectCardLocked();





// Vimeo Background Video Play/Pause

// Function to create play/pause buttons for Vimeo videos
function createPlayPauseButtons() {
  const videoContainers = document.querySelectorAll('.is--video');

  videoContainers.forEach((container) => {
    const videoIframe = container.querySelector('.bgvideo');

    // Check if videoIframe exists within the container
    if (videoIframe) {
      const videoSrc = videoIframe.getAttribute('src');
      const videoId = getVimeoVideoId(videoSrc);

      if (videoId) {
        const button = document.createElement('div');
        button.classList.add('video__button');
        container.appendChild(button);

        const pauseIcon = document.createElement('img');
        pauseIcon.classList.add('icon__pause');
        pauseIcon.src = 'https://seanreibling.github.io/assets/icons/icon-pause.svg';
        pauseIcon.style.display = 'block';
        button.appendChild(pauseIcon);

        const playIcon = document.createElement('img');
        playIcon.classList.add('icon__play');
        playIcon.src = 'https://seanreibling.github.io/assets/icons/icon-play.svg';
        playIcon.style.display = 'none';
        button.appendChild(playIcon);

        const player = new Vimeo.Player(videoIframe);

        // Check the initial state of the video and set the button accordingly
        player.getPaused().then((paused) => {
          if (paused) {
            pauseIcon.style.display = 'block';
            playIcon.style.display = 'none';
          } else {
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
          }
        }).catch((error) => {
          console.error('Error:', error);
        });

        button.addEventListener('click', () => {
          player.getPaused().then((paused) => {
            if (paused) {
              player.play();
              pauseIcon.style.display = 'block';
              playIcon.style.display = 'none';
            } else {
              player.pause();
              pauseIcon.style.display = 'none';
              playIcon.style.display = 'block';
            }
          }).catch((error) => {
            console.error('Error:', error);
          });
        });
      }
    }
  });
}

// Function to extract Vimeo video ID from the URL
function getVimeoVideoId(url) {
  const match = url.match(/player.vimeo.com\/video\/(\d+)\?background=1&autopause=0/);
  return match ? match[1] : null;
}

// Call the function to create play/pause buttons for Vimeo videos
createPlayPauseButtons();





// About page text animation loop

function aboutTextAnimate() {
  if (window.location.href.includes('about')) {
    const textContainer = document.getElementById("animation__container");

    setTimeout(function () {
      textContainer.classList.remove('notransition');
      textContainer.classList.add('textanimate__1');
    }, 5000);
    setTimeout(function () {
      textContainer.classList.add('textanimate__2');
      textContainer.classList.remove('textanimate__1');
    }, 11000);
    setTimeout(function () {
      textContainer.classList.add('textanimate__3');
      textContainer.classList.remove('textanimate__2');

    }, 17000);
    setTimeout(function () {
      textContainer.classList.add('textanimate__4');
      textContainer.classList.remove('textanimate__3');

    }, 23000);
    setTimeout(function () {
      aboutTextAnimate();
      textContainer.classList.add('notransition');
      textContainer.classList.remove('textanimate__4');
    }, 24000);
  }
}

aboutTextAnimate();



// Preload images before setting initial slideshow height
function preloadImages(images) {
  let count = 0;

  function imageLoaded() {
    count++;
    if (count === images.length) {
      initializeSlideshowsInContent();
    }
  }

  images.forEach((image) => {
    const img = new Image();
    img.onload = imageLoaded;
    img.src = image.src;
  });
}

// Case Study Slideshow Funcationality

function setInitialSlideshowHeight(slideshow) {
  resizeImagesInSlideshows(); 

  let firstSlide = slideshow.querySelector('.image.is--slideshow');
  let initialHeight = firstSlide.height;
  console.log(initialHeight);

  slideshow.style.height = initialHeight + 'px';
}

function initializeSlideshowsInContent() {
  let slideshows = document.querySelectorAll('.elem.is--slideshow');
  let resizeTimer;

  function setInitialSlideshowHeight(slideshow) {
    resizeImagesInSlideshows();
    let firstSlide = slideshow.querySelector('.image.is--slideshow');
    let initialHeight = firstSlide.height;
    slideshow.style.height = initialHeight + 'px';
  }

  slideshows.forEach((slideshow) => {
    let slides = slideshow.querySelectorAll('.image.is--slideshow');
    let currentSlide = 0;
    let interval = slideshow.dataset.interval || 5000; // Default interval: 5 seconds

    function showSlide(n) {
      slides.forEach((slide) => {
        slide.classList.remove('is--active');
      });

      slides[n].classList.add('is--active');
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeImagesInSlideshows();
        setInitialSlideshowHeight(slideshow);
        showSlide(currentSlide); // Maintain current slide after resize
      }, 250); // Adjust this delay as needed (250ms delay in this case)
    }
    

    // Function to handle image load
    function handleImageLoad() {
      setInitialSlideshowHeight(slideshow);
      showSlide(currentSlide);
    }

    setInitialSlideshowHeight(slideshow);

    // Attach 'load' event listener to each image
    slides.forEach((image) => {
      image.addEventListener('load', handleImageLoad);
    });

    setInterval(() => {
      nextSlide();
    }, interval); // Change slides based on the specified or default interval

    window.addEventListener('resize', handleResize);
  });
}

initializeSlideshowsInContent();











// Force Slideshow Images to Respond to Elem Classes

function resizeImagesInSlideshows() {
  let slideshows = document.querySelectorAll('.elem.is--slideshow');

  slideshows.forEach((slideshow) => {
    let images = slideshow.querySelectorAll('.image.is--slideshow');
    let additionalClasses = slideshow.classList;

    images.forEach((image) => {
      // Check if any of the additional classes that affect image size are present
      if (
        additionalClasses.contains('is--desktop') ||
        additionalClasses.contains('is--desktopcut') ||
        additionalClasses.contains('is--mobile') ||
        additionalClasses.contains('is--mobileframe')
      ) {
        // Adjust image size based on the additional classes
        if (additionalClasses.contains('is--desktop')) {
          // For is--desktop class
          image.style.width = '80%'; // Adjust width as needed
        } else if (additionalClasses.contains('is--desktopcut')) {
          // For is--desktopcut class
          image.style.width = '80%'; // Adjust width as needed
        } else if (additionalClasses.contains('is--mobile') || additionalClasses.contains('is--mobileframe')) {
          // For is--mobile or is--mobileframe classes
          image.style.width = '50%'; // Adjust width as needed
        }
      }
    });

    // Set the height of the slideshow container based on the height of the currently displayed image
    let activeImage = slideshow.querySelector('.image.is--slideshow.is--active');
    if (activeImage) {
      slideshow.style.height = activeImage.clientHeight + 'px';
    }
  });
}


// Call the function to resize images and adjust height in slideshows
resizeImagesInSlideshows();
window.addEventListener('resize', handleResize);