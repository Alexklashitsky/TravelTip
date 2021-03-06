import { moduleUtil } from "./util.services.js";
import { moduleStorage } from "./storage.services.js";
import { weatherService as mw } from "./weather.service.js";

export const locService = {
  getLocs,
  getIdxById,
  getLocPos,
  deleteLoc,
  createLocs,

};
const KEY = "locDB";

const locs = moduleStorage.loadFromStorage(KEY) || [
  {
    id: "1234",
    name: "Greatplace",
    lat: 32.047104,
    lng: 34.832384,
    weather: 15,
  },
  {
    id: "12345",
    name: "Neveragain",
    lat: 32.047201,
    lng: 34.832581,
    weather: 5,
  },
];

function getLocs() {
  return locs;
}

function createLocs(name, lat, lng, temp) {
  const loc = {
    id: moduleUtil.makeId(4),
    name,
    lat,
    lng,
    temp,
    createAt: moduleUtil.timeStampToDate(Date.now()),
    modifiedAt: moduleUtil.timeStampToDate(Date.now()),
  };
  locs.push(loc);
  moduleStorage.saveToStorage(KEY, locs);
}

function getIdxById(id) {
  const locIdx = locs.findIndex(function (loc) {
    return id === loc.id;
  });
  return locIdx;
}

function getLocPos(idx) {
  console.log(idx);
  let pos = {
    lat: locs[idx].lat,
    lng: locs[idx].lng,
  };
  return pos;
}
function deleteLoc(id) {
  locs.splice(id, 1);
  moduleStorage.saveToStorage(KEY, locs);
}
function searchLocation(value) {
  const searchBox = new google.maps.places.SearchBox(value);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(value)
}
