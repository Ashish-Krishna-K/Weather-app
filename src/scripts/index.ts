import EventsObserver from "./eventsController";
import "../styles/normalize.css";
import "../styles/index.css";

// Successful callback to update the userLocation object with the user's
// location fetched from the GeoLocation API.
const updateUserLocation = ({ coords }: GeolocationPosition) => {
  // if the user's location is obtained, get fire the event passing the user's
  // location as payload.
  EventsObserver.publish("lookUpWeatherData", {
    searchTerm: `${coords.latitude}, ${coords.longitude}`,
  });
};

// handle errors in fetching userLocation
const unableToFetchUserLocation = ({ message }: GeolocationPositionError) => {
  console.log(`Unable to obtain user location as ${message}`);
};

// high accuracy option object to be passed to the getCurrentPosition.
const userLocationOptions = {
  enableHighAccuracy: true,
};

// get the user's location using GeoLocation API
const geoLocation = navigator.geolocation;
if (geoLocation) {
  geoLocation.getCurrentPosition(
    updateUserLocation,
    unableToFetchUserLocation,
    userLocationOptions,
  );
}
