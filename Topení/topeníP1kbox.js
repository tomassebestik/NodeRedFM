// setup HEATING TOWER
const quidoBoard = "quidoKombibox";
const heatingLimitsHall = "limityTopeniKombibox";
const energyTrigger = 2;

var sensorPrimaryStatus = global.get("sensoryPripravna.stavS8");
var sensorPrimaryTemperature = global.get("sensoryPripravna.teplota8");
var sensorBackupTemperature = global.get("quidoKombibox.teplotaQuido");

var manualControl = global.get("heatManualKombibox");
var UIswitch = global.get("kboxControl_topeniP1");
const ipAddressQuidoEnd = 222;
const quidoDrivenOutput = 1;
const quidoOutputTime = 255; //pulse lenght

///////////////////////////////////
///// CODE:
var energyLoadTrigger = global.get(`dataEMAX.stopZatez${energyTrigger}`);
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

if (energyLoadTrigger === 1) {
  command = commandOff;
  drive = false;
  //manual control
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
