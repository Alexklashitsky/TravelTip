import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";
import { weatherService as ws } from "./services/weather.service.js";

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onMapClick = onMapClick;
window.onAddLocation = onAddLocation;
window.onDeleteLoc = onDeleteLoc
// window.onSearchLocation = onSearchLocation;

function onInit() {
    mapService
        .initMap()
    renderLocs()
        .then(() => {
            console.log("Map is ready");
        })
        .catch(() => console.log("Error: cannot init map"));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log("Getting Pos");
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
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

    getPosition()
        .then((pos) => {
            // console.log('User position is:', pos.coords);
            const currPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 16,
                center: currPos,
            });

            document.querySelector(
                ".user-pos"
            ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
            // panTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch((err) => {
            console.log("err!!!", err);
        });
}
function onPanTo(loc) {
    console.log("Panning the Map");
    let idx = locService.getIdxById(loc.dataset.id);

    let pos = locService.getLocPos(idx);
    console.log("id:", pos);
    // let Idx = loc.loc.Service.getIdxById(id)
    mapService.panTo(pos.lat, pos.lng);
}

function onDeleteLoc(loc) {
    let id = locService.getIdxById(loc.dataset.id);
    locService.deleteLoc(id);
    renderLocs()
}
function renderLocs() {
    var locs = locService.getLocs();
    var strHtml = "";
    let elTable = document.querySelector("tbody");
    locs.map((loc) => {
        strHtml += `<tr>
        <td>${loc.name}</td>
        <td>${loc.weather}</td>
        <td>${loc.createAt}</td>
        <td>
            <button onclick="onPanTo(this)" data-id="${loc.id}" class="btn-pan">GO</button>
            <button onclick="onDeleteLoc(this)" data-id="${loc.id}" class="delete-btn">
                Delete
            </button>
        </td>
    </tr>`;
    });

    elTable.innerHTML = strHtml;
}

function toggleModal() {
    var elModal = document.querySelector(".modal");
    elModal.classList.toggle("closed");
    document.body.classList.toggle("modal-open");
}

function onMapClick() {
    toggleModal();
}

function onAddLocation(ev) {
    ev.preventDefault();
    var name = document.querySelector(".loc-name").value;
    ws.getWetherAtPlace().then((weather) => {
        var temp = weather.main.temp - 273.15;
        var lat = weather.coords.lat;
        var lng = weather.coords.lon;
        locService.createLocs(name, lat, lng, temp);
    });
    toggleModal();
}
