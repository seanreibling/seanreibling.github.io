console.log("V2.75");

const swup = new Swup({
  plugins: [new SwupProgressPlugin()]
});

swup.hooks.on('page:view', () => {
  // This runs after every page change

  scrollTop();
  // getNewCol();
  checkHomeContactLink();
  projectCard();
  projectCardLocked();
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






// Show and hide nav menu when scrolling up and down

function initNavScroll() {
  let prevScrollPos = window.pageYOffset;
  const navbar = document.getElementById("nav");
  const stickyCol = document.querySelector(".masonry-col.is--sticky");

  const defaultPadding = 92;
  const reducedPadding = 36;

  // Clean up any old listener first (important for swup re-init)
  window.removeEventListener("scroll", handleScroll);

  function handleScroll() {
    const subnav = document.getElementById("subnav");
    const currentScrollPos = window.pageYOffset;
    const scrollingUp = prevScrollPos > currentScrollPos || currentScrollPos <= 50;
    const isDesktop = window.innerWidth >= 992;
    const distanceFromBottom = document.body.offsetHeight - (window.innerHeight + window.pageYOffset);
    const isOnPortfolioPage = window.location.pathname.startsWith("/portfolio/");

    const forceShowNav = isOnPortfolioPage && distanceFromBottom <= 200;

    if (scrollingUp || forceShowNav) {
      // Show navbar
      navbar.classList.remove("slide--up");
      navbar.classList.add("slide--down");

      // Adjust sticky padding only on desktop
      if (stickyCol) {
        stickyCol.style.paddingTop = isDesktop ? `${defaultPadding}px` : "";
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

      // Adjust sticky padding only on desktop
      if (stickyCol) {
        stickyCol.style.paddingTop = isDesktop ? `${reducedPadding}px` : "";
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
  }

  window.addEventListener("scroll", handleScroll);
}

// ✅ Run on first page load
initNavScroll();

// ✅ Re-run after each swup navigation
swup.hooks.on("content:replace", () => {
  initNavScroll();
});





//Switch between X and nav links on the right of the nav depending on the page

function updateNavbarForPortfolio() {
  const isPortfolioPage = window.location.pathname.includes('/portfolio/');
  const navClose = document.querySelector('.nav__close');
  const navLinks = document.querySelector('.nav__links');

  if (navClose && navLinks) {
    if (isPortfolioPage) {
      navClose.style.display = 'flex';
      navLinks.style.display = 'none';
    } else {
      navClose.style.display = 'none';
      navLinks.style.display = 'flex';
    }
  }
}

// Run on initial page load
updateNavbarForPortfolio();

// Re-run on each Swup page change
swup.hooks.on('content:replace', () => {
  updateNavbarForPortfolio();
});



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
// window.addEventListener('resize', handleResize);12











//Case Study Footer Homepage Preload

let exitScrollListener = null; // globally scoped so we can remove it
let shouldSkipTransition = false;

function initExitInteraction() {
  if (!window.location.pathname.startsWith('/portfolio/')) return;

  const exit = document.querySelector('.exit');
  const preloadContainer = document.getElementById('home-preload');
  if (!exit || !preloadContainer) return;

  let hasLoadedHome = false;

  // Load homepage into background
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasLoadedHome) {
        fetch('/')
          .then(res => res.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainContent = doc.getElementById('swup');
            if (mainContent) {
              preloadContainer.innerHTML = mainContent.innerHTML;
              hasLoadedHome = true;
            }
          })
          .catch(err => console.error('Failed to preload homepage:', err));
      }
    });
  }, { threshold: 0.1 });

  observer.observe(exit);

  // Named scroll function for later removal
  exitScrollListener = () => {
    const rect = exit.getBoundingClientRect();
    const exitTop = rect.top + window.scrollY;
    const exitHeight = rect.height;
    const viewportBottom = window.scrollY + window.innerHeight;
    const distanceFromBottom = document.documentElement.scrollHeight - viewportBottom;

    if (viewportBottom >= exitTop) {
      const progress = Math.min((viewportBottom - exitTop) / (exitHeight + 200), 1);
      exit.style.opacity = (1 - progress).toFixed(2);
    } else {
      exit.style.opacity = '1';
    }

    if (distanceFromBottom <= 0) {
      window.removeEventListener('scroll', exitScrollListener);
      shouldSkipTransition = true; // set the flag
      swup.navigate('/', { animate: false }); // skip animation
    }
  };

  window.addEventListener('scroll', exitScrollListener);
}

// Re-run on Swup replace, but cleanup previous listener first
swup.hooks.on('content:replace', () => {
  if (exitScrollListener) {
    window.removeEventListener('scroll', exitScrollListener);
    exitScrollListener = null;
  }

  initExitInteraction();
});

swup.hooks.on('visit:end', () => {
  shouldSkipTransition = false;
});

// Run on initial load
initExitInteraction();







//Title Reveal Cursor Animation//

function initTitleTyping() {
  const el = document.querySelector('.site-title');
  if (!el) return;

  const text = el.textContent.trim();
  el.innerHTML = ''; // Clear existing content

  // Create a wrapper span for all characters
  const wrapper = document.createElement('span');
  wrapper.className = 'title__wrapper';
  el.appendChild(wrapper);

  // Create spans for each character
  const chars = [];
  for (let char of text) {
    const span = document.createElement('span');
    span.className = 'title__char';
    span.textContent = char === '\n' ? '\u00A0' : char; // Preserve spaces
    wrapper.appendChild(span);
    chars.push(span);
  }

  // Function to get lines based on bounding rects
  function getLines(spans) {
    const lines = [];
    let currentLineTop = null;
    let currentLine = [];
    spans.forEach(span => {
      const rect = span.getBoundingClientRect();
      if (currentLineTop === null) currentLineTop = rect.top;
      if (Math.abs(rect.top - currentLineTop) > 1) {
        // New line
        lines.push(currentLine);
        currentLine = [];
        currentLineTop = rect.top;
      }
      currentLine.push(span);
    });
    if (currentLine.length) lines.push(currentLine);
    return lines;
  }

  // Wait for the browser to render so we can measure lines
  requestAnimationFrame(() => {
    const lines = getLines(chars);

    // Reveal each line in sequence
    let delay = 0;
    const typingSpeed = 15; // ms per character

    lines.forEach(line => {
      line.forEach((charSpan, index) => {
        setTimeout(() => {
          charSpan.classList.add('visible');
        }, delay + index * typingSpeed);
      });
      delay += line.length * typingSpeed + 50; // small pause between lines
    });
  });
}

// Run on first load
initTitleTyping();

// Run again on Swup navigation
if (window.swup) {
  swup.hooks.on('content:replace', () => {
    initTitleTyping();
  });
}