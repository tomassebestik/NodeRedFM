// setup TME base
let sensors = {};
const sensorsActive = 14; // number of active sensors
const roundTempDecimals = 0; //how many decimals for round temperature

// labels (for msg.topic)
sensors.topic1 = "regál F";
sensors.topic2 = "ohýbačky";
sensors.topic3 = "ohraňováky";
sensors.topic4 = "kardex";
sensors.topic5 = "trubkový laser / NEU";
sensors.topic6 = "NOAX";
sensors.topic7 = "střed haly";
sensors.topic8 = "vrata auditaréna";
sensors.topic9 = "vedoucí údržby";
sensors.topic10 = "konstrukce";
sensors.topic11 = "TPV";
sensors.topic12 = "velká zasedačka";
sensors.topic13 = "MQS hlavní";
sensors.topic14 = "MQS přípravkárna";

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
global.set("sensoryPripravna", sensors);
msg.payload = sensors;
return msg;
