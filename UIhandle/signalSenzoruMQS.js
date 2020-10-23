// setup
const inputGlobalSetTo = "sensoryPripravna";

///////////////////////////////////
///// CODE:

// signal
var signal1 = global.get(`${inputGlobalSetTo}.signal13`);
var signal2 = global.get(`${inputGlobalSetTo}.signal14`);


// gauge labels
var topic1 = global.get(`${inputGlobalSetTo}.topic13`);
var topic2 = global.get(`${inputGlobalSetTo}.topic14`);

//// výstupy
var msg1 = {payload: signal1, topic: topic1};
var msg2 = {payload: signal2, topic: topic2};

return [msg1, msg2];