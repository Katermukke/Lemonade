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

const carousel = document.querySelector(".carrousel"),
  firstImg = carousel.querySelectorAll(".item")[0],
  arrowIcons = document.querySelectorAll(".wrapper .i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  // showing and hiding prev/next icon according to carousel scroll left value
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
};

const upDateScreen = () => {
  showHideIcons();
  if (window.innerWidth > 40)
    (arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block"),
      (arrowIcons[1].style.display =
        carousel.scrollLeft == scrollWidth ? "none" : "block");
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 15; // getting first img width & adding 14 margin value
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const autoSlide = () => {
  // if there is no image left to scroll then return from here
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  // getting difference value that needs to add or reduce from carousel left to take middle img center
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the right
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  // if user is scrolling to the left
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  // updatating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
window.addEventListener("resize", upDateScreen);
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
