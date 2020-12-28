// setup AIR-UNIT WELDSHOP - mainswitch
const ipAddressQuidoEnd = 231;
const quidoDrivenOutput = 7;
const heatingLimitsHall = 'limityTopeniSvarovna';
const energyTrigger = 5; //EMAX disconnect LEVEL
const antiFreeze = global.get('antiFreezeSVA4');

var manualControl = global.get('heatManualSvarovna');
var UIswitch = global.get('svarControl_privod4');

///////////////////////////////////
///// CODE:

// driving API commands constructor
var commandOn = `http://10.3.2.${ipAddressQuidoEnd}/set.xml?type=s&id=${quidoDrivenOutput}`;
var commandOff = `http://10.3.2.${ipAddressQuidoEnd}/set.xml?type=r&id=${quidoDrivenOutput}`;
var energyLoadTrigger = global.get(`dataEMAX.stopZatez${energyTrigger}`);
var streamPlanHallCalendar = global.get(`${heatingLimitsHall}.STAV`);
var planHallCalendar;

// Antifreeze mechanism
if (streamPlanHallCalendar || antiFreeze === true) {
    planHallCalendar = true;
} else {
    planHallCalendar = false;
}
// control logic
var command;
var drive;

if (energyLoadTrigger === 1) {
    command = commandOff;
    drive = false;
    //manual control
} else if (
    manualControl === false &&
    planHallCalendar === false &&
    UIswitch === false
) {
    command = commandOff;
    drive = false;
} else if (
    manualControl === false &&
    planHallCalendar === false &&
    UIswitch === true
) {
    command = commandOff;
    drive = false;
} else if (
    manualControl === false &&
    planHallCalendar === true &&
    UIswitch === false
) {
    command = commandOn;
    drive = true;
} else if (
    manualControl === false &&
    planHallCalendar === true &&
    UIswitch === true
) {
    command = commandOn;
    drive = true;
} else if (
    manualControl === true &&
    planHallCalendar === false &&
    UIswitch === false
) {
    command = commandOff;
    drive = false;
} else if (
    manualControl === true &&
    planHallCalendar === false &&
    UIswitch === true
) {
    command = commandOn;
    drive = true;
} else if (
    manualControl === true &&
    planHallCalendar === true &&
    UIswitch === false
) {
    command = commandOff;
    drive = false;
} else if (
    manualControl === true &&
    planHallCalendar === true &&
    UIswitch === true
) {
    command = commandOn;
    drive = true;
} else command = null;

// output
var msg1 = {
    payload : command,
    url     : command,
    drive   : drive,
    delay   : 4000
};
var msg2 = {
    calendar : planHallCalendar,
    control  : manualControl
};

return [ msg1, msg2 ];
