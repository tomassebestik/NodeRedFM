// setup
let sensors = {};
const roundTempDecimals = 0; //how many decimals for round temperature

// labels (for msg.topic)
sensors.topic_teplota = "město Vyškov";
sensors.topic_dnesMAX = "dnešní předpokládaná MAX teplota";
sensors.topic_dnesMIN = "dnešní předpokládaná MIN teplota";
sensors.topic_vlhkost = "vlhkost vzduchu";
sensors.topic_tlak = "tlak vzduchu";
sensors.topic_vitrRychlost = "rychlost větru";
sensors.topic_oblacnost = "oblačnost";
sensors.topic_vychodSlunce = "východ slunce";
sensors.topic_zapadSlunce = "západ slunce";
sensors.topic_stav = "stav počasí";
sensors.topic_ikona = "ikona počasí";
sensors.topic_misto = "sekundární meteostanice";
sensors.topic_vitrSmer = "směr větru";

// hodnoty
sensors.weather = msg.payload.weather;
sensors.teplota = parseFloat(msg.payload.tempc.toFixed(0));
sensors.dnesMAX = parseFloat(msg.payload.temp_maxc.toFixed(0));
sensors.dnesMIN = parseFloat(msg.payload.temp_minc.toFixed(0));
sensors.vlhkost = msg.payload.humidity;
sensors.tlak = msg.payload.pressure;
sensors.vitrRychlost = parseFloat(msg.payload.windspeed.toFixed(0));
sensors.oblacnost = msg.payload.clouds;
sensors.vychodSlunce = msg.payload.sunrise;
sensors.zapadSlunce = msg.payload.sunset;
sensors.stav = msg.payload.detail;
sensors.ikona = msg.payload.icon;
sensors.misto = msg.payload.location;

if (msg.payload.winddirection !== undefined) {
  sensors.vitrSmer = msg.payload.winddirection;
}

// uložit všechna data do global.""
global.set("hodnotyOWM", sensors);
msg.payload = sensors;
return msg;
