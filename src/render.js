// eslint-disable-next-line import/no-cycle
import { weatherData } from './logic';

const body = document.querySelector('body');
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
  display.classList.remove('hidden');
  displayPlace.textContent = `${weatherData.location}, ${weatherData.country}`;
  displayTemp.textContent = weatherData.tempInC;
  displayFeelsLike.childNodes[0].textContent = `Feels like ${weatherData.feelsLikeInC}`;
  displayWeather.textContent = `${weatherData.weatherMain}, ${weatherData.weatherInfo}`;
  displayPressure.textContent = `Pressure: ${weatherData.pressure} hPa`;
  displayHumidity.textContent = `Humidity: ${weatherData.humidity}%`;
}

function displayCelcius(node, sibling) {
  node.classList.toggle('selected');
  sibling.classList.toggle('selected');
  sibling.classList.add('dim');
  displayTemp.childNodes[0].textContent = weatherData.tempInC;
  displayFeelsLike.childNodes[0].textContent = `Feels like ${weatherData.feelsLikeInC}`;
}
function displayFarenheit(node, sibling) {
  node.classList.toggle('selected');
  sibling.classList.toggle('selected');
  sibling.classList.add('dim');
  displayTemp.childNodes[0].textContent = weatherData.tempInF;
  displayFeelsLike.childNodes[0].textContent = `Feels like ${weatherData.feelsLikeInF}`;
}

function renderError(msg) {
  displayError.textContent = msg;
  display.classList.toggle('hidden');
  body.classList.add('clear');
}

function renderBackground() {
  if (weatherData.weatherCode > 199 && weatherData.weatherCode < 300) {
    // thunder
    body.removeAttribute('class');
    body.classList.add('thunderstorm');
    return;
  }
  if (weatherData.weatherCode > 299 && weatherData.weatherCode < 600) {
    // rain
    body.removeAttribute('class');
    body.classList.add('rain');
    return;
  }
  if (weatherData.weatherCode > 599 && weatherData.weatherCode < 700) {
    // snow
    body.removeAttribute('class');
    body.classList.add('snow');
    return;
  }
  if (weatherData.weatherCode > 700 && weatherData.weatherCode < 800) {
    // atmosphere
    body.removeAttribute('class');
    body.classList.add('atmo');
    return;
  }
  if (weatherData.weatherCode === 801 || weatherData.weatherCode === 802) {
    // low clouds
    body.removeAttribute('class');
    body.classList.add('few-clouds');
    return;
  }
  if (weatherData.weatherCode === 803 || weatherData.weatherCode === 804) {
    // more clouds
    body.removeAttribute('class');
    body.classList.add('dark-clouds');
    return;
  }
  // clear
  body.removeAttribute('class');
  body.classList.add('clear');
}

export {
  renderData, renderError, renderBackground, displayCelcius, displayFarenheit,
};
