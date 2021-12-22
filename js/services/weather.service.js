export const weatherService = {
  getWetherAtPlace,
};

const API_KEY = "593bc1a1acec71a57129196263d15919";

function getWetherAtPlace(lat = 32.0749831, lng = 34.9120554) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
  console.log(url);
  return fetch(url)
    .then((data) => data.json())
    .then((wether) => parseInt(wether.main.temp - 273.15));
}
