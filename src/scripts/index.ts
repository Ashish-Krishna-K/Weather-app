import { UserLocation } from "../types/generalTypes";
import EventsObserver from "./eventsController";
import "../styles/normalize.css";
import "../styles/index.css";

// create a main function that is invoked as the beginning of the web-app
const main = () => {
  // store the user's location obtained from GeoLocation API for consumption,
  // outside of the callback.
  const userLocation: UserLocation = {
    latitude: null,
    longitude: null,
  };

  // Successful callback to update the userLocation object with the user's
  // location fetched from the GeoLocation API.
  const updateUserLocation = ({ coords }: GeolocationPosition) => {
    userLocation.latitude = coords.latitude;
    userLocation.longitude = coords.longitude;
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
  // if the user's location is obtained, get fire the event passing the user's
  // location as payload.
  if (userLocation.latitude !== null || userLocation.longitude !== null) {
    EventsObserver.publish("lookUpWeatherData", {
      searchTerm: `${userLocation.latitude}, ${userLocation.longitude}`,
    });
  }
};

main();
