// setup TME base
const outputGlobalSetTo = "quidoV2Lisovna";
const quidoInputs = 4; // number of quido outputs
const quidoOutputs = 4; // number of quido outputs
const roundTempDecimals = 0; //how many decimals for round temperature

// labels (for msg.topic)
let sensorLabels = {
  Quido_I1topic: "věž V2 (u skladu plechů)",
  Quido_I2topic: "",
  Quido_I3topic: "",
  Quido_I4topic: "",
  Quido_O1topic: "věž V2 (u skladu plechů)",
  Quido_O2topic: "",
  Quido_O3topic: "",
  Quido_O4topic: "",
  Quido_IP: "10.3.2.189",
  Quido_Location: "Lisovna: topná věž V2",
  teplotaQuidotopic: "rozvaděč věže V2"
};

///////////////////////////////////
///// CODE:
let sensors = {};
var out = msg.payload.outs.split("");
var inp = msg.payload.ins.split("");

// parse sensor temperature value
function parseSensorTemperature() {
  sensorName = "teplotaQuidoR";
  sensorValue = msg.payload.tempV / 1;
  sensors[sensorName] = sensorValue;
}

// parse sensor temperature value and round to 0 decimals
function parseSensorTemperatureRound() {
  sensorName = "teplotaQuido";
  sensorValue = msg.payload.tempV / 1;
  sensors[sensorName] = parseFloat(sensorValue.toFixed(roundTempDecimals));
}

// parse input states
function parseInputStates(sensorsAmount) {
  for (i = 0; i < sensorsAmount; i++) {
    sensorName = "Quido_I" + (parseInt(i) + 1);
    sensorValue = inp[i] / 1;
    sensors[sensorName] = sensorValue;
  }
}

// parse couter states
function parseCounterStates(sensorsAmount) {
  for (i = 0; i < sensorsAmount; i++) {
    sensorName = "Counter_I" + (parseInt(i) + 1);
    sensorValue = inp[i] / 1;
    sensors[sensorName] = sensorValue;
  }
}

// parse output states
function parseOutputStates(sensorsAmount) {
  for (i = 0; i < sensorsAmount; i++) {
    sensorName = "Quido_O" + (parseInt(i) + 1);
    sensorValue = out[i] / 1;
    sensors[sensorName] = sensorValue;
  }
}

// create sensor labels from dictionary sensorLabels
function createLabels() {
  for (const [key, value] of Object.entries(sensorLabels)) {
    sensors[key] = value;
  }
}

parseSensorTemperature();
parseSensorTemperatureRound();
parseInputStates(quidoInputs);
parseCounterStates(quidoInputs);
parseOutputStates(quidoOutputs);
createLabels();

sensors.Script_Path = msg.req.route.path;

// output
global.set(outputGlobalSetTo, sensors);
msg.payload = sensors;
return msg;
