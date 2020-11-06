// setup

// mixing valves position (0-100%)
var mixValve1 = parseInt(global.get(`mixPosition1`));
var mixValve2 = parseInt(global.get(`mixPosition2`));
var mixValve3 = parseInt(global.get(`mixPosition3`));
var mixValve4 = parseInt(global.get(`mixPosition4`));

// gauge labels
var topic1 = "směšovací ventil VZT1";
var topic2 = "směšovací ventil VZT2";
var topic3 = "směšovací ventil VZT3";
var topic4 = "směšovací ventil VZT4";

///////////////////////////////////
///// CODE:

// output
var msg1 = {
  payload: mixValve1,
  topic: topic1
};
var msg2 = {
  payload: mixValve2,
  topic: topic2
};
var msg3 = {
  payload: mixValve3,
  topic: topic3
};
var msg4 = {
  payload: mixValve4,
  topic: topic4
};

return [[msg1, msg2, msg3, msg4]];
