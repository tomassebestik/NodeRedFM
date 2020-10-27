// setup
const heatingLimitsHall = "limityTopeniServer";

///////////////////////////////////
///// CODE:

var limitLineLower_value = global.get(`${heatingLimitsHall}.SEG1`);
var limitLineUpper_value = global.get(`${heatingLimitsHall}.SEG2`);
var limitLineLower_tag = "▲";
var limitLineUpper_tag = "▼";

// temperatures
var temperature1 = global.get(`senzoryITEO.teplota3`);
var temperature2 = global.get(`senzorLANSERVERStara.teplotaLANT`);
var temperature3 = global.get(`senzorLANSERVERLakovna.teplotaLANT`);


// gauge labels
var topic1 = global.get(`senzoryITEO.topic3`);
var topic2 = global.get(`senzorLANSERVERStara.topicLANT`);
var topic3 = global.get(`senzorLANSERVERLakovna.topicLANT`);


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
  topic: topic1
};
var msg2 = {
  payload: checkSensorValues(temperature2),
  topic: topic2
};
var msg3 = {
  payload: checkSensorValues(temperature3),
  topic: topic3
};

return [
  [limitUp, limitDown, msg1, msg2, msg3]
];
// msgX = one sensor
