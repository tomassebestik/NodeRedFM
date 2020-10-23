// setup
const manualControlPinTo = "heatManualKombibox";

const hallPin = global.get("security.kombibox");
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