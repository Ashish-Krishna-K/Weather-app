import {
  WeatherData,
  APIResponse,
  EventHandlerType,
} from "../types/generalTypes";
import EventsObserver from "./eventsController";

// A factory to create the data object containing only the data required from the
// API response
const generateDataObject = (data: APIResponse): WeatherData => {
  const locationName = `${data.location.name}`;
  const locationDescription = `${data.location.region}, ${data.location.country}`;
  const dayTime = data.current.is_day;
  const lastUpdateDate = data.current.last_updated;
  const tempInCelcius = data.current.temp_c;
  const tempInFarenheit = data.current.temp_f;
  const feelsLikeInCelcius = data.current.feelslike_c;
  const feelsLikeInFarenheit = data.current.feelslike_f;
  const weatherConditionText = data.current.condition.text;
  const weatherConditionUrl = data.current.condition.icon;
  const humidityInPercentage = data.current.humidity;
  const cloudCoverInPercentage = data.current.cloud;
  const uvIndex = data.current.uv;

  return {
    locationName,
    locationDescription,
    dayTime,
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
  };
};

// asynchronously fetch the weatherData from the weather api.
const fetchWeatherData = async (location: string) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=a095999d7d0840f98e5142344232108&q=${location}`,
  );
  const fetchedData = await response.json();
  // since fetch doesn't throw an error even if the response status is not 200,
  // checking to see if response.ok is true or false, if it's false then the
  // response body contains the error message.
  if (response.ok) {
    // use the above factory to pick only the data needed from the api response,
    // and fire an event with the filtered data as payload
    const filteredData = generateDataObject(fetchedData);
    // now fetch a suitable background image based on the weather condition using pixabay API.
    await fetchBGImage(filteredData.weatherConditionText);
    EventsObserver.publish("weatherDataFetched", filteredData);
  } else {
    // response is not ok so show error to the user.
    EventsObserver.publish("showError", fetchedData.error);
  }
};

// an event handler wrapper to avoid TypeScript issues as suggested by ChatGPT.
const fetchWeatherDataEventHandler: EventHandlerType = (data) => {
  // if passed in data object has the "searchTerm" key then call the
  // fetchWeatherData function.
  if (data !== null && "searchTerm" in data) {
    fetchWeatherData(data.searchTerm);
  }
};

// fetch a background image from pixabay api based on weather condition
const fetchBGImage = async (weather: string) => {
  const url = `https://api.pexels.com/v1/search?query=${weather}+weather+sky&orientation=square&per_page=1`;
  try {
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        Authorization:
          "LIEmprnQV9Bi71qXL5xTYlTyJF5OTdtPhNZ6BozSMqeoFxBaaja6fZEp",
      },
    });
    // response is not ok so publish an error
    if (!response.ok) {
      // TODO handle error
      EventsObserver.publish("bgImageNotFetched", null);
    } else {
      const fetchedData = await response.json();
      // take the image URL of the first result from the response array
      const photo = fetchedData.photos[0];
      EventsObserver.publish("bgImageFetched", {
        imgUrl: photo.src.original,
        takenByName: photo.photographer,
        takenByUrl: photo.photographer_url,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// subscibe to the event and handle it accordingly.
EventsObserver.subscribe("lookUpWeatherData", fetchWeatherDataEventHandler);
