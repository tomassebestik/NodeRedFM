/// STATUS - fukar pro V2
// na vstup node opakovací puls

var rele  = global.get("quidoFu1Lisovna.Quido_O2");



// chyba
if (rele === 0) {
    msg.payload = "vypnuto";
    msg.background = "gray";
}

else if (rele === 1) {
    msg.payload = "fouká";
    msg.background = "#00acd1";
}

else {
    return null;
}

return msg;