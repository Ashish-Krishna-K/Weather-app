import { EventHandlerType, WeatherData } from "../types/generalTypes";
import EventsObserver from "./eventsController";

// a display component which displays all the fetched weather data
const generateWeatherDisplayComponent = (data: WeatherData): HTMLElement => {
  // destructuring the input argument for readability
  const {
    locationName,
    locationDescription,
    lastUpdateDate,
    tempInCelcius,
    tempInFarenheit,
    feelsLikeInCelcius,
    feelsLikeInFarenheit,
    weatherConditionText,
    weatherConditionUrl,
    humidityInPercentage,
    cloudCoverInPercentage,
    uvIndex,
  } = data;

  // a container for all the elements
  const container = document.createElement("div");
  container.dataset.unitPreference = "Celcius";
  container.classList.add("weather-container");

  // show the timestamp of when the weather data was updated
  const lastUpdatedInfo = document.createElement("p");
  lastUpdatedInfo.textContent = `Weather as of: ${lastUpdateDate}`;
  container.appendChild(lastUpdatedInfo);

  // show details about the location selected
  const locationDisplay = document.createElement("div");
  locationDisplay.classList.add("location-info");

  // show location name
  const locationNameInfo = document.createElement("p");
  locationNameInfo.textContent = locationName;

  // show other location info like region and country
  const locationDescInfo = document.createElement("span");
  locationDescInfo.textContent = locationDescription;
  locationNameInfo.appendChild(locationDescInfo);
  locationDisplay.appendChild(locationNameInfo);

  container.appendChild(locationDisplay);

  // show the temperature details
  const tempDisplayInfo = document.createElement("p");
  tempDisplayInfo.classList.add("temp-info");

  // show the actual temperature
  const currentTemp = document.createElement("span");
  currentTemp.textContent = `${tempInCelcius} °C`;
  currentTemp.classList.add("actual-temp");
  tempDisplayInfo.appendChild(currentTemp);

  // show the "feels like" temperature
  const feelsLike = document.createElement("span");
  feelsLike.textContent = `Feels like ${feelsLikeInCelcius} °C`;
  feelsLike.classList.add("feelsLike-temp");
  tempDisplayInfo.appendChild(feelsLike);

  // allow the user to change the temperature unit by clicking on
  // current temperature display
  tempDisplayInfo.addEventListener("click", () => {
    // save the unit preference as a dataset in the container
    container.dataset.unitPreference =
      container.dataset.unitPreference === "Farenheit"
        ? "Celcius"
        : "Farenheit";

    // update the content based on user preference.
    currentTemp.textContent =
      container.dataset.unitPreference === "Farenheit"
        ? `${tempInFarenheit} °F`
        : `${tempInCelcius} °C`;

    feelsLike.textContent =
      container.dataset.unitPreference === "Farenheit"
        ? `Feels like ${feelsLikeInFarenheit} °F`
        : `Feels like ${feelsLikeInCelcius} °C`;
  });

  container.appendChild(tempDisplayInfo);

  // show the weather conditions
  const weatherConditionsInfo = document.createElement("div");
  weatherConditionsInfo.classList.add("weather-info");

  // show an icon returned by the API representing the current
  // weather
  const weatherIcon = document.createElement("img");
  weatherIcon.src = weatherConditionUrl;
  weatherConditionsInfo.appendChild(weatherIcon);

  // show a text description of the weather condition
  const weatherText = document.createElement("p");
  weatherText.textContent = weatherConditionText;
  weatherConditionsInfo.appendChild(weatherText);

  // show the cloud cover info as a percentage
  const cloudCoverInfo = document.createElement("p");
  cloudCoverInfo.classList.add("cloud-cover-info");
  cloudCoverInfo.textContent = `Cloud cover of ${cloudCoverInPercentage} %`;
  weatherConditionsInfo.appendChild(cloudCoverInfo);

  container.appendChild(weatherConditionsInfo);

  // show the humidity and UV index
  const humidityAndUVInfo = document.createElement("div");
  humidityAndUVInfo.classList.add("other-info");

  // show the humidity info as percentage
  const humidityInfo = document.createElement("p");
  humidityInfo.textContent = `Humidity: ${humidityInPercentage}%`;
  humidityAndUVInfo.appendChild(humidityInfo);

  // show the UV index
  const uvInfo = document.createElement("p");
  uvInfo.textContent = `UV Index: ${uvIndex}`;
  humidityAndUVInfo.appendChild(uvInfo);

  container.appendChild(humidityAndUVInfo);

  return container;
};

