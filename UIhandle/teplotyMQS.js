// setup
const inputGlobalSetTo = "sensoryPripravna";
const heatingLimitsHall = "limityTopeniPripravna";

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
var temperature1 = global.get(`${inputGlobalSetTo}.teplota13`);
var temperature2 = global.get(`${inputGlobalSetTo}.teplota14`);

// gauge labels
var topic1 = global.get(`${inputGlobalSetTo}.topic13`);
var topic2 = global.get(`${inputGlobalSetTo}.topic14`);

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

return [limitUp, limitDown, msg1, msg2];
// msgX = one sensor
