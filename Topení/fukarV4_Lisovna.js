// setup AIR BLOWER
// const quidoBoard = "";
const energyTrigger = 1;
const heatingLimitsHall = "limityTopeniLisovna";
var sensorPrimaryTemperature = global.get("senzoryLisovna.teplota7");
var sensorBackupTemperature = global.get("senzoryLisovna.teplota3");

var energyLoadTrigger = global.get("dataEMAX.stopZatez1");
var manualControl = global.get("heatManualLisovna");
var UIswitch = global.get("lisoControl_topeniFUV4");

const tempDifferenceTrigger = 3; // difference between sensors in °C
const ipAddressQuidoEnd = 216;
const quidoDrivenOutput = 1;
const quidoOutputTime = 255;

///////////////////////////////////
///// CODE:
var energyLoadTrigger = global.get(`dataEMAX.stopZatez${energyTrigger}`);
var planHallCalendar = global.get(`${heatingLimitsHall}.STAV`);
var heatingPeriod = global.get(`topnaSezona`);

// sensors difference calculation
var temperatureDiferrence;
if (
  sensorPrimaryTemperature !== undefined &&
  sensorBackupTemperature !== undefined
) {
  temperatureDiferrence = sensorPrimaryTemperature - sensorBackupTemperature;
}

// thermostat logic
var thermostat;
if (temperatureDiferrence >= tempDifferenceTrigger) {
  thermostat = true;
} else thermostat = false;

// driving API commands constructor
var commandOn = `http://10.3.2.${ipAddressQuidoEnd}/set.xml?type=s&id=${quidoDrivenOutput}&time=${quidoOutputTime}`;
var commandOff = `http://10.3.2.${ipAddressQuidoEnd}/set.xml?type=r&id=${quidoDrivenOutput}`;

// active heating allowed logic
var heatingHallAllowed;

if (planHallCalendar === true && heatingPeriod === true) {
  heatingHallAllowed = true;
} else {
  heatingHallAllowed = false;
}

// control logic
var command;
var drive;

if (energyLoadTrigger === 1) {
  command = commandOff;
  drive = false;
} else if (heatingHallAllowed === false) {
  command = commandOff;
  drive = false;
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
  command = commandOn;
  drive = true;
} else if (
  manualControl === false &&
  UIswitch === true &&
  thermostat === true
) {
  command = commandOn;
  drive = true;
} else if (manualControl === true && UIswitch === false) {
  // manuální řízení
  command = commandOff;
  drive = false;
} else if (manualControl === true && UIswitch === true) {
  command = commandOn;
  drive = true;
} else command = null;

//// výstupy
var msg1 = {
  payload: command,
  url: command,
  drive: drive
};

var msg2 = {
  payload: temperatureDiferrence,
  thermostat: thermostat,
  heatingAllowed: heatingHallAllowed
};

return [msg1, msg2];
