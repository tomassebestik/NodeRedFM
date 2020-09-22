// setup
const quidoBoard = "quidoFu1Lisovna";
const relayPin = 2; //physical pin DO connected to Quido board

///////////////////////////////////
///// CODE:

var outputRelay = global.get(`${quidoBoard}.Quido_O${relayPin}`);

if (outputRelay === 0) {
  msg.payload = "vypnuto";
  msg.background = "gray";
} else if (outputRelay === 1) {
  msg.payload = "fouká";
  msg.background = "#00acd1";
} else {
  return null;
}

return msg;
