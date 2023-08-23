export interface APIResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface WeatherData {
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

export interface EventsObserverType {
  events: EventsType;
  subscribe: (eventName: string, eventHandler: EventHandlerType) => void;
  publish: (eventName: string, data: EventPayloadType) => void;
}

export interface LocationString {
  searchTerm: string;
}

export interface EventsType {
  [key: string]: EventHandlerType[];
}

export interface ErrorType {
  message: string;
}

export interface ImageURLResultType {
  imgUrl: string;
  takenByName: string;
  takenByUrl: string;
}

export type EventPayloadType =
  | LocationString
  | WeatherData
  | ImageURLResultType
  | ErrorType
  | null;

export type EventHandlerType = <T extends EventPayloadType>(data: T) => void;
