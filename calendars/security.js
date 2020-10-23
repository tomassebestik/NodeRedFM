// SETUP
const pinHallMorn = "1111";
const pinHallSvarovna = "2222";
const pinHallPripravna = "3333";
const pinHallLisovna = "4444";
const pinHallDynapac = "5555";
const pinHallKombibox = "6666";
const pinMaster = "2638";
const passwordAdmin = "2638admin";


///////////////////////////////////
///// CODE:
let security = {};
security.morn = pinHallMorn;
security.svarovna = pinHallSvarovna;
security.pripravna = pinHallPripravna;
security.lisovna = pinHallLisovna;
security.dynapac = pinHallDynapac;
security.kombibox = pinHallKombibox;
security.master = pinMaster;
security.admin = passwordAdmin;


// output
msg.payload = security;
global.set("security", security);
return msg;
