import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
// window.onload = renderLocs;



function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
            renderLocs()

        })
        .catch(() => console.log('Error: cannot init map'));

}






// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    mapService.getLocation()

    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            const currPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 14,

                center: currPos,
            });

            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            // panTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo(loc) {
    console.log('Panning the Map');
    let idx = locService.getIdxById(loc.dataset.id)       //

    let pos = locService.getLocPos(idx)
    console.log('id:', pos)
    // let Idx = loc.loc.Service.getIdxById(id)
    mapService.panTo(pos.lat, pos.lng);
}
function onDeleteLocation(loc) {
    let idx = locService.getIdxById(loc.dataset.id)
    locService.deleteLoc(idx)


}
function renderLocs() {
    var locs = locService.getLocs()
    var strHtml = ''
    let elTable = document.querySelector('.tbody')
    locs.map((loc) => {
        strHtml += `<tr>
        <td>${loc.name}</td>
        <td>${loc.weather}</td>
        <td>${loc.createAt}</td>
        <td>
            <button onclick="onPanTo(this)" data-id="${loc.id}" class="btn-pan">GO</button>
            <button onclick="onDeleteLocation(this)" data-id="${loc.id}" class="delete-btn">
                Delete
            </button>
        </td>
    </tr>`
    })

    elTable.innerHTML = strHtml


}