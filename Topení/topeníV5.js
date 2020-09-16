// setup HEATING TOWER
const heatingLimitsHall = "limityTopeniPripravna";
var sensorPrimaryStatus = global.get("senzorLANaudit.teplotaLANT");
var sensorPrimaryTemperature = global.get("senzorLANaudit.teplotaLANT");
var sensorBackupTemperature = global.get("senzoryPripravna.teplota4");

var outputRelay = global.get("quidoV5Pripravna.Quido_O1");
var manualControl = global.get("heatManualPripravna");
var UIswitch = global.get("pripControl_topeniV5");
const ipAddressQuidoEnd = 204;
const quidoDrivenOutput = 1;
const quidoOutputTime = 255;

///////////////////////////////////
///// CODE:
var heatingStartTemperature = global.get(`${heatingLimitsHall}.START`);
var heatingStopTemperature = global.get(`${heatingLimitsHall}.STOP`);
var currentTemperature;
var thermostat;

// driving sensor priority / status 0,1,2,3 = OK; 4 = sensor error
if (sensorPrimaryStatus !== 0 || sensorPrimaryStatus < 100) {
  currentTemperature = sensorPrimaryTemperature;
} else {
  currentTemperature = sensorBackupTemperature;
}

// thermostat current status
if (currentTemperature <= heatingStartTemperature) {
  thermostat = true;
} else if (currentTemperature >= heatingStopTemperature) {
  thermostat = false;
} else thermostat = "mezi";

// driving API commands constructor
var commandOnPulse = `http://10.3.2.${ipAddressQuidoEnd}/set.xml?type=s&id=${quidoDrivenOutput}&time=${quidoOutputTime}`;
var commandOff = `http://10.3.2.${ipAddressQuidoEnd}/set.xml?type=r&id=${quidoDrivenOutput}`;

//// kombinace stavů
var command;
var drive;

// automatické řízení
if (manualControl === false && UIswitch === false && thermostat === false) {
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
} else if (manualControl === true && UIswitch === false) {
  command = commandOff;
  drive = false;
} else if (manualControl === true && UIswitch === true) {
  command = commandOnPulse;
  drive = true;
} else command = null;

if (manualControl === false && thermostat === "mezi" && outputRelay === 0) {
  (command = null); (drive = false);
} else if (
  manualControl === false &&
  thermostat === "mezi" &&
  outputRelay === 1
) {
  (command = null); (drive = true);
}

// output
var msg1 = {
  payload: command,
  url: command,
  drive: drive
};

var msg2 = {
  payload: currentTemperature,
  thermostat: thermostat
};

return [msg1, msg2];
