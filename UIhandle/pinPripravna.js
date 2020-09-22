// setup
const manualControlPinTo = "heatManualPripravna";
const hallPin = "*****";
const masterPin = "*****";

///////////////////////////////////
///// CODE:
var pin = msg.payload;
var unlock;

if (pin === hallPin || pin === masterPin) {
  unlock = true;
} else {
  unlock = false;
}

// output
global.set(manualControlPinTo, unlock);
msg.payload = unlock;
return msg;
