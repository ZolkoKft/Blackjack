
const blakJack =21;

let myDeck = JSON.parse(readJSON('cards.json'));
let countDeck = Object.keys(myDeck).length;


let dealerHand;
let playerHand;

let shuffledDeck;

// Deal a deck
//dealRound();


function dealRound () {
    resetTable();
    shuffledDeck = shuffle(myDeck);

    playerHand = [ shuffledDeck.pop(), shuffledDeck.pop() ];
    addACardOnCanvas(playerHand[0], false, "player-container");
    addACardOnCanvas(playerHand[1], false, "player-container");


    dealerHand = [ shuffledDeck.pop(), shuffledDeck.pop() ];
    addACardOnCanvas(dealerHand[0], true, "dealer-container");
    addACardOnCanvas(dealerHand[1], true, "dealer-container");
}

// get card
function getACard(member, hide, container) {
    member.push(shuffledDeck.pop());
    addACardOnCanvas(member[member.length-1], hide, container);
}

function getACardPlayer() {
    getACard(playerHand, false, "player-container")
}

function dealerGame() {
    while (countRank(dealerHand) <= 17 ) {
        getACard(dealerHand, true, "dealer-container");
    }
    showDealerCards();
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
            
            if ((+rank + +11) > 21 ) {
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
        resultRound = "draw";
    }
    else if (playerDif < 0) {
        resultRound = "loose";
    }
    else if (dealerDif < 0) {
        resultRound = "win";
    }
    else if (playerDif === dealerDif) {
        resultRound = "draw";
    }
    else if (playerDif < dealerDif) {
        resultRound = "win";
    }
    else if (playerDif > dealerDif) {
        resultRound = "loose";
    }
}

function getResult() {
    dealerGame();
    announcementResult();
    //document.getElementById("logo-container").innerText = resultRound;
    showResultWindow();
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
};

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

$(window).on("load", function() {
    $('.hover_bkgr_fricc').show();
});

function showResultWindow (){
    $('.hover_bkgr_fricc').show();
    let resText = "You "+ resultRound +" !";
    document.getElementById("popup-title").innerText = resText;

}

// $(".trigger_popup_fricc").on('click', function(){
//     $('.hover_bkgr_fricc').show();
// });

$('.hover_bkgr_fricc').on('click', function(){
    $('.hover_bkgr_fricc').hide();
    dealRound();
});

$('.popupCloseButton').on('click', function(){
    $('.hover_bkgr_fricc').hide();
    dealRound();
});
