// setup HEATING TOWER
const quidoBoard = "quidoMorn";
const ipAddressQuidoEnd = 219;
const quidoDrivenOutput = 1;
const quidoOutputTime = 255;
const heatingLimitsHall = "limityTopeniMorn";

const sensorPrimaryStatus = global.get("senzoryMorn.stavS3");
const sensorPrimaryTemperature = global.get("senzoryMorn.teplota3");
const sensorBackupTemperature = global.get("senzoryMorn.teplota2");

var manualControl = global.get("heatManualMorn");
var UIswitch = global.get("mornControl_topeniMR1");



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
if ((currentTemperature <= heatingStartTemperature) && heatingHallAllowed === true) {
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



//manual control
if (manualControl === true && UIswitch === false) {
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
}

// no command, only switch
else if (manualControl === false && thermostat === "mezi" && outputRelay === 0) {
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
