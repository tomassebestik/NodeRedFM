/// SETUP - ethernet Thermometer LAN
const outputGlobalSetTo = "senzorLANkartace";
const roundTemperatureDecimals = 0;

// labels (for msg.topic)
let sensorLabels = {
  topicLANT: "kartáče laser",
  topicLANTl: "Hala: PŘÍPRAVNA, snímač: kartáče laser",
  LANT_IP: "10.3.2.185",
  LANTLocation: "Přípravna: kartáče laser"
};

///////////////////////////////////
///// CODE:
let sensors = {};

// parse sensor temperature value
function parseSensorTemperature() {
  sensorName = "teplotaLANTr";
  sensorValue = msg.payload.thermometer.temperature[0] / 10;
  sensors[sensorName] = sensorValue;
}

// parse sensor temperature value and round to 0 decimals
function parseSensorTemperatureRound() {
  sensorName = "teplotaLANT";
  sensorValue = msg.payload.thermometer.temperature[0] / 10;
  sensors[sensorName] = parseFloat(
    sensorValue.toFixed(roundTemperatureDecimals)
  );
}

// create sensor labels from dictionary sensorLabels
function createLabels() {
  for (const [key, value] of Object.entries(sensorLabels)) {
    sensors[key] = value;
  }
}

// functions calling
parseSensorTemperature();
parseSensorTemperatureRound();
createLabels();

// output
global.set(outputGlobalSetTo, sensors);
msg.payload = sensors;
return msg;
