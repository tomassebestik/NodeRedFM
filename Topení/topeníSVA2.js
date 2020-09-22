// setup HEATING COIL IN AIR-UNIT
const heatingLimitsHall = "limityTopeniSvarovna";
const quidoBoard = "quidoVYSTUPYSvarovna";

const ipAddressQuidoEnd = 231;
const quidoDrivenOutput = 11;
const quidoOutputTime = 255;

var sensorPrimaryStatus = global.get("senzorySvarovna.stavS4");
var sensorPrimaryTemperature = global.get("senzorySvarovna.teplota4");
var sensorBackupTemperature = global.get("senzorySvarovna.teplota3");
var manualControl = global.get("heatManualSvarovna");

var UIswitch = global.get("svarControl_topeni2");
var mainBranchSwitch = global.get("svarControl_privod2");

///////////////////////////////////
///// CODE:
var heatingStartTemperature = global.get(`${heatingLimitsHall}.START`);
var heatingStopTemperature = global.get(`${heatingLimitsHall}.STOP`);
var planHallCalendar = global.get(`${heatingLimitsHall}.STAV`);
var heatingPeriod = global.get(`topnaSezona`);
var outputRelay = global.get(`${quidoBoard}.Quido_O${quidoDrivenOutput}`);
var currentTemperature;
var thermostat;

// driving sensor priority / status 0,1,2,3 = OK; 4 = sensor error
if (sensorPrimaryStatus !== 4) {
  currentTemperature = sensorPrimaryTemperature;
} else {
  currentTemperature = sensorBackupTemperature;
}

// active heating allowed logic
var heatingHallAllowed;
if (planHallCalendar === true && heatingPeriod === true) {
  heatingHallAllowed = true;
} else {
  heatingHallAllowed = false;
}

// thermostat current status
if (
  currentTemperature <= heatingStartTemperature &&
  heatingHallAllowed === true
) {
  thermostat = true;
} else if (currentTemperature >= heatingStopTemperature) {
  thermostat = false;
} else thermostat = "mezi";

// driving API commands constructor
var commandOnPulse = `http://10.3.2.${ipAddressQuidoEnd}/set.xml?type=s&id=${quidoDrivenOutput}&time=${quidoOutputTime}`;
var commandOff = `http://10.3.2.${ipAddressQuidoEnd}/set.xml?type=r&id=${quidoDrivenOutput}`;

// control logic
var command;
var drive;

if (mainBranchSwitch === false) {
  command = commandOff;
  drive = false;
} else if (manualControl === true && UIswitch === false) {
  command = commandOff;
  drive = false;
} else if (manualControl === true && UIswitch === true) {
  command = commandOnPulse;
  drive = true;
} else if (
  manualControl === false &&
  UIswitch === false &&
  thermostat === false
) {
  command = commandOff;
  drive = false;
} else if (
  manualControl === false &&
  UIswitch === true &&
  thermostat === false
) {
  command = commandOff;
  drive = false;
} else if (
  manualControl === false &&
  UIswitch === false &&
  thermostat === true
) {
  command = commandOnPulse;
  drive = true;
} else if (
  manualControl === false &&
  UIswitch === true &&
  thermostat === true
) {
  command = commandOnPulse;
  drive = true;

  //manual
} else if (
  manualControl === false &&
  thermostat === "mezi" &&
  outputRelay === 0
) {
  // no command, only switch
  command = null;
  drive = false;
} else if (
  manualControl === false &&
  thermostat === "mezi" &&
  outputRelay === 1
) {
  command = null;
  drive = true;
} else command = null;

// output
var msg1 = {
  payload: command,
  url: command,
  drive: drive
};

var msg2 = {
  payload: currentTemperature,
  thermostat: thermostat,
  control: manualControl
};

return [msg1, msg2];
