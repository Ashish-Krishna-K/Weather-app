const EventsObserver: EventsObserverType = {
  events: {},
  subscribe: (eventName: string, eventHandler: EventHandlerType) => {
    if (!EventsObserver.events[eventName]) {
      EventsObserver.events[eventName] = [];
    }
    EventsObserver.events[eventName].push(eventHandler);
  },
  publish: (eventName: string, data: EventPayloadType) => {
    const event = EventsObserver.events[eventName];
    if (event) {
      event.forEach((ev) => ev(data));
    }
  },
};

export default EventsObserver;
