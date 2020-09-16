// setup
const inputPrefix = "lis";
const fontSize = 6;
const allowedColor = "green";
const allowedMessage = "povoleno";

const forbidenColor = "grey";
const forbidenMessage = "zakázáno";

const location = "Lisovna";
const limitsGlobalSetTo = "limityTopeniLisovna";
const optimalWorkingTemperature = 22; // graph center axis
const allowedHeatingUIGaugeLimits = 8;
const allowedHeatingUIGaugeColorChange = 4;
const forbidenHeatingUIGaugeLimits = 18;
const forbidenHeatingUIGaugeColorChange = 12;

///////////////////////////////////
///// CODE:
//

var allowedHeatingStart = global.get(`${inputPrefix}_topSTARTP`);
var allowedHeatingStop  = global.get(`${inputPrefix}_topSTOPP`);
var forbidenHeatingStart= global.get(`${inputPrefix}_topSTARTZ`);
var forbidenHeatingStop = global.get(`${inputPrefix}_topSTOPZ`);

// from node input stream
var eventStart = msg.payload[0].eventStart;
var eventEnd = msg.payload[0].eventEnd;
var eventAllDay = msg.payload[0].allDay;
var currentTime = msg.time;

// parse calendar event
if (
  (currentTime >= eventStart && currentTime <= eventEnd) ||
  eventAllDay === true
) {
  statusShiftCurrent = 1;
  message = `<font color=${allowedColor}><font size = ${fontSize}>${allowedMessage}`;
  logMessage = allowedMessage;
  statusLabelText = allowedMessage;
  popUpHighlight = allowedColor;
} else {
  statusShiftCurrent = 0;
  message = `<font color=${forbidenColor}><font size = ${fontSize}>${forbidenMessage}`;
  logMessage = forbidenMessage;
  statusLabelText = forbidenMessage;
  popUpHighlight = forbidenColor;
}

// kontejner
let heatingLimits = {};
heatingLimits.OPTIMUM = optimalWorkingTemperature;
heatingLimits.LOKACE = location;

if (statusShiftCurrent === 1) {
  heatingLimits.STAV = "povoleno";

  heatingLimits.MAX = optimalWorkingTemperature + allowedHeatingUIGaugeLimits;
  heatingLimits.MIN = optimalWorkingTemperature - allowedHeatingUIGaugeLimits;
  heatingLimits.SEG1 =
    optimalWorkingTemperature - allowedHeatingUIGaugeColorChange;
  heatingLimits.SEG2 =
    optimalWorkingTemperature + allowedHeatingUIGaugeColorChange;
  heatingLimits.START = allowedHeatingStart;
  heatingLimits.STOP = allowedHeatingStop;
} else {
  heatingLimits.STAV = "zakázáno";
  heatingLimits.MAX = optimalWorkingTemperature + forbidenHeatingUIGaugeLimits;
  heatingLimits.MIN = optimalWorkingTemperature - forbidenHeatingUIGaugeLimits;
  heatingLimits.SEG1 =
    optimalWorkingTemperature - forbidenHeatingUIGaugeColorChange;
  heatingLimits.SEG2 =
    optimalWorkingTemperature + forbidenHeatingUIGaugeColorChange;
  heatingLimits.START = forbidenHeatingStart;
  heatingLimits.STOP = forbidenHeatingStop;
}

// output
var msg1 = { payload: statusShiftCurrent, topic: statusLabelText };
var msg2 = { payload: message };
var msg3 = { payload: logMessage, highlight: popUpHighlight };
var msg4 = { payload: heatingLimits };
var msg5 = { payload: allowedHeatingStart };
var msg6 = { payload: allowedHeatingStop };
var msg7 = { payload: forbidenHeatingStart };
var msg8 = { payload: forbidenHeatingStop };

global.set(limitsGlobalSetTo, heatingLimits);
return [msg1, msg2, msg3, msg4, msg5, msg6, msg7, msg8];