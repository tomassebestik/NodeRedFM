// setup
const calendarHallPrefix = "office";


var start = msg.payload[0].eventStart;
var end = msg.payload[0].eventEnd;
var fullday = msg.payload[0].allDay;



global.set(`${calendarHallPrefix}_eventStart`, start);
global.set(`${calendarHallPrefix}_eventEnd`, end);
global.set(`${calendarHallPrefix}_eventAllDay`, fullday);


var msg1 = {payload: start, topic: "Event START"};
var msg2 = {payload: end, topic: "Event END"};
var msg3 = {payload: fullday, topic: "AllDay Event"};


// output
return [ msg1, msg2, msg3 ];