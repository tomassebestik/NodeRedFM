// setup
const inputGlobalSetTo = "sensoryPripravna";
const heatingLimitsHall = "limityTopeniPripravna";

///////////////////////////////////
///// CODE:

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
var temperature6 = global.get("senzorLANkartace.teplotaLANT");
var temperature7 = global.get("senzorLANaudit.teplotaLANT");
var temperature8 = global.get("quidoV1Pripravna.teplotaQuido");
var temperature9 = global.get("quidoV5Pripravna.teplotaQuido");

// gauge labels
var topic1 = global.get(`${inputGlobalSetTo}.topic1`);
var topic2 = global.get(`${inputGlobalSetTo}.topic2`);
var topic3 = global.get(`${inputGlobalSetTo}.topic3`);
var topic4 = global.get(`${inputGlobalSetTo}.topic4`);
var topic5 = global.get(`${inputGlobalSetTo}.topic5`);
var topic6 = global.get("senzorLANkartace.topicLANT");
var topic7 = global.get("senzorLANaudit.topicLANT");
var topic8 = global.get("quidoV1Pripravna.teplotaQuidotopic");
var topic9 = global.get("quidoV5Pripravna.teplotaQuidotopic");

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
var msg4 = {
  payload: checkSensorValues(temperature4),
  topic: topic4
};
var msg5 = {
  payload: checkSensorValues(temperature5),
  topic: topic5
};
var msg6 = {
  payload: checkSensorValues(temperature6),
  topic: topic6
};
var msg7 = {
  payload: checkSensorValues(temperature7),
  topic: topic7
};
var msg8 = {
  payload: checkSensorValues(temperature8),
  topic: topic8
};
var msg9 = {
  payload: checkSensorValues(temperature9),
  topic: topic9
};

return [
  [limitUp, limitDown, msg1, msg2, msg3, msg4, msg5, msg6, msg7, msg8, msg9]
];
// msgX = one sensor
