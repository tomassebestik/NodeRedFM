var messageLenght = parseInt(msg.payload.length);
var currentTime = msg.time;

// create list of all upcoming calendar events
var events = [];

function isTimeWindow(numberOfEvents) {
  for (i = 0; i < numberOfEvents; i++) {
    eventName = "event" + parseInt(i);
    startEvent = msg.payload[i].eventStart;
    endEvent = msg.payload[i].eventEnd;
    allDayEvent = msg.payload[i].allDay;

    if (
      (currentTime >= startEvent && currentTime <= endEvent) ||
      allDayEvent === true
    ) {
      events[i] = true;
    } else {
      events[i] = false;
    }
  }
}

// function calling
isTimeWindow(messageLenght);



// checks if any of upcomming event is true (in current time window)
function checkState(state) {
  return state === true;
}

msg.payload = events.some(checkState);



return msg;
