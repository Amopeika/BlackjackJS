const image = [
    "/img/cards_png_zip/PNG/2C.png",
    "/img/cards_png_zip/PNG/3C.png",
    "/img/cards_png_zip/PNG/4C.png",
    "/img/cards_png_zip/PNG/5C.png",
    "/img/cards_png_zip/PNG/6C.png",
    "/img/cards_png_zip/PNG/7C.png",
    "/img/cards_png_zip/PNG/8C.png",
    "/img/cards_png_zip/PNG/9C.png",
    "/img/cards_png_zip/PNG/10C.png",
    "/img/cards_png_zip/PNG/JC.png",
    "/img/cards_png_zip/PNG/QC.png",
    "/img/cards_png_zip/PNG/KC.png",
    "/img/cards_png_zip/PNG/AC.png",
    "/img/cards_png_zip/PNG/2D.png",
    "/img/cards_png_zip/PNG/3D.png",
    "/img/cards_png_zip/PNG/4D.png",
    "/img/cards_png_zip/PNG/5D.png",
    "/img/cards_png_zip/PNG/6D.png",
    "/img/cards_png_zip/PNG/7D.png",
    "/img/cards_png_zip/PNG/8D.png",
    "/img/cards_png_zip/PNG/9D.png",
    "/img/cards_png_zip/PNG/10D.png",
    "/img/cards_png_zip/PNG/JD.png",
    "/img/cards_png_zip/PNG/QD.png",
    "/img/cards_png_zip/PNG/KD.png",
    "/img/cards_png_zip/PNG/AD.png",
    "/img/cards_png_zip/PNG/2H.png",
    "/img/cards_png_zip/PNG/3H.png",
    "/img/cards_png_zip/PNG/4H.png",
    "/img/cards_png_zip/PNG/5H.png",
    "/img/cards_png_zip/PNG/6H.png",
    "/img/cards_png_zip/PNG/7H.png",
    "/img/cards_png_zip/PNG/8H.png",
    "/img/cards_png_zip/PNG/9H.png",
    "/img/cards_png_zip/PNG/10H.png",
    "/img/cards_png_zip/PNG/JH.png",
    "/img/cards_png_zip/PNG/QH.png",
    "/img/cards_png_zip/PNG/KH.png",
    "/img/cards_png_zip/PNG/AH.png",
    "/img/cards_png_zip/PNG/2S.png",
    "/img/cards_png_zip/PNG/3S.png",
    "/img/cards_png_zip/PNG/4S.png",
    "/img/cards_png_zip/PNG/5S.png",
    "/img/cards_png_zip/PNG/6S.png",
    "/img/cards_png_zip/PNG/7S.png",
    "/img/cards_png_zip/PNG/8S.png",
    "/img/cards_png_zip/PNG/9S.png",
    "/img/cards_png_zip/PNG/10S.png",
    "/img/cards_png_zip/PNG/JS.png",
    "/img/cards_png_zip/PNG/QS.png",
    "/img/cards_png_zip/PNG/KS.png",
    "/img/cards_png_zip/PNG/AS.png"
];

const value = [2,3,4,5,6,7,8,9,10,10,10,10,0];

let cardDeck = [];
let dealer;
let player;
let aceFound = false;
let dealerblackjack = false;
let playerblackjack = false;
let playerbust = false;
let dealerbust = false;
let dealerlose = false;
let playerlose = false;
let draw = false;
let playerstand = false;
let bothstand = false;
let scorecounted = false;
let dealerscore = 0;
let playerscore = 0;

class Card{ //The Card Object 

    image = ""; // Image of the card
    cardvalue;  //Value of the card

    constructor(image,value) {
        this.image = image;
        this.cardvalue = value;
    }
};

class Deck{ //The Deck Object
    Cards = [];

    createDeck = function(){ //Creates a deck of 52 cards with their designated image and value
        let i = 0;
        image.forEach(element => {

            if(i >= 13){
                i = 0
            }

            this.Cards.push(new Card(element,value[i]));
            i++;
        });
    };

