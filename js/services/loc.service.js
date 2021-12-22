import { moduleUtil } from './util.services.js'
import { moduleStorage } from './storage.services.js'

export const locService = {
    getLocs,
    getIdxById,
    getLocPos,
    deleteLoc
}
const KEY = 'locDB'



const locs = [
    { id: '1234', name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: 15 },
    { id: '12345', name: 'Neveragain', lat: 32.047201, lng: 34.832581, weather: 5 }
]

function getLocs() {
    return locs
}
// function getLocs() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(locs);
//         }, 2000)

//     });


// }


function createLocs(name, lat, lng, weather) {
    const loc = {
        id: util.services.makeID(),
        name,
        lat,
        lng,
        weather: 'nice',
        createAt: util.services.timeStampToDate(Date.now(),),
        modifiedAt: util.services.timeStampToDate(Date.now(),),
    }
    locs.push(loc)
    saveToStorage(KEY, locs)

}

function getIdxById(id) {
    const locIdx = locs.findIndex(function (loc) {
        return id === loc.id
    })
    return locIdx
}

function getLocPos(idx) {
    let pos = {
        lat: locs[idx].lat,
        lng: locs[idx].lng
    }
    return pos
}
function deleteLoc(idx) {
    locs.splice(idx, 1)
    // saveToStorage(KEY, locs)


}

