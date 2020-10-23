// setup
const manualControlPinTo = "heatManualPripravna";

const hallPin = global.get("security.pripravna");
const masterPin = global.get("security.master");

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