    dealCards = function(){ //Deals Cards to both player and house
        dealer.dealerHand.Cards = new Array(); 
        dealer.dealerHand.Cards.push(dealer.dealerHand.addCard(),dealer.dealerHand.addCard());
        player.playerHand.Cards = new Array();
        player.playerHand.Cards.push(player.playerHand.addCard(),player.playerHand.addCard());
    }
};

class Hand{ //The Hand Object
    Cards = [];
    Total; // The total value of the Hand

    constructor(cards,total){
        this.Cards = cards;
        this.Total = total;
    }

    addCard = function(){   //Gets a random card from the deck and removes it from the array
        let randomCard;
        let randomNumber = Math.floor(Math.random() * cardDeck.Cards.length); //get a random number
        randomCard = cardDeck.Cards[randomNumber]; //get the card from the array
        cardDeck.Cards.splice(randomNumber,1); //remove the card
        return randomCard;
    }
};

class Player{ //Player Object
    playerHand = new Hand();
}

class Dealer{ //Dealer/House object
    dealerHand = new Hand();
}

function calculateTotal(){ //Calculates the total hand value of the dealer and player

    if (playerstand){ //Only calculates the total dealer hand value if the player stands
        dealer.dealerHand.total = 0;
        dealer.dealerHand.Cards.forEach(element =>{ 
            
            if (element.cardvalue == 0){//Searches for an ace in the hand
                aceFound = true;
            }
        });
    
        dealer.dealerHand.Cards.forEach(element =>{
            dealer.dealerHand.total += element.cardvalue; //Adds the card value to the dealers total hand value
        });
        
        if (aceFound && (dealer.dealerHand.total + 11) <= 21){ //If an ace was found and the total hand value + 11 would exceed 21 the ace is worth 1
            dealer.dealerHand.total += 11;
            aceFound = false;
        }
    
        else if (aceFound && (dealer.dealerHand.total + 11) > 21){
            dealer.dealerHand.total += 1;
            aceFound = false;
        }
    }
    player.playerHand.total = 0;
    player.playerHand.Cards.forEach(element =>{
        
        if (element.cardvalue == 0){
            aceFound = true;
        }
    });

    player.playerHand.Cards.forEach(element =>{
        player.playerHand.total += element.cardvalue;
    });
    
    if (aceFound && (player.playerHand.total + 11) <= 21){
        player.playerHand.total += 11;
        aceFound = false;
    }

    else if (aceFound && (player.playerHand.total + 11) > 21){
        player.playerHand.total += 1;
        aceFound = false;
    }
    checkWinningCondition();
}

