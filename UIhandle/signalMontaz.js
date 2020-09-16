// setup
const inputGlobalSetTo = "sensorsMontaz";
const heatingLimitsHall = "limityTopeniMontaz";

///////////////////////////////////
///// CODE:

// signal
var signal1 = global.get(`${inputGlobalSetTo}.signal1`);
var signal2 = global.get(`${inputGlobalSetTo}.signal2`);
var signal3 = global.get(`${inputGlobalSetTo}.signal3`);
var signal4 = global.get(`${inputGlobalSetTo}.signal4`);
var signal5 = global.get(`${inputGlobalSetTo}.signal5`);


// gauge labels
var topic1 = global.get(`${inputGlobalSetTo}.topic1`);
var topic2 = global.get(`${inputGlobalSetTo}.topic2`);
var topic3 = global.get(`${inputGlobalSetTo}.topic3`);
var topic4 = global.get(`${inputGlobalSetTo}.topic4`);
var topic5 = global.get(`${inputGlobalSetTo}.topic5`);

//// výstupy
var msg1 = {payload: signal1, topic: topic1};
var msg2 = {payload: signal2, topic: topic2};
var msg3 = {payload: signal3, topic: topic3};
var msg4 = {payload: signal4, topic: topic4};
var msg5 = {payload: signal5, topic: topic5};

return [msg1, msg2, msg3, msg4, msg5];