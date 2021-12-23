import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";
import { weatherService as ws } from "./services/weather.service.js";

export const appController = {
  onMapClick,
};

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onMapClick = onMapClick;
window.onAddLocation = onAddLocation;
window.onDeleteLoc = onDeleteLoc;
window.onSearchLocation = onSearchLocation;

var gCurrLocation;

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log("Map is ready");
      renderLocs();
    })
    .catch(() => console.log("Error: cannot init map"));
}
function onAddMarker() {
  console.log("Adding a marker");
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log("Locations:", locs);
    document.querySelector(".locs").innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {
  mapService.getLocation();

  //   getPosition()
  //     .then((pos) => {
  //       const currPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
  //       const map = new google.maps.Map(document.getElementById("map"), {
  //         zoom: 16,
  //         center: currPos,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("err!!!", err);
  //     });
}
function onPanTo(loc) {
  let idx = locService.getIdxById(loc.dataset.id);
  let pos = locService.getLocPos(idx);
  mapService.panTo(pos.lat, pos.lng);
}

function onDeleteLoc(loc) {
  var id = locService.getIdxById(loc.dataset.id);
  locService.deleteLoc(id);
  renderLocs();
}
function renderLocs() {
  var locs = locService.getLocs();
  var strHtml = "";
  let elTable = document.querySelector("tbody");
  const HTMLstr = locs
    .map((loc) => {
      return `<tr>
        <td>${loc.name}</td>
        <td>${parseInt(loc.temp) + "c"}</td>
        <td>${loc.createAt}</td>
        <td>
            <button onclick="onPanTo(this)" data-id="${
              loc.id
            }" class="btn-pan">GO</button>
            <button onclick="onDeleteLoc(this)" data-id="${
              loc.id
            }" class="delete-btn">
                Delete
            </button>
        </td>
    </tr>`;
    })
    .join("");
  elTable.innerHTML = HTMLstr;
}

function toggleModal() {
  var elModal = document.querySelector(".modal");
  elModal.classList.toggle("closed");
  document.body.classList.toggle("modal-open");
}

function onMapClick(pos) {
  toggleModal();
  gCurrLocation = pos;
}

function onAddLocation(ev) {
  ev.preventDefault();
  var pos = gCurrLocation;
  var name = document.querySelector(".loc-name").value;
  ws.getWetherAtPlace(pos.lat, pos.lng).then((weather) => {
    var temp = weather.main.temp - 273.15;
    var lat = weather.coord.lat;
    var lng = weather.coord.lon;
    locService.createLocs(name, lat, lng, temp);
    renderLocs();
  });
  toggleModal();
}
function onSearchLocation() {
  let locSearch = document.querySelector("[name=search-location]").value;
  console.log("value:", locSearch);
  mapService.searchLocation(locSearch);
}
