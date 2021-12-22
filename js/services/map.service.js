const API_KEY = "AIzaSyATpTLQzpgyRlCQDLtoeO6FLafzcSw_VQc";
import {  } from "./loc.service.js";
export const mapService = {
  initMap,
  addMarker,
  panTo,
  getLocation,
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
    // gMap.addListener("click", (e) => {
    //   var pos = e.latLng;

    //   //here you need call the function that makes new location and open the modal to get the name. also you need to call the getWeather at place function to get the weather;
    // });
    console.log("Map!", gMap);
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
  console.log("test");
  // let showPosition
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log("showPosition:", showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var x = position.coords.latitude;
  var y = position.coords.longitude;
  const currPos = { lat: x, lng: y };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: currPos,
  });
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = ""; //TODO: Enter your API Key
  var elGoogleApi = document.createElement("script");
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyATpTLQzpgyRlCQDLtoeO6FLafzcSw_VQc`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject("Google script failed to load");
  });
}
