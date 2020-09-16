// setup AIR BLOWER
const heatingLimitsHall = "limityTopeniLisovna";
var sensorPrimaryTemperature = global.get("senzoryLisovna.teplota6");
var sensorBackupTemperature = global.get("senzoryLisovna.teplota2");

var energyLoadTrigger = global.get("dataEMAX.stopZatez1");
var heatingCalendar = global.get("limityTopeniLisovna.STAV");
// var heatingCalendar = global.get("lis_calendarStatus");
var manualControl = global.get("heatManualLisovna");
var UIswitch = global.get("lisoControl_topeniFUV2");

const tempDifferenceTrigger = 3; // difference between sensors in °C
const ipAddressQuidoEnd = 216;
const quidoDrivenOutput = 2;
const quidoOutputTime = 255;

///////////////////////////////////
///// CODE:

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
var command;
var drive;

// control logic
if (energyLoadTrigger === 1) {
  command = commandOff;
  drive = false;
} else if (heatingCalendar === "zakázáno") {
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
  calendar: heatingCalendar
};

return [msg1, msg2];
