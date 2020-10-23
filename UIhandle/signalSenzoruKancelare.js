// setup
const inputGlobalSetTo = "sensoryPripravna";

///////////////////////////////////
///// CODE:

// signal
var signal1 = global.get(`${inputGlobalSetTo}.signal9`);
var signal2 = global.get(`${inputGlobalSetTo}.signal10`);
var signal3 = global.get(`${inputGlobalSetTo}.signal11`);
var signal4 = global.get(`${inputGlobalSetTo}.signal12`);
var signal5 = global.get(`senzoryMorn.signal7`);
var signal6 = global.get(`senzoryMorn.signal8`);
var signal7 = global.get(`senzoryITEO.signal2`);


// gauge labels
var topic1 = global.get(`${inputGlobalSetTo}.topic9`);
var topic2 = global.get(`${inputGlobalSetTo}.topic10`);
var topic3 = global.get(`${inputGlobalSetTo}.topic11`);
var topic4 = global.get(`${inputGlobalSetTo}.topic12`);
var topic5 = global.get(`senzoryMorn.topic7`);
var topic6 = global.get(`senzoryMorn.topic8`);
var topic7 = global.get(`senzoryITEO.topic2`);

// output
var msg1 = {payload: signal1, topic: topic1};
var msg2 = {payload: signal2, topic: topic2};
var msg3 = {payload: signal3, topic: topic3};
var msg4 = {payload: signal4, topic: topic4};
var msg5 = {payload: signal5, topic: topic5};
var msg6 = {payload: signal6, topic: topic6};
var msg7 = {payload: signal7, topic: topic7};

return [msg1, msg2, msg3, msg4, msg5, msg6, msg7];