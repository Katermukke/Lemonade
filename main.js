// <------------------------------------------- NAVBAR ------------------------------------------->

(function () {
  const burger3 = document.querySelector(".burger3");
  const burger = document.querySelector(".burger");
  const navMiddle = document.querySelector(".navMiddle");

  burger.addEventListener("click", () => {
    navMiddle.classList.toggle("mobile-menu");
  });

  burger3.addEventListener("click", function () {
    return burger3.classList.toggle("on");
  });
}).call(this);

// <------------------------------------------- OUR LEMONADE ------------------------------------------->

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper svg");
const carouselChildrens = [...carousel.children];
let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};
const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};
const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// <------------------------------------------- SELLING POINT ------------------------------------------->

async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { Place } = await google.maps.importLibrary("places");

  // async function initMap() {: Définit une fonction asynchrone appelée initMap, qui sera utilisée pour initialiser la carte Google Maps et afficher les marqueurs.

  // const { Map } = Await google.maps.importLibrary("maps");: Cela importe la bibliothèque maps de l'API Google Maps et extrait la classe Map de cette bibliothèque. Cela permet d'utiliser la classe Map pour créer une nouvelle instance de carte.

  // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");: Cela importe la bibliothèque marker de l'API Google Maps et extrait la classe AdvancedMarkerElement de cette bibliothèque. Cette classe est utilisée pour créer des marqueurs personnalisés avec des fonctionnalités avancées.

  // const { Place } = await google.maps.importLibrary("places");: Cela importe la bibliothèque places de l'API Google Maps et extrait la classe Place de cette bibliothèque. Cette classe est utilisée pour effectuer des opérations liées aux lieux, tels que la recherche et l'autocomplétion d'adresses.

  const map = new Map(document.getElementById("map"), {
    center: { lat: 43.28862889705522, lng: 5.3730178900200265 },
    zoom: 15,
    mapId: "4504f8b37365c3d0",
  });

  const customMarkerIcon = {
    url: "assets/cocktailDrink.svg",
    scaledSize: new google.maps.Size(10, 10),
  };

  const svgElement = document.createElement("img");
  svgElement.src = "assets/cocktailDrink.svg"; // Chemin vers SVG personnalisé
  svgElement.classList.add("animated-svg"); // Ajoutez une classe pour l'animation

  const svgMarker = new AdvancedMarkerElement({
    map,
    position: { lat: 43.28862889705522, lng: 5.3730178900200265 },
    content: svgElement,
    title: "A marker using a custom SVG for the icon.",
  });

  svgMarker.addListener("click", toggleAnimation);

  function toggleAnimation() {
    svgElement.classList.toggle("bounce-animation");
  }
}

initMap();
