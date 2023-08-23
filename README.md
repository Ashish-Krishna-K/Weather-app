# Weather-app

[Live demo](https://ashish-krishna-k.github.io/Weather-app/)

A Weather App built as a project for [The Odin Project's](https://www.theodinproject.com/) Javascript course. The objective of this project is to practice making API calls to obtain data required in the app/frontend. Weather Data for this project is fetched from the [Weather API](https://www.weatherapi.com/), while the background images is fetched from the [Pexels API](https://www.pexels.com).

_This project was originally built during my first run of [The Odin Project](https://www.theodinproject.com/) which can be viewed in the "old" branch [here](https://github.com/Ashish-Krishna-K/Weather-app/tree/old). During my second run, i'm revisiting the projects but this time with advanced skills and knowledge. During my second run, I have chose to use TypeScript with the aim of learing TypeScript._

## The App

The UI is simple, when the user first visits the site, the site will request user permission to fetch the user's location, if granted the App will display their location's weather data, if denied the App will do nothing. The UI has a simple search bar where the user can search for any city name and the appropriate weather data will be displayed if the city name is valid or show an error if the city name is not valid.

For each weather lookup, the UI will also show a different background image based on the weather condition of the looked up location.

## The Script.

The code is split into 4 modules

- **eventsController.ts**
- **index.ts**
- **apiController.ts**
- **displayController.ts**

### eventsController.ts

This module houses the EventsObserver object, this will be the coordinator in handling all the event subscription and publishing

### index.ts

This module requests the user to obtain the user's current location, if obtained it will publish an event, with the obtained location, if not then it will log the failure to the console.

### apiController.ts

This module is responsible for making the API calls to fetch the weather data and the background images. In the module the right event is subscribed to using the appropriate event handler and then whenever the event is fired the API call is made and the response is displayed to the user.

### displayController.ts

The module that handles all the display rendering aspects of the web app. Once again by listening to appropriate events the correct event handler gets called and the data gets rendered to the user along with changing the background image of the body element to the fetched image.

## Future Plans

A possible integration with Image generation AI tools like **DALL-E** or **Midjourney** is in the pipeline to better display more relevant background images. Currently API calls to such AI tools cost money and it's not feasible for this project from a financial perspective.
