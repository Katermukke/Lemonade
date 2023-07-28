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

async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { Place } = await google.maps.importLibrary("places");

  // async function initMap() {: Cela définit une fonction asynchrone appelée initMap, qui sera utilisée pour initialiser la carte Google Maps et afficher les marqueurs.

  // const { Map } = await google.maps.importLibrary("maps");: Cela importe la bibliothèque maps de l'API Google Maps et extrait la classe Map de cette bibliothèque. Cela permet d'utiliser la classe Map pour créer une nouvelle instance de carte.

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
