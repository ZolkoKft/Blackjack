
//Start contitions
let totalAccount = 500;
let riskAmount = 50;
document.getElementById("inAmount").setAttribute('value', riskAmount);
document.getElementById("pAllAmount").innerText = totalAccount;

function updateAccountAmount(result) {

    switch(result) {
        case 1:
            totalAccount = +totalAccount + +riskAmount;
        case 2:
            totalAccount = +totalAccount + +riskAmount + +riskAmount;
    }

    document.getElementById("inAmount").disabled = false;
    document.getElementById("btnStart").disabled = false;
    document.getElementById("pAllAmount").innerText = totalAccount;
}

function Start() {
    riskAmount = document.getElementById("inAmount").value; 
    document.getElementById("inAmount").disabled = true;
    document.getElementById("btnStart").disabled = true;
    totalAccount = +totalAccount - +riskAmount;
    document.getElementById("pAllAmount").innerText = totalAccount;
    dealRound();
}