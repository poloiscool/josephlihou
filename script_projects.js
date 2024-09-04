

const galleryContainer = document.querySelector(".gallery");
const galleryItems = galleryContainer.querySelectorAll(".gallery-item");
const indicator = document.querySelector(".indicator");

const defaultItemFlex = "0 1 40px";
const hoverItemFlex = "1 1 800px";

const updategalleryItems = () => {
  galleryItems.forEach((item) => {
    let flex = defaultItemFlex;

    if (item.isHovered) {
      flex = hoverItemFlex;
    }

    item.style.flex = flex;
  });
};

galleryItems[0].isHovered = true;
updategalleryItems();

galleryItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    galleryItems.forEach((otherItem) => {
      otherItem.isHovered = otherItem === item;
    });
    updategalleryItems();
  });
});

galleryContainer.addEventListener("mousemove", (e) => {
  indicator.style.left = `${
    e.clientX - galleryContainer.getBoundingClientRect().left
  }px`;
});


//Smooth Scrolling
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


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
