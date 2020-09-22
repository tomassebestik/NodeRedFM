// 5s klik na vstupu nodu

var rele  = global.get("quidoV2Lisovna.Quido_O1");
var vstup = global.get("quidoV2Lisovna.Quido_I1");
var count = context.get('count') || 0;

// počet sekund do chyby
var overflow = 600;



// definice stavu chyby
if (rele === 1 && vstup === 0) { 
    count += 5;
}

else { 
    count = 0; 
}

context.set('count', count);
msg.count = count;

// počítadlo chyby
if (count >= overflow) {
    chyba = true;
}

else {
    chyba = false;
}



//// button status
if (chyba === true) {
    payload = "chyba";
    log = "chyba";
    background = "red";

}

//
else if (rele === 0 && vstup === 0) {
    payload = "vypnuto";
    log = "vypnuto";
    background = "gray";

}

else if (rele === 1 && vstup === 0) {
    payload = "startuje ... " + count + "s";
    background = "#916b00";
}


else if (rele === 0 && vstup === 1) {
    payload = "dobíhá";
    background = "#5b5a70";

}


else if (rele === 1 && vstup === 1) {
    payload = "topí";
    log = "topí";
    background = "orange";

}


//
else {
    return null;
}

//// výstupy
var msg1 = {
    payload: payload,
    background: background,
};

var msg2 = {
    payload: log,
};

return [msg1, msg2];


//return msg;