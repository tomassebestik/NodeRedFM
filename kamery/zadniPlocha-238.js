//setup
const ipCamEnd = 238

var inputPreset = msg.payload; //number
var commandCam = `http://10.3.2.${ipCamEnd}/ISAPI/PTZCtrl/channels/1/presets/${inputPreset}/goto`


// output
msg.payload = commandCam;
msg.url = commandCam;
return msg;
