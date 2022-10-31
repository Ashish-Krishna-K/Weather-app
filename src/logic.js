// eslint-disable-next-line import/no-cycle
import { renderData, renderError, renderBackground } from './render';

const weatherData = {
  location: null,
  country: null,
  tempInC: null,
  tempInF: null,
  feelsLikeInC: null,
  feelsLikeInF: null,
  humidity: null,
  pressure: null,
  weatherCode: null,
  weatherMain: null,
  weatherInfo: null,
};

function convertKtoC(data) {
  return Math.round(data - 273.15);
}

function convertKtoF(data) {
  return Math.round(1.8 * (data - 273) + 32);
}

async function getData(location) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=8af61ed18fdcc5f12acad023a85e6874`, {
      method: 'GET',
      mode: 'cors',
    });
    const receivedData = await response.json();

    if (receivedData.cod !== 200) {
      renderError(receivedData.message);
      return;
    }
    // eslint-disable-next-line consistent-return
    return receivedData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

function processData(dataObj) {
  dataObj.then((response) => {
    weatherData.location = response.name;
    weatherData.country = response.sys.country;
    weatherData.tempInC = convertKtoC(response.main.temp);
    weatherData.tempInF = convertKtoF(response.main.temp);
    weatherData.feelsLikeInC = convertKtoC(response.main.feels_like);
    weatherData.feelsLikeInF = convertKtoF(response.main.feels_like);
    weatherData.humidity = response.main.humidity;
    weatherData.pressure = response.main.pressure;
    weatherData.weatherCode = response.weather[0].id;
    weatherData.weatherMain = response.weather[0].main;
    weatherData.weatherInfo = response.weather[0].description;

    renderData();
    renderBackground();
  });
}

export { getData, processData, weatherData };
