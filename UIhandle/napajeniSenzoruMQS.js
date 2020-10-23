// setup
const inputGlobalSetTo = "sensoryPripravna";

///////////////////////////////////
///// CODE:

// battery
var battery1 = global.get(`${inputGlobalSetTo}.baterie13`);
var battery2 = global.get(`${inputGlobalSetTo}.baterie14`);

// gauge labels
var topic1 = global.get(`${inputGlobalSetTo}.topic13`);
var topic2 = global.get(`${inputGlobalSetTo}.topic14`);

//// výstupy
var msg1 = {payload: battery1, topic: topic1};
var msg2 = {payload: battery2, topic: topic2};


return [msg1, msg2];