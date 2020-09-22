// setup
const inputGlobalSetTo = "senzoryLisovna";

///////////////////////////////////
///// CODE:

var status1 = global.get(`${inputGlobalSetTo}.stavS1`);
var status2 = global.get(`${inputGlobalSetTo}.stavS2`);
var status3 = global.get(`${inputGlobalSetTo}.stavS3`);
var status4 = global.get(`${inputGlobalSetTo}.stavS4`);
var status5 = global.get(`${inputGlobalSetTo}.stavS5`);
var status6 = global.get(`${inputGlobalSetTo}.stavS6`);
var status7 = global.get(`${inputGlobalSetTo}.stavS7`);

var topic1 = "SENZOR: Hala: LISOVNA, snímač: sklad plechů";
var topic2 = "SENZOR: Hala: LISOVNA, snímač: Brünhuber";
var topic3 = "SENZOR: Hala: LISOVNA, snímač: střed haly";
var topic4 = "SENZOR: Hala: LISOVNA, snímač: Schuller 1000";
var topic5 = "SENZOR: Hala: LISOVNA, snímač: Schuller 630";
var topic6 = "SENZOR: Hala: LISOVNA, snímač: srážeč strop V2 (Fu2)";
var topic7 = "SENZOR: Hala: LISOVNA, snímač: srážeč strop V4 (Fu1)";


// output
var msg1 = { payload: status1, topic: topic1 };
var msg2 = { payload: status2, topic: topic2 };
var msg3 = { payload: status3, topic: topic3 };
var msg4 = { payload: status4, topic: topic4 };
var msg5 = { payload: status5, topic: topic5 };
var msg6 = { payload: status6, topic: topic6 };
var msg7 = { payload: status7, topic: topic7 };

return [
  msg1,
  msg2,
  msg3,
  msg4,
  msg5,
  msg6,
  msg7,
];
