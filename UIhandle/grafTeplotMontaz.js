// setup
const inputGlobalSetTo = "sensorsMontaz";
const heatingLimitsHall = "limityTopeniMontaz";

///////////////////////////////////
///// CODE:

// UI gauges limits
let ui_control = {};
ui_control.max = global.get(`${heatingLimitsHall}.MAX`);
ui_control.min = global.get(`${heatingLimitsHall}.MIN`);
ui_control.seg1 = global.get(`${heatingLimitsHall}.SEG1`);
ui_control.seg2 = global.get(`${heatingLimitsHall}.SEG2`);

var limitLineLower_value = global.get(`${heatingLimitsHall}.SEG1`);
var limitLineUpper_value = global.get(`${heatingLimitsHall}.SEG2`);
var limitLineLower_tag = "▲";
var limitLineUpper_tag = "▼";

// temperatures
var temperature1 = global.get(`${inputGlobalSetTo}.teplota1`);
var temperature2 = global.get(`${inputGlobalSetTo}.teplota2`);
var temperature3 = global.get(`${inputGlobalSetTo}.teplota3`);
var temperature4 = global.get(`${inputGlobalSetTo}.teplota4`);
var temperature5 = global.get(`${inputGlobalSetTo}.teplota5`);
var temperature6 = global.get("senzorLANmontazHala.teplotaLANT");

// gauge labels
var topic1 = global.get(`${inputGlobalSetTo}.topic1`);
var topic2 = global.get(`${inputGlobalSetTo}.topic2`);
var topic3 = global.get(`${inputGlobalSetTo}.topic3`);
var topic4 = global.get(`${inputGlobalSetTo}.topic4`);
var topic5 = global.get(`${inputGlobalSetTo}.topic5`);
var topic6 = global.get("senzorLANmontazHala.topicLANT");

// check sensor, if values are not nonsense (over 100° or 0°)
function checkSensorValues(temperatureVar) {
  if (temperatureVar < 100 || temperatureVar >= 0) {
    return temperatureVar;
  } else return null;
}

// output
var limitUp = { payload: limitLineUpper_value, topic: limitLineUpper_tag };
var limitDown = { payload: limitLineLower_value, topic: limitLineLower_tag };
//
var msg1 = {
  payload: checkSensorValues(temperature1),
  topic: topic1,
  ui_control: ui_control
};
var msg2 = {
  payload: checkSensorValues(temperature2),
  topic: topic2,
  ui_control: ui_control
};
var msg3 = {
  payload: checkSensorValues(temperature3),
  topic: topic3,
  ui_control: ui_control
};
var msg4 = {
  payload: checkSensorValues(temperature4),
  topic: topic4,
  ui_control: ui_control
};
var msg5 = {
  payload: checkSensorValues(temperature5),
  topic: topic5,
  ui_control: ui_control
};
var msg6 = {
  payload: checkSensorValues(temperature6),
  topic: topic6,
  ui_control: ui_control
};

return [limitUp, limitDown, msg1, msg2, msg3, msg4, msg5, msg6];
// msgX = one sensor
