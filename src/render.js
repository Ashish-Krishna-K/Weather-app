// eslint-disable-next-line import/no-cycle
import { weatherData } from './logic';

const display = document.querySelector('#display-weather');
const displayPlace = document.querySelector('#place');
const displayTemp = document.querySelector('#temp');
const displayFeelsLike = document.querySelector('#feels-like');
const displayWeather = document.querySelector('#weather');
const displayPressure = document.querySelector('#pressure');
const displayHumidity = document.querySelector('#humidity');
const displayError = document.querySelector('#error');

function renderData() {
  displayError.textContent = '';
  displayPlace.textContent = `${weatherData.location}, ${weatherData.country}`;
  displayTemp.childNodes[0].textContent = weatherData.tempInC;
  displayFeelsLike.childNodes[0].textContent = `Feels like ${weatherData.feelsLikeInC}`;
  displayWeather.childNodes[0].textContent = `${weatherData.weatherMain}, ${weatherData.weatherInfo}`;
  displayPressure.textContent = `Pressure: ${weatherData.pressure}hPa`;
  displayHumidity.textContent = `Humidity: ${weatherData.humidity}%`;
}

function displayCelcius(node, sibling) {
  node.classList.toggle('selected');
  sibling.classList.toggle('selected');
  displayTemp.childNodes[0].textContent = weatherData.tempInC;
  displayFeelsLike.childNodes[0].textContent = `Feels like ${weatherData.feelsLikeInC}`;
}
function displayFarenheit(node, sibling) {
  node.classList.toggle('selected');
  sibling.classList.toggle('selected');
  displayTemp.childNodes[0].textContent = weatherData.tempInF;
  displayFeelsLike.childNodes[0].textContent = `Feels like ${weatherData.feelsLikeInF}`;
}

function renderError(msg) {
  displayError.textContent = msg;
  display.classList.toggle('hidden');
}

export {
  renderData, renderError, displayCelcius, displayFarenheit,
};
