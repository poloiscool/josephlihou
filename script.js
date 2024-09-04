//Smooth Scrolling
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);




gsap.registerPlugin(Flip, CustomEase, ScrollToPlugin);


const items = document.querySelectorAll("nav .nav-item p");
const gallery = document.querySelector(".gallery");
const galleryContainer = document.querySelector(".gallery-container");
const imgPreviews = document.querySelector(".img-previews");
const minimap = document.querySelector(".minimap");

let activeLayout = "layout-gallery";


window.addEventListener("scroll", handleScroll);



items.forEach((item) => {
  item.addEventListener("click", () => {
    if (!item.id) return;
    const newLayout = item.id;
    switchLayout(newLayout);
  });
});

function handleScroll() {
  if (activeLayout !== "layout-gallery") return;

  const imgPreviewsHeight = imgPreviews.scrollHeight;
  const galleryHeight = gallery.scrollHeight;
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  const scrollFraction = scrollY / (imgPreviewsHeight - windowHeight);
  const galleryTranslateY =
    -scrollFraction * (galleryHeight - windowHeight) * 1.525;
  const minimapTranslateY =
    scrollFraction * (windowHeight - minimap.offsetHeight) * 0.425;

  gsap.to(gallery, {
    y: galleryTranslateY,
    ease: "none",
    duration: 0.1,
  });

  gsap.to(minimap, {
    y: minimapTranslateY,
    ease: "none",
    duration: 0.1,
  });
}

window.addEventListener("load", () => {
  if (activeLayout === "layout-2-gallery") {
    handleScroll();
  }
});

//Shuffle Letters

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    item.addEventListener("mouseenter", shuffleAnimation);
  });
});

function getRandomCharacter() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

function shuffleAnimation(event) {
  const target = event.currentTarget;

  if (target.dataset.animating) {
    return;
  }

  target.dataset.animating = true;

  const words = target.querySelectorAll(".word");
  const originalWords = Array.from(words).map((word) => word.textContent);

  let shuffles = 0;
  const maxShuffles = 5;
  const intervalDuration = 400 / maxShuffles;

  let animationInterval = setInterval(() => {
    if (shuffles >= maxShuffles) {
      clearInterval(animationInterval);
      words.forEach((word, index) => {
        word.textContent = originalWords[index];
      });

      delete target.dataset.animating;
    } else {
      words.forEach((word) => {
        const length = word.textContent.length;
        let shuffledText = "";
        for (let i = 0; i < length; i++) {
          shuffledText += getRandomCharacter();
        }
        word.textContent = shuffledText;
      });
      shuffles++;
    }
  }, intervalDuration);
}
