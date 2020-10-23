// setup
const heatingLimitsHall = "limityTopeniOffice";

///////////////////////////////////
///// CODE:

var limitLineLower_value = global.get(`${heatingLimitsHall}.SEG1`);
var limitLineUpper_value = global.get(`${heatingLimitsHall}.SEG2`);
var limitLineLower_tag = "▲";
var limitLineUpper_tag = "▼";

// temperatures
var temperature1 = global.get("senzoryITEO.teplota2");
var temperature2 = global.get("sensoryPripravna.teplota9");
var temperature3 = global.get("sensoryPripravna.teplota11");
var temperature4 = global.get("sensoryPripravna.teplota10");
var temperature5 = global.get("sensoryPripravna.teplota12");
var temperature6 = global.get("senzoryMorn.teplota7");
var temperature7 = global.get("senzoryMorn.teplota8");


// gauge labels
var topic1 = global.get("senzoryITEO.topic2");
var topic2 = global.get("sensoryPripravna.topic9");
var topic3 = global.get("sensoryPripravna.topic11");
var topic4 = global.get("sensoryPripravna.topic10");
var topic5 = global.get("sensoryPripravna.topic12");
var topic6 = global.get("senzoryMorn.topic7");
var topic7 = global.get("senzoryMorn.topic8");



// check sensor, if values are not nonsense (over 100° or 0°)
function checkSensorValues(temperatureVar) {
  if (temperatureVar < 100 && temperatureVar > 0) {
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

return [
  [limitUp, limitDown, msg1, msg2, msg3, msg4, msg5, msg6, msg7]
];
// msgX = one sensor
