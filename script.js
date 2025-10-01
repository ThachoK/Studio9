// Reveal on scroll 
const animatedElements = document.querySelectorAll(".animate-up, .animate-fade");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedElements.forEach(el => observer.observe(el));

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Counter animation for About Us Stats
const counters = document.querySelectorAll(".count");
const speed = 150; // lower is faster

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (current < target) {
          counter.innerText = current + increment;
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => counterObserver.observe(counter));

// Testimonial slider
const track = document.querySelector(".slider-track");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const cards = document.querySelectorAll(".testimonial-card");

let index = 0;
let cardsPerView = window.innerWidth <= 768 ? 1 : 2;

function updateSlider() {
  const cardWidth = cards[0].offsetWidth + 24; // card + margin
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

function nextSlide() {
  if (index >= cards.length - cardsPerView) {
    index = 0;
  } else {
    index++;
  }
  updateSlider();
}

function prevSlide() {
  if (index <= 0) {
    index = cards.length - cardsPerView;
  } else {
    index--;
  }
  updateSlider();
}

// Buttons
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoplay();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoplay();
});

// Auto-play every 5s
let autoplay = setInterval(nextSlide, 4000);

function resetAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(nextSlide, 4000);
}

// Responsive adjustments
window.addEventListener("resize", () => {
  cardsPerView = window.innerWidth <= 768 ? 1 : 2;
  index = 0;
  updateSlider();
});

