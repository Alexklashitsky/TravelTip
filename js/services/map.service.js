const API_KEY = "AIzaSyATpTLQzpgyRlCQDLtoeO6FLafzcSw_VQc";
import { } from "./loc.service.js";
import { appController } from "../app.controller.js";
export const mapService = {
  initMap,
  addMarker,
  panTo,
  getLocation,
  searchLocation
};

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log("InitMap");
  return _connectGoogleApi().then(() => {
    console.log("google available");
    gMap = new google.maps.Map(document.querySelector("#map"), {
      center: { lat, lng },
      zoom: 15,
    });
    gMap.addListener("click", (mapsMouseEvent) => {
      var pos = {
        lat: mapsMouseEvent.latLng.lat(),
        lng: mapsMouseEvent.latLng.lng(),
      };
      appController.onMapClick(pos);
    });
  });
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: "Hello World!",
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var x = position.coords.latitude;
  var y = position.coords.longitude;
  const currPos = { lat: x, lng: y };
  gMap.panTo(currPos);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = ""; //TODO: Enter your API Key
  var elGoogleApi = document.createElement("script");
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyATpTLQzpgyRlCQDLtoeO6FLafzcSw_VQc&libraries=places`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject("Google script failed to load");
  });
}
function searchLocation(value) {
  console.log('ffdfd');


  const searchBox = new google.maps.places.SearchBox(value);
  console.log('searchBox:', searchBox);




  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(value)
}
