// 4 seconds input click
var inputMsg = msg.payload;
var counter = context.get("counter") || 0;
var inError = context.get("chyba") || false;
var repairMessage;

const errorCounterLimit = 30;

// counter
if (inputMsg === "chyba") {
  counter += 1;
} else {
  counter = 0;
}

context.set("counter", counter);

// logic
if (inputMsg === "chyba" && inError === false && counter >= errorCounterLimit) {
  outputMessage = "chyba";
  repairMessage = null;
  context.set("chyba", true);
} else if (inputMsg !== "chyba" && inError === true) {
  outputMessage = inputMsg;
  repairMessage = "OK";
  context.set("chyba", false);
} else if (inputMsg !== "chyba" && inError === false) {
  outputMessage = inputMsg;
} else outputMessage = "";

// output
msg.payload = outputMessage;
msg.repair = repairMessage;
msg.error = inError;

return msg;