// render the weatherData in the UI
const renderWeatherData = (weatherData: WeatherData) => {
  const weatherDisplay = document.querySelector("section#weather-data");
  if (weatherDisplay) {
    // remove the current contents first.
    const child = weatherDisplay.firstChild;
    if (child !== null) weatherDisplay.removeChild(child);
    weatherDisplay.appendChild(generateWeatherDisplayComponent(weatherData));
  }
};

// An event handler wrapper to avoid TypeScript issues as suggested by ChatGPT
const renderWeatherDataEventHandler: EventHandlerType = (data) => {
  // if the passed in data argument has the "tempInCelcius" key then call the
  // renderWeatherData
  if (data !== null && "tempInCelcius" in data) {
    renderWeatherData(data);
  }
};

// attach the submit eventListener to the search form
const searchForm = document.querySelector(
  "form#search-city-form",
) as HTMLFormElement;

searchForm?.addEventListener(
  "submit",
  function (this: HTMLFormElement, ev: SubmitEvent) {
    ev.preventDefault();
    const searchedName = new FormData(this).get("cityName");
    if (!searchedName) {
      EventsObserver.publish("showError", {
        message: "City name cannot be blank!",
      });
      return;
    }
    // publish an event with the userInput as payload.
    EventsObserver.publish("lookUpWeatherData", {
      searchTerm: `${searchedName}`,
    });
  },
);

// create an error modal
const generateErrorModal = (errorMsg: string) => {
  // create the error modal
  const errorModal = document.createElement("div");
  errorModal.classList.add("error-modal");

  // a container for all the modal items
  const container = document.createElement("div");

  // show a heading for the modal
  const heading = document.createElement("h2");
  heading.textContent = "ERROR!";
  container.appendChild(heading);

  // show the provided error message
  const errorMessage = document.createElement("p");
  errorMessage.textContent = errorMsg;
  container.appendChild(errorMessage);

  // show an ok button to dismiss the error modal
  const dismissBtn = document.createElement("button");
  dismissBtn.classList.add("dismiss-error-btn");
  dismissBtn.textContent = "OK";
  // when the ok modal is clicked remove the error
  // modal itself
  dismissBtn.addEventListener("click", () => {
    errorModal.remove();
  });
  container.appendChild(dismissBtn);

  errorModal.appendChild(container);

  return errorModal;
};

// show a loading screen to the user when we're waiting for the weather
// data from the API
const showLoadingScreen = () => {
  const weatherDisplay = document.querySelector("section#weather-data");
  if (weatherDisplay) {
    const child = weatherDisplay.firstChild;
    if (child) weatherDisplay.removeChild(child);
    const loadingContent = document.createElement("h2");
    loadingContent.textContent = "Fetching Data...";
    weatherDisplay.appendChild(loadingContent);
  }
};

// show an error modal to the user in the case of any errors
const showErrorScreen: EventHandlerType = (data) => {
  // if the passed in data object has the "message" key then render
  // the error modal
  if (data !== null && "message" in data) {
    const weatherDisplay = document.querySelector("section#weather-data");
    if (weatherDisplay) {
      // remove the current contents first.
      const child = weatherDisplay.firstChild;
      if (child) weatherDisplay.removeChild(child);
      weatherDisplay.appendChild(generateErrorModal(data.message));
    }
  }
};

// change the background image to the image obtained from the API
const changeBgImage = (url: string, takenName: string, takenUrl: string) => {
  const body = document.querySelector("body");
  const imgCredits = document.querySelector("div.img-credits");
  if (body) {
    body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${url})`;
  }
  // provide credits to the photographer by linking the photographer's
  // pexels page in the footer.
  if (imgCredits) {
    const takenByNameDisplay = document.createElement("p");
    takenByNameDisplay.innerHTML = `Background Image by <a href=${takenUrl.toString()}>${takenName.toString()}</a> on Pexels`;
    // if hte imgCredits section already has a child remove it and append
    // new child.
    const child = imgCredits.firstChild;
    if (child) imgCredits.removeChild(child);
    imgCredits.appendChild(takenByNameDisplay);
  }
};

// event handler for changing the background image as advised by ChatGPT
const changeBgImageHandler: EventHandlerType = (data) => {
  if (data !== null && "imgUrl" in data) {
    changeBgImage(data.imgUrl, data.takenByName, data.takenByUrl);
  }
};

// subscribe to appropriate events.
EventsObserver.subscribe("bgImageFetched", changeBgImageHandler);
EventsObserver.subscribe("showError", showErrorScreen);
EventsObserver.subscribe("lookUpWeatherData", showLoadingScreen);
EventsObserver.subscribe("weatherDataFetched", renderWeatherDataEventHandler);
