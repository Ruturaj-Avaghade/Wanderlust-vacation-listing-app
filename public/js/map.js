
  // creates the map container
  var map = L.map('map').setView([listingObj.geometry.coordinates[1], listingObj.geometry.coordinates[0]],  10);


  // Fills the map container with data(actual map) using openstreetmap
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// create custome red icon for marker
var redIcon = L.icon({
      iconUrl: '/images/red-icon.png',
      iconSize: [40, 60],
        iconAnchor: [20, 60],
        popupAnchor: [0, -60]
});

//adds marker
var marker = L.marker([listingObj.geometry.coordinates[1], listingObj.geometry.coordinates[0]],{icon:redIcon}).addTo(map);

//adds popup message
marker.bindPopup(`<b>${listingObj.title}</b><br>Exact location provided after booking`).openPopup();

//adds circle
var circle = L.circle([28.6139, 77.2090], {
    color: 'blue',
    fillColor: '#0077ff',
    fillOpacity: 0.5,
    radius: 700
}).addTo(map);

 