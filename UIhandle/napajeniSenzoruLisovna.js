// setup
const inputGlobalSetTo = "sensorsMontaz";
const heatingLimitsHall = "limityTopeniMontaz";

///////////////////////////////////
///// CODE:

// battery
var battery1 = global.get(`${inputGlobalSetTo}.baterie1`);
var battery2 = global.get(`${inputGlobalSetTo}.baterie2`);
var battery3 = global.get(`${inputGlobalSetTo}.baterie3`);
var battery4 = global.get(`${inputGlobalSetTo}.baterie4`);
var battery5 = global.get(`${inputGlobalSetTo}.baterie5`);
var battery6 = global.get(`${inputGlobalSetTo}.baterie6`);
var battery7 = global.get(`${inputGlobalSetTo}.baterie7`);


// gauge labels
var topic1 = global.get(`${inputGlobalSetTo}.topic1`);
var topic2 = global.get(`${inputGlobalSetTo}.topic2`);
var topic3 = global.get(`${inputGlobalSetTo}.topic3`);
var topic4 = global.get(`${inputGlobalSetTo}.topic4`);
var topic5 = global.get(`${inputGlobalSetTo}.topic5`);
var topic6 = global.get(`${inputGlobalSetTo}.topic6`);
var topic7 = global.get(`${inputGlobalSetTo}.topic7`);

//// výstupy
var msg1 = {payload: battery1, topic: topic1};
var msg2 = {payload: battery2, topic: topic2};
var msg3 = {payload: battery3, topic: topic3};
var msg4 = {payload: battery4, topic: topic4};
var msg5 = {payload: battery5, topic: topic5};
var msg6 = {payload: battery6, topic: topic6};
var msg7 = {payload: battery7, topic: topic7};

return [msg1, msg2, msg3, msg4, msg5, msg6, msg7];