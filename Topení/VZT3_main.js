// setup AIR-UNIT WELDSHOP - mainswitch
const ipAddressQuidoEnd = 231;
const quidoDrivenOutput = 1;
const heatingLimitsHall = "limityTopeniSvarovna";

var manualControl = global.get("heatManualSvarovna");
var UIswitch = global.get("svarControl_hlavniVypinac1");

///////////////////////////////////
///// CODE:

// driving API commands constructor
var commandOn = `http://10.3.2.${ipAddressQuidoEnd}/set.xml?type=s&id=${quidoDrivenOutput}`;
var commandOff = `http://10.3.2.${ipAddressQuidoEnd}/set.xml?type=r&id=${quidoDrivenOutput}`;
var planHallCalendar = global.get(`${heatingLimitsHall}.STAV`);

// control logic
var command;
var drive;

if (manualControl === false && planHallCalendar === false && UIswitch === false) {
  command = commandOff;
  drive = false;
} else if (manualControl === false && planHallCalendar === false && UIswitch === true) {
  command = commandOff;
  drive = false;
} else if (manualControl === false && planHallCalendar === true && UIswitch === false) {
  command = commandOn;
  drive = true;
} else if (manualControl === false && planHallCalendar === true && UIswitch === true) {
  command = commandOn;
  drive = true;
} else if (manualControl === true && planHallCalendar === false && UIswitch === false) {
  command = commandOff;
  drive = false;
} else if (manualControl === true && planHallCalendar === false && UIswitch === true) {
  command = commandOn;
  drive = true;
} else if (manualControl === true && planHallCalendar === true && UIswitch === false) {
  command = commandOff;
  drive = false;
} else if (manualControl === true && planHallCalendar === true && UIswitch === true) {
  command = commandOn;
  drive = true;
} else command = null;

// output
var msg1 = {
  payload: command,
  url: command,
  drive: drive
};
var msg2 = {
  calendar: planHallCalendar,
  control: manualControl
};

return [msg1, msg2];