function checkWinningCondition(){   //Checks the winning conditions for both player and dealer

    if (player.playerHand.total == 21 && player.playerHand.Cards.length == 2 && !playerblackjack){ //if the player got 21 and only got two cards in his hand it is an instant blackjack
        playerblackjack = true;
        Stand();
        scorecounted = true;
    }

    else if (player.playerHand.total > 21){ //if the player card value totals more then 21 the player loses
        playerbust = true;
    }

    else if (playerstand){

        if (dealer.dealerHand.total > 21){ //if the dealer card value totals more then 21 the dealer loses
            dealerbust = true;
        }

        else if (dealer.dealerHand.total == 21 && dealer.dealerHand.Cards.length == 2){ //if the dealer got 21 and only got two cards in his hand it is an instant blackjack
            dealerblackjack = true;
        }
    } 

    if (playerblackjack && dealerblackjack){ // if both dealer and player got a blackjack its a push
       draw = true; 
    }

    if(bothstand && !playerbust && !dealerbust && !draw && !playerblackjack){

        if(dealer.dealerHand.total > player.playerHand.total){ //if the dealer got a higher hand total value after both standed and none of them busted the dealer wins
            playerlose = true;
        }

        else if (dealer.dealerHand.total < player.playerHand.total){ //if the player got a higher hand total value after both standed and none of them busted the player wins
            dealerlose = true;    
        }
        
        else if (dealer.dealerHand.total == player.playerHand.total){ //if both player and dealer have the same hand value its a push
            draw = true;
        }
    }
    let gamestance;
    
    if (!scorecounted){//checks if the score has been countes before to prevent double booking

        /*
        *   We set the right winning messages and give points
        */
        playground = document.getElementById("playerNametag");
        playground.innerHTML = "";
    
        playground = document.getElementById("dealerNametag");
        playground.innerHTML = "";
        
        if (draw){
            gamestance = document.createElement("h3");
            gamestance.className = "text-danger"
            gamestance.innerHTML = "Push";
            document.getElementById("playerNametag").appendChild(gamestance);
        }
        else {
    
            if (playerlose){
                dealerscore++
                gamestance = document.createElement("h3");
                gamestance.className = "text-danger"
                gamestance.innerHTML = "Lose";
                document.getElementById("playerNametag").appendChild(gamestance);
                gamestance = document.createElement("h3");
                gamestance.className = "text-success"
                gamestance.innerHTML = "Win";
                document.getElementById("dealerNametag").appendChild(gamestance);
            }
        
            else if (dealerlose){
                playerscore++
                gamestance = document.createElement("h3");
                gamestance.className = "text-danger"
                gamestance.innerHTML = "Lose";
                document.getElementById("dealerNametag").appendChild(gamestance);
                gamestance = document.createElement("h3");
                gamestance.className = "text-success"
                gamestance.innerHTML = "Win";
                document.getElementById("playerNametag").appendChild(gamestance);
            }
        
            else if (playerbust){
                dealerscore++
                gamestance = document.createElement("h3");
                gamestance.className = "text-danger"
                gamestance.innerHTML = "Bust";
                document.getElementById("playerNametag").appendChild(gamestance);
                gamestance = document.createElement("h3");
                gamestance.className = "text-success"
                gamestance.innerHTML = "Win";
                document.getElementById("dealerNametag").appendChild(gamestance);
            }
        
            else if (dealerbust){
                playerscore++
                gamestance = document.createElement("h3");
                gamestance.className = "text-danger"
                gamestance.innerHTML = "Bust";
                document.getElementById("dealerNametag").appendChild(gamestance);
                gamestance = document.createElement("h3");
                gamestance.className = "text-success"
                gamestance.innerHTML = "Win";
                document.getElementById("playerNametag").appendChild(gamestance);
            }
    
            else if (playerblackjack){
                playerscore++
                gamestance = document.createElement("h3");
                gamestance.className = "text-danger"
                gamestance.innerHTML = "Lose";
                document.getElementById("dealerNametag").appendChild(gamestance);
                gamestance = document.createElement("h3");
                gamestance.className = "text-success"
                gamestance.innerHTML = "Blackjack";
                document.getElementById("playerNametag").appendChild(gamestance);
            }
    
            else if (dealerblackjack){
                dealerscore++
                gamestance = document.createElement("h3");
                gamestance.className = "text-danger"
                gamestance.innerHTML = "Lose";
                document.getElementById("playerNametag").appendChild(gamestance);
                gamestance = document.createElement("h3");
                gamestance.className = "text-success"
                gamestance.innerHTML = "Blackjack";
                document.getElementById("dealerNametag").appendChild(gamestance);
            }
        }

    }
    
    playgroundUpdate();
}

function Hit(){//gives the player another card and sends it back to calculate the hand total value
    player.playerHand.Cards.push(player.playerHand.addCard()); 
    calculateTotal();
}

function Stand(){//stands and does the dealers moves if there is need for it
    playerstand = true;
    if (!playerblackjack){
        calculateTotal();
        while(dealer.dealerHand.total < 17){ //only gives the dealer cards if he is under 17 and the player doesnt have blackjack yet
            dealer.dealerHand.Cards.push(dealer.dealerHand.addCard());
            calculateTotal();
        }
    }
    bothstand = true;
    calculateTotal();
}

