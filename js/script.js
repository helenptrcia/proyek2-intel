const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dot"));
const nextButton = document.querySelector("[data-next]");
const prevButton = document.querySelector("[data-prev]");
const carouselShell = document.querySelector(".carousel-shell");

let activeIndex = 0;
let timerId = null;
let touchStartX = 0;
let touchDeltaX = 0;
const swipeThreshold = 40;

if (slides.length === 0 || !nextButton || !prevButton || !carouselShell) {
  console.warn("Carousel tidak ditemukan, script carousel dilewati.");
} else {

function setActiveSlide(index) {
  activeIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeIndex);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeIndex);
  });
}

function nextSlide() {
  setActiveSlide(activeIndex + 1);
}

function prevSlide() {
  setActiveSlide(activeIndex - 1);
}

function startAutoPlay() {
  stopAutoPlay();
  timerId = window.setInterval(nextSlide, 4500);
}

function stopAutoPlay() {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

nextButton.addEventListener("click", () => {
  nextSlide();
  startAutoPlay();
});

prevButton.addEventListener("click", () => {
  prevSlide();
  startAutoPlay();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    setActiveSlide(Number(dot.dataset.dot));
    startAutoPlay();
  });
});

carouselShell.addEventListener("mouseenter", stopAutoPlay);
carouselShell.addEventListener("mouseleave", startAutoPlay);

carouselShell.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
  touchDeltaX = 0;
  stopAutoPlay();
});

carouselShell.addEventListener("touchmove", (event) => {
  touchDeltaX = event.changedTouches[0].clientX - touchStartX;
});

carouselShell.addEventListener("touchend", () => {
  if (Math.abs(touchDeltaX) >= swipeThreshold) {
    if (touchDeltaX < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  startAutoPlay();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextSlide();
    startAutoPlay();
  }

  if (event.key === "ArrowLeft") {
    prevSlide();
    startAutoPlay();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
});

setActiveSlide(0);
startAutoPlay();
}
