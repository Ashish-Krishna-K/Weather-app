interface APIResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface WeatherData {
  locationName: string;
  locationDescription: string;
  dayTime: number;
  lastUpdateDate: string;
  tempInCelcius: number;
  tempInFarenheit: number;
  feelsLikeInCelcius: number;
  feelsLikeInFarenheit: number;
  weatherConditionText: string;
  weatherConditionUrl: string;
  humidityInPercentage: number;
  cloudCoverInPercentage: number;
  uvIndex: number;
}

interface EventsObserverType {
  events: EventsType;
  subscribe: (eventName: string, eventHandler: EventHandlerType) => void;
  publish: (eventName: string, data: EventPayloadType) => void;
}

interface LocationString {
  searchTerm: string;
}

interface EventsType {
  [key: string]: EventHandlerType[];
}

interface ErrorType {
  message: string;
}

interface ImageURLResultType {
  imgUrl: string;
  takenByName: string;
  takenByUrl: string;
}

type EventPayloadType =
  | LocationString
  | WeatherData
  | ImageURLResultType
  | ErrorType
  | null;

type EventHandlerType = <T extends EventPayloadType>(data: T) => void;
