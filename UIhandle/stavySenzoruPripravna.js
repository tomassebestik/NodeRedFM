// setup
const inputGlobalSetTo = "sensoryPripravna";

///////////////////////////////////
///// CODE:

// 5s klik na vstupu nodu
var status1 = global.get(`${inputGlobalSetTo}.stavS1`);
var status2 = global.get(`${inputGlobalSetTo}.stavS2`);
var status3 = global.get(`${inputGlobalSetTo}.stavS3`);
var status4 = global.get(`${inputGlobalSetTo}.stavS4`);
var status5 = global.get(`${inputGlobalSetTo}.stavS5`);
var status6 = global.get(`${inputGlobalSetTo}.stavS6`);
var status7 = global.get(`${inputGlobalSetTo}.stavS7`);
var status8 = global.get(`${inputGlobalSetTo}.stavS8`);
var status9 = global.get(`${inputGlobalSetTo}.stavS9`);
var status10 = global.get(`${inputGlobalSetTo}.stavS10`);
var status11 = global.get(`${inputGlobalSetTo}.stavS10`);
var status12 = global.get(`${inputGlobalSetTo}.stavS12`);
var status13 = global.get(`${inputGlobalSetTo}.stavS13`);
var status14 = global.get(`${inputGlobalSetTo}.stavS14`);

var topic1 = "SENZOR: Hala: PŘÍPRAVNA, snímač: regál F";
var topic2 = "SENZOR: Hala: PŘÍPRAVNA, snímač: ohýbačky";
var topic3 = "SENZOR: Hala: PŘÍPRAVNA, snímač: ohraňováky";
var topic4 = "SENZOR: Hala: PŘÍPRAVNA, snímač: kardex";
var topic5 = "SENZOR: Hala: PŘÍPRAVNA, snímač: trubkový laser / NEU";
var topic6 = "SENZOR: Hala: SVAŘOVNA, snímač: NOAX";
var topic7 = "SENZOR: Hala: MALÁ MONTÁŽ, snímač: střed haly";
var topic8 = "SENZOR: Hala: KOMBIBOX, snímač: vrata auditaréna";
var topic9 = "SENZOR: KANCELÁŘE, snímač: vedoucí údržby";
var topic10 = "SENZOR: KANCELÁŘE, snímač: konstrukce";
var topic11 = "SENZOR: KANCELÁŘE, snímač: TPV";
var topic12 = "SENZOR: KANCELÁŘE, snímač: velká zasedačka";
var topic13 = "SENZOR: místnosti MĚŘENÍ, snímač: MQS hlavní";
var topic14 = "SENZOR: místnosti MĚŘENÍ, snímač: MQS přípravkárna";

//// výstupy
var msg1 = { payload: status1, topic: topic1 };
var msg2 = { payload: status2, topic: topic2 };
var msg3 = { payload: status3, topic: topic3 };
var msg4 = { payload: status4, topic: topic4 };
var msg5 = { payload: status5, topic: topic5 };
var msg6 = { payload: status6, topic: topic6 };
var msg7 = { payload: status7, topic: topic7 };
var msg8 = { payload: status8, topic: topic8 };
var msg9 = { payload: status9, topic: topic9 };
var msg10 = { payload: status10, topic: topic10 };
var msg11 = { payload: status11, topic: topic11 };
var msg12 = { payload: status12, topic: topic12 };
var msg13 = { payload: status13, topic: topic13 };
var msg14 = { payload: status14, topic: topic14 };

return [
  msg1,
  msg2,
  msg3,
  msg4,
  msg5,
  msg6,
  msg7,
  msg8,
  msg9,
  msg10,
  msg11,
  msg12,
  msg13,
  msg14
];
