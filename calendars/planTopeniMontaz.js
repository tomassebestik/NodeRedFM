// setup
const inputPrefix = "mont";
const fontSize = 6;
const allowedColor = "green";
const allowedMessage = "povoleno";

const forbidenColor = "grey";
const forbidenMessage = "zakázáno";


const location = "Montáž hlavní";
const limitsGlobalSetTo = "limityTopeniMontaz";
const optimalWorkingTemperature = 22; // graph center axis

const allowedHeatingSetTemperature = 20;
const allowedHeatingHysteresisStart = -2;
const allowedHeatingHysteresisStop = +1;
const allowedHeatingUIGaugeLimits = 8;
const allowedHeatingUIGaugeColorChange = 4;

const forbidenHeatingSetTemperature = 15;
const forbidenHeatingHysteresisStart = -1;
const forbidenHeatingHysteresisStop = +1;
const forbidenHeatingUIGaugeLimits = 18;
const forbidenHeatingUIGaugeColorChange = 12;

///////////////////////////////////
///// CODE:
//
var currentTime = msg.payload;
var eventStart = global.get(`${inputPrefix}_eventStart`);
var eventEnd = global.get(`${inputPrefix}_eventEnd`);
var eventAllDay = global.get(`${inputPrefix}_eventAllDay`);

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
  heatingLimits.SET = allowedHeatingSetTemperature;
  heatingLimits.MAX = optimalWorkingTemperature + allowedHeatingUIGaugeLimits;
  heatingLimits.MIN = optimalWorkingTemperature - allowedHeatingUIGaugeLimits;
  heatingLimits.SEG1 =
    optimalWorkingTemperature - allowedHeatingUIGaugeColorChange;
  heatingLimits.SEG2 =
    optimalWorkingTemperature + allowedHeatingUIGaugeColorChange;
  heatingLimits.START =
    allowedHeatingSetTemperature + allowedHeatingHysteresisStart;
  heatingLimits.STOP =
    allowedHeatingSetTemperature + allowedHeatingHysteresisStop;
} else {
  heatingLimits.STAV = "zakázáno";
  heatingLimits.SET = forbidenHeatingSetTemperature;
  heatingLimits.MAX = optimalWorkingTemperature + forbidenHeatingUIGaugeLimits;
  heatingLimits.MIN = optimalWorkingTemperature - forbidenHeatingUIGaugeLimits;
  heatingLimits.SEG1 =
    optimalWorkingTemperature - forbidenHeatingUIGaugeColorChange;
  heatingLimits.SEG2 =
    optimalWorkingTemperature + forbidenHeatingUIGaugeColorChange;
  heatingLimits.START =
    forbidenHeatingSetTemperature + forbidenHeatingHysteresisStart;
  heatingLimits.STOP =
    forbidenHeatingSetTemperature + forbidenHeatingHysteresisStop;
}

// output
var msg1 = {
  payload: statusShiftCurrent,
  topic: statusLabelText
};

var msg2 = {
  payload: message
};

var msg3 = {
  payload: logMessage,
  highlight: popUpHighlight
};

var msg4 = {
  payload: heatingLimits
};

global.set(limitsGlobalSetTo, heatingLimits);
return [msg1, msg2, msg3, msg4];
