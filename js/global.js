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
  // urlCheck();
  // urlHover();
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





//Show and hide nav menu when scrolling up and down

let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("nav");
const stickyCol = document.querySelector(".masonry-col.is--sticky");

const defaultPadding = 92;
const reducedPadding = 36;

window.onscroll = function scrollUpDown() {
  const subnav = document.getElementById("subnav");
  const currentScrollPos = window.pageYOffset;

  const scrollingUp = prevScrollPos > currentScrollPos || currentScrollPos <= 24;

  if (scrollingUp) {
    // Show navbar
    navbar.classList.remove("slide--up");
    navbar.classList.add("slide--down");

    // Adjust sticky padding
    if (stickyCol) {
      stickyCol.style.paddingTop = `${defaultPadding}px`;
    }

    // Show subnav (if exists)
    if (subnav) {
      subnav.classList.add("slide--up");
      subnav.classList.remove("slide--down");
    }
  } else {
    // Hide navbar
    navbar.classList.add("slide--up");
    navbar.classList.remove("slide--down");

    // Adjust sticky padding
    if (stickyCol) {
      stickyCol.style.paddingTop = `${reducedPadding}px`;
    }

    // Hide subnav (if exists)
    if (subnav) {
      setTimeout(() => {
        subnav.classList.remove("slide--up");
        subnav.classList.add("slide--down");
      }, 100);
    }
  }

  prevScrollPos = currentScrollPos;
};



//Project Cover Hover In/Out

function initGridItemHover() {
  document.querySelectorAll('.grid-item').forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;

    item.addEventListener('mouseenter', () => {
      img.style.opacity = '0.85';
    });

    item.addEventListener('mouseleave', () => {
      img.style.opacity = '1';
    });
  });
}

// Initial run
initGridItemHover();

// Re-run after Swup content is replaced
if (window.swup) {
  swup.hooks.on('content:replace', () => {
    initGridItemHover();
  });
}





//Button Hover In/Out

function initBtnIconHover() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    const icon = btn.querySelector('.btn__icon');
    if (!icon) return;

    // Ensure transition is applied once
    icon.style.transition = 'transform 0.3s ease';

    btn.addEventListener('mouseenter', () => {
      icon.style.transform = 'translateX(2px)';
    });

    btn.addEventListener('mouseleave', () => {
      icon.style.transform = 'translateX(0)';
    });
  });
}

// Run once on initial page load
initBtnIconHover();

// Re-run after Swup replaces content
if (window.swup) {
  swup.hooks.on('content:replace', () => {
    initBtnIconHover();
  });
}





//Check URL and highlight links

// const linkContainer = document.getElementById('links');
// let links = linkContainer.querySelectorAll('a');

// function urlCheck() {
//   links.forEach(link => {
//     if ((link.href.includes('portfolio')) && (window.location.href.includes('portfolio'))) {
//       link.style.color = 'white';
//       link.setAttribute('data-status', 'active');
//     } else if ((link.href.includes('about')) && (window.location.href.includes('about'))) {
//       link.style.color = 'white'
//       link.setAttribute('data-status', 'active');
//     } else {
//       link.style.color = 'white';
//       link.removeAttribute('data-status');
//     }
//   });
// }

// urlCheck();

// function urlHover() {
//   links.forEach(link => {
//     if (!link.hasAttribute(`data-status`)) {
//       link.addEventListener('mouseover', function () {
//         link.style.color = 'white';
//       })
//     }

//     if (!link.hasAttribute(`data-status`)) {
//       link.addEventListener('mouseout', function () {
//         link.style.color = 'white';
//       });
//     } else {
//       link.addEventListener('mouseout', function () {
//         link.style.color = 'white';
//       });
//     }
//   });
// }

// urlHover();



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
      text.style.color = 'white';
    });

    project.addEventListener('mouseout', function () {
      text.style.color = 'rgba(255, 255, 0, 0.4)';
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