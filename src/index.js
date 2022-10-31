import { getData, processData } from './logic';
import { displayCelcius, displayFarenheit } from './render';
// eslint-disable-next-line import/no-unresolved
import './style.css';

const searchInput = document.querySelector('input');
const getWeatherBtn = document.querySelector('#get-weather');
const celciusBtn = document.querySelector('#celcius');
const farenheitBtn = document.querySelector('#farenheit');

getWeatherBtn.addEventListener('click', () => {
  const location = searchInput.value.toString();
  processData(getData(location));
  farenheitBtn.removeAttribute('class');
});

celciusBtn.addEventListener('click', (e) => {
  const thisElement = e.target;
  const nextElement = thisElement.nextElementSibling;
  displayCelcius(thisElement, nextElement);
});

farenheitBtn.addEventListener('click', (e) => {
  const thisElement = e.target;
  const nextElement = thisElement.previousElementSibling;
  displayFarenheit(thisElement, nextElement);
});
