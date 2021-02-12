
const blakJack =21;

let myDeck = JSON.parse(readJSON('cards.json'));
let countDeck = Object.keys(myDeck).length;


let dealerHand = new Array();
let playerHand = new Array();

let shuffledDeck;

let soundGetCard  = new Audio('./sounds/get-card.mp3');
var soundCashRegister = new Audio('./sounds/cash-register.mp3');

// Deal a deck
//dealRound();

async function dealRound () {
    resetTable();
    document.getElementById("btnStop").disabled = true;
    document.getElementById("btnGetACard").disabled = true;

    shuffledDeck = shuffle(JSON.parse(JSON.stringify(myDeck)));

    getACardPlayer();
    await sleep(500);
    getACardPlayer();
    await sleep(500);

    getAHiddenCardDealer();
    await sleep(500);
    getAHiddenCardDealer();

    document.getElementById("btnStop").disabled = false;
    document.getElementById("btnGetACard").disabled = false;
    
    // playerHand = [ shuffledDeck.pop(), shuffledDeck.pop() ];
    // addACardOnCanvas(playerHand[0], false, "player-container");
    // addACardOnCanvas(playerHand[1], false, "player-container");


    // dealerHand = [ shuffledDeck.pop(), shuffledDeck.pop() ];
    // addACardOnCanvas(dealerHand[0], true, "dealer-container");
    // addACardOnCanvas(dealerHand[1], true, "dealer-container");
}

// get card
function getACard(member, hide, container) {
    if (shuffledDeck.length > 0 ) {
        member.push(shuffledDeck.pop());
        addACardOnCanvas(member[member.length-1], hide, container);
        soundGetCard.play();
    }
}

function getACardPlayer() {
    getACard(playerHand, false, "player-container")
}

function getAHiddenCardDealer() {
    getACard(dealerHand, true, "dealer-container")
}

function sleep(ms) {
    return new Promise(resolve =>setTimeout(resolve, ms));
}

async function dealerGame() {
    while (countRank(dealerHand) <= 17 ) {
        //getACard(dealerHand, true, "dealer-container");

        getAHiddenCardDealer();
        await sleep(1000);
    }
    
}

function showDealerCards() {
    let delaerCards = document.getElementById("dealer-container").querySelectorAll(".card-image");
    delaerCards.forEach(element => {
        element.remove();
    });
    for (let i = 0; i < dealerHand.length; i++) {
        addACardOnCanvas(dealerHand[i], false, "dealer-container");
    }
}

let palyerRank;
let dealerRank;
let resultRound;

function countRank(member) {
    let rank = 0;
    let numberOfAces = 0;
    member.forEach(element => {
        switch(element.rank) {
            case "ace":
                numberOfAces++;
                break;
            case "jack":
            case "queen":
            case "king":
                rank = +rank + +10;
                break;
            default:
                rank = +rank + +element.rank;
        }
        console.log(rank);
    });

    if (numberOfAces!=0) {

        for (let i = 0; i < numberOfAces; i++) {
            
            let x = +11 + +numberOfAces - +1;
            if ((+rank + +x) > 21 ) {
                rank = +rank + +1;
            }
            else {
                rank = +rank + +11;
            }
        }
    }
    console.log(numberOfAces);
    return rank;
}

function announcementResult() {
    palyerRank = countRank(playerHand);
    dealerRank = countRank(dealerHand);

    let playerDif = blakJack - palyerRank;
    let dealerDif = blakJack - dealerRank;

    if (playerDif < 0 && dealerDif < 0 ) {
        resultRound = 1; //"draw";
    }
    else if (playerDif < 0) {
        resultRound = 0; //"loose";
    }
    else if (dealerDif < 0) {
        resultRound = 2; //"win";
    }
    else if (playerDif === dealerDif) {
        resultRound = 1;//"draw";
    }
    else if (playerDif < dealerDif) {
        resultRound = 2;//"win";
    }
    else if (playerDif > dealerDif) {
        resultRound = 0;//"loose";
    }
}

async function getResult() {
    await dealerGame();
    showDealerCards();
    announcementResult();
    //document.getElementById("logo-container").innerText = resultRound;
    setTimeout(function() {
        showResultWindow();
        }, 1000);
}

function showResultWindow (){
    $('.hover_bkgr_fricc').show();
    let dict = ["Loose", "play Draw", "Win"][resultRound];
    let resText = "You "+ dict +"!";
    document.getElementById("popup-title").innerText = resText;
    if (resultRound === 2) {
        soundCashRegister.play();
    }
    updateAccountAmount(resultRound);
}

function addACardOnCanvas(element, hide, container) {
    
    var img = document.createElement("img");
    img.setAttribute("class", "card-image");
    
    if (hide != true) {
        img.src = element.img;
        document.getElementById(container).appendChild(img);
    }
    else { 
        img.src = "./images/cards/back-red.png";
        document.getElementById(container).appendChild(img);
    }  
}

function resetTable (){
    dealerHand = [];
    playerHand = [];

    let delaerCards = document.getElementById("dealer-container").querySelectorAll(".card-image");
    delaerCards.forEach(element => {
        element.remove();
    });
    
    let playerCards = document.getElementById("player-container").querySelectorAll(".card-image");
    playerCards.forEach(element => {
        element.remove();
    });

    //dealRound();
}

function readJSON(file) {
    let request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
        return request.responseText;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
