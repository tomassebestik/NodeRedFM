// setup
const minutesToCouterOverflow = 55;
const outputStabilityGlobalSetTo = "syncCalKancelare";
const calendarForLocationLabel = "Kanceláře";

///////////////////////////////////
///// CODE:
//
var offlineCounter = context.get("count") || 0;
var counterOverflow = minutesToCouterOverflow * 60;
// var calendarSendsData;

// calendar shift status active
if (msg.payload.length === 0) {
  // calendarSendsData = false;
  offlineCounter += 30;
  payload = null;
} else {
  // calendarSendsData = true;
  offlineCounter = 0;
  payload = msg.payload;
}

// synchro error counter
if (offlineCounter >= counterOverflow) {
  gaugeUIstatus = 0;
} else {
  gaugeUIstatus = 1;
}
context.set("count", offlineCounter);

// sync stability metric
if (offlineCounter !== undefined && counterOverflow !== undefined) {
  syncStability = parseFloat((100 - offlineCounter / 3600 * 100).toFixed(0));
}

// output
var msg1 = { payload: gaugeUIstatus, count: offlineCounter };
var msg2 = { payload: payload };
var msg3 = { payload: syncStability, topic: calendarForLocationLabel };

global.set(outputStabilityGlobalSetTo, syncStability);
return [msg1, msg2, msg3];