function playgroundUpdate(){ //updates the whole site to show the right buttons and messages
    initiatePlayground();
    if(playerstand || playerlose || playerbust || draw || playerblackjack){
        document.getElementById("hitbutton").style.display = "none";
        document.getElementById("standbutton").style.display = "none";
        document.getElementById("restartbutton").style.display = "initial";
    }

    if(!playerstand){

        dealercards = document.createElement("img");
        dealercards.className = "cards";
        dealercards.src = dealer.dealerHand.Cards[0].image;
        document.getElementById("dealerHand").appendChild(dealercards);
        dealercards = document.createElement("img");
        dealercards.className = "cards";
        dealercards.src = "/img/cards_png_zip/PNG/red_back.png";
        document.getElementById("dealerHand").appendChild(dealercards);
    }

    else if (playerstand){
        
        dealer.dealerHand.Cards.forEach(element => {
            dealercards = document.createElement("img");
            dealercards.className = "cards";
            dealercards.src = element.image;
            document.getElementById("dealerHand").appendChild(dealercards);
        });
        dealercards = document.createElement("h6");
        dealercards.innerHTML = "House Total: " + dealer.dealerHand.total;
        document.getElementById("dealerTotal").appendChild(dealercards);
    };
    let playercards
    player.playerHand.Cards.forEach(element => {
        playercards = document.createElement("img");
        playercards.className = "cards";
        playercards.src = element.image;
        document.getElementById("playerHand").appendChild(playercards);
    })
    playercards = document.createElement("h6");
    playercards.innerHTML = "Player Total: " + player.playerHand.total;
    document.getElementById("playerTotal").appendChild(playercards);

    dealercards = document.createElement("h3");
    dealercards.innerHTML = "House Score: " + dealerscore;
    document.getElementById("dealerScore").appendChild(dealercards);

    playercards = document.createElement("h3");
    playercards.innerHTML = "Player Score: " + playerscore;
    document.getElementById("playerScore").appendChild(playercards);
}

function initiatePlayground(){//creates the right html elements for the playgroundupdate() to fill out

    let playground;
    playground = document.getElementById("playerElements");
    playground.innerHTML = "";

    playground = document.createElement("div");
    playground.className = "col-3";
    playground.id = "playerScore";
    document.getElementById("playerElements").appendChild(playground);

    playground = document.createElement("div");
    playground.className = "col-6";
    playground.id = "playerHand";
    document.getElementById("playerElements").appendChild(playground);

    playground = document.createElement("div");
    playground.className = "col-3";
    playground.id = "playerTotal";
    document.getElementById("playerElements").appendChild(playground);

    playground = document.getElementById("dealerElements");
    playground.innerHTML = "";

    playground = document.createElement("div");
    playground.className = "col-3";
    playground.id = "dealerScore";
    document.getElementById("dealerElements").appendChild(playground);

    playground = document.createElement("div");
    playground.className = "col-6";
    playground.id = "dealerHand";
    document.getElementById("dealerElements").appendChild(playground);

    playground = document.createElement("div");
    playground.className = "col-3";
    playground.id = "dealerTotal";
    document.getElementById("dealerElements").appendChild(playground);

}

function Restart(){ // resets the game to the initial state
    
    document.getElementById("hitbutton").style.display = "initial";
	document.getElementById("standbutton").style.display = "initial";
    document.getElementById("restartbutton").style.display = "none";

    playground = document.getElementById("playerNametag");
    playground.innerHTML = "";

    playground = document.getElementById("dealerNametag");
    playground.innerHTML = "";
    
    aceFound = false;
    dealerblackjack = false;
    playerblackjack = false;
    playerbust = false;
    dealerbust = false;
    dealerlose = false;
    playerlose = false;
    draw = false;
    playerstand = false;
    bothstand = false;
    scorecounted = false;
    
    Game();
}

function Game(){ //creates a new game session
    cardDeck = new Deck();
    cardDeck.createDeck();
    player = new Player();
    dealer = new Dealer();
    cardDeck.dealCards();
    calculateTotal();
}

document.addEventListener("DOMContentLoaded", () => {
    Game();
    console.log(playerbust)
});
