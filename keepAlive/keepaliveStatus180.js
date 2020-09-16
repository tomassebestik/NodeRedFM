/// SETUP - ethernet Thermometer LAN
var pingStatus = msg.payload;
const outputGlobalSetTo = "LANThlavniMontazHalaStatus";

// set ping keepalive device status (true/false)
function checkPingStatus() {
  if (pingStatus === false) {
    global.set(outputGlobalSetTo, false);
    msg.payload = false;
  } else {
    global.set(outputGlobalSetTo, true);
    msg.payload = true;
  }
}

//function calling
checkPingStatus();

// output
return msg;
