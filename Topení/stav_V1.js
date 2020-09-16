// setup
const quidoBoard = "quidoV1Pripravna";
const inputPin = 1; //physical pin DI connected to Quido board
const relayPin = 1; //physical pin DO connected to Quido board

const minToError = 10; // minutes to error

///////////////////////////////////
///// CODE:

//error counter
var outputRelay = global.get(`${quidoBoard}.Quido_O${relayPin}`);
var inputDigital = global.get(`${quidoBoard}.Quido_I${inputPin}`);
var errorCounter = context.get("errorCounter") || 0;

if (outputRelay === 1 && inputDigital === 0) {
    errorCounter += 5;
} else {
    errorCounter = 0;
}
context.set("errorCounter", errorCounter);
msg.errorCounter = errorCounter;

var errorCounterOverflow = 60 * minToError;
if (errorCounter >= errorCounterOverflow) {
    chyba = true;
} else {
    chyba = false;
}

// button UI status
if (chyba === true) {
  payload = "chyba";
  log = "chyba";
  background = "red";
} else if (outputRelay === 0 && inputDigital === 0) {
  payload = "vypnuto";
  log = "vypnuto";
  background = "gray";
} else if (outputRelay === 1 && inputDigital === 0) {
  payload = "startuje ... " + errorCounter + "s";
  background = "#916b00";
} else if (outputRelay === 0 && inputDigital === 1) {
  payload = "dobíhá";
  background = "#5b5a70";
} else if (outputRelay === 1 && inputDigital === 1) {
  payload = "topí";
  log = "topí";
  background = "orange";
} else {
  //
  return null;
}

// output
var msg1 = {
  payload: payload,
  background: background
};

var msg2 = {
  payload: log
};

return [msg1, msg2];
