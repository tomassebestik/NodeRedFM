// setup
let sensors = {};
const sensorsActive = 5; // number of active sensors

// labels (for msg.topic)
sensors.topic1 = "linka Bobcat";
sensors.topic2 = "linka Kubota";
sensors.topic3 = "předmontáž";
sensors.topic4 = "podesta Textil";
sensors.topic5 = "sklad barev";

const roundTempDecimals = 0; //how many decimals for round temperature
// mapper / change scales
const mapperScale = (value, in_min, in_max, out_min, out_max) => {
  return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
var scaleBattery = [1, 8, 0, 100];
var scaleSignal = [-110, -30, 0, 100];

// parse sensor temperature value
function parseSensorTemperature(sensorsAmount) {
  for (i = 0; i < sensorsAmount; i++) {
    sensorName = "teplota" + (parseInt(i) + 1) + "r";
    sensorValue = msg.payload.root.sns[i].$.v1 / 10;

    sensors[sensorName] = sensorValue;
  }
}

// parse sensor temperature value and round to 0 decimals
function parseSensorTemperatureRound(sensorsAmount) {
  for (i = 0; i < sensorsAmount; i++) {
    sensorName = "teplota" + (parseInt(i) + 1);
    sensorValue = msg.payload.root.sns[i].$.v1 / 10;

    sensors[sensorName] = parseFloat(sensorValue.toFixed(roundTempDecimals));
  }
}

// parse sensor parse sensor working status
function parseSensorStatus(sensorsAmount) {
  for (i = 0; i < sensorsAmount; i++) {
    sensorName = "stavS" + (parseInt(i) + 1);
    sensorValue = msg.payload.root.sns[i].$.s1;
    //
    sensors[sensorName] = parseInt(sensorValue);
  }
}

// sensor battery capacity in range 1-8 (TME format)
function parseSensorBattery(sensorsAmount) {
  for (i = 0; i < sensorsAmount; i++) {
    sensorName = "baterie" + (parseInt(i) + 1) + "r";
    sensorValue = msg.payload.root.sns[i].$.batt;
    //
    sensors[sensorName] = parseInt(sensorValue);
  }
}

// parse sensor battery capacity in range 0-100% (UI format)
function parseSensorBatteryUI(sensorsAmount) {
  for (i = 0; i < sensorsAmount; i++) {
    sensorName = "baterie" + (parseInt(i) + 1);
    sensorValue = msg.payload.root.sns[i].$.batt;
    //
    sensors[sensorName] = parseInt(mapperScale(sensorValue, ...scaleBattery));
  }
}

// sensor sensor signal level
function parseSensorSignal(sensorsAmount) {
  for (i = 0; i < sensorsAmount; i++) {
    sensorName = "signal" + (parseInt(i) + 1) + "r";
    sensorValue = msg.payload.root.sns[i].$.rssi;
    //
    sensors[sensorName] = parseInt(sensorValue);
  }
}

// sensor sensor signal level
function parseSensorSignalUI(sensorsAmount) {
  for (i = 0; i < sensorsAmount; i++) {
    sensorName = "signal" + (parseInt(i) + 1);
    sensorValue = msg.payload.root.sns[i].$.rssi;
    //
    sensors[sensorName] = parseInt(mapperScale(sensorValue, ...scaleSignal));
  }
}

// functions calling
parseSensorTemperature(sensorsActive);
parseSensorTemperatureRound(sensorsActive);
parseSensorStatus(sensorsActive);
parseSensorBattery(sensorsActive);
parseSensorBatteryUI(sensorsActive);
parseSensorSignal(sensorsActive);
parseSensorSignalUI(sensorsActive);

// output
global.set("sensorsMontaz", sensors);
msg.payload = sensors;
return msg;
