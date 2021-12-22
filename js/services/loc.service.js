import { moduleUtil } from `./util.services.js`
import { moduleStorage } from `./storage.services.js`

export const locService = {
    getLocs
}
const KEY = locDB



const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function createLocs(name, lat, lng, weather) {
    const loc = {
        id: makeID(),
        name,
        lat,
        lng,
        weather: 'nice',
        createAt: Date.now(),
        modifiedAt: Date.now()
    }
    locs.push

}

