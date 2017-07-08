// SET UP ALL THE VARIABLES, ARRAYS, ETC ..........................
var suits = ["Diamonds","Hearts","Spades","Clubs"];
var ranks = ["Ace","2","3","4","5","6","7","8","9","10"];
var deck = [];
var myHand = [];
var dealerHand = [];
var myChecker = false;
var dealerChecker = false;
var myCount = 0;
var dealerCount = 0;
var randomSuit;
var randomRank;
var hit;
var stay;
//..................................................................

// Main function when starting the game - Deals the initial 2 cards to player and computer - ..........
function deal()
{
    reassign();
    for (var i = 0; i < 2; i++)
        {
            draw();
            while (myChecker == false && (i > 0))
                {
                    checkMyDeck();
                }

            var card = 
                {
                    suit: (suits[randomSuit]),
                    rank: (ranks[randomRank])   
                };
            myHand.push(card);
            deck.push(card);
            getMyValue();
        }
    
    for (var i = 0; i < 2; i++)
        {
            draw();
            while (dealerChecker == false && (i > 0))
                {
                    checkDealerDeck();
                }
            var card = 
                {
                    suit: (suits[randomSuit]),
                    rank: (ranks[randomRank])
                };
            dealerHand.push(card);
            deck.push(card);
            getDealerValue();
        }
    updateCount();
    dealerChecker = false;
    myChecker = false;
}
//.........................................................................................

//Checks whether the drawn player card is already in use
function checkMyDeck()
{
    for (var i = 0; i < deck.length; i++)
        {
            if ((deck[i].suit == suits[randomSuit]) && (deck[i].rank ==ranks[randomRank]))
                {
                    myChecker = false;
                }
            
            else
                {
                    myChecker = true;
                }
        }
}
//...........................................................................................

//Checks whether the drawn dealer card is already in use 
function checkDealerDeck()
{
    for (var i = 0; i < deck.length; i++)
        {
            if ((deck[i].suit == suits[randomSuit]) && (deck[i].rank ==ranks[randomRank]))
                {
                    dealerChecker = false;
                }
            
            else
                {
                    dealerChecker = true;
                }
        }
}
//............................................................................................

// Draws a card by randomly selecting a suit and rank
function draw()
{
    randomSuit = Math.floor(Math.random()*(suits.length));
    randomRank = Math.floor(Math.random()*(ranks.length));
}
//.............................................................................................

// Figures out the value of the card drawn for the player
function getMyValue()
{
    if (ranks[randomRank] == "Ace")
        {
            if (myCount + 11 > 21)
                {
                    myCount = myCount + 1;
                }
            else 
                {
                    myCount = myCount + 11;
                }
        }
    else
        {
            myCount = myCount + (parseInt(ranks[randomRank]));
        }
}
//................................................................................................

//Figures out the value of the card drawn for the dealer
function getDealerValue()
{
   if (ranks[randomRank] == "Ace")
        {
            if (dealerCount + 11 > 21)
                {
                    dealerCount = dealerCount + 1;
                }
            else 
                {
                    dealerCount = dealerCount + 11;
                }
        }
    else
        {
            dealerCount = dealerCount + (parseInt(ranks[randomRank]));
        }
}
//....................................................................................................

// Reassigns buttons after starting the game
function reassign()
{
    document.getElementById("start").style.display = "none";
    
    hitButton = document.createElement("BUTTON");
    var hitText = document.createTextNode("Hit!");
    hitButton.appendChild(hitText);
    document.body.appendChild(hitButton);
    hitButton.setAttribute("id", "hitter");
    hitButton.onclick = hit;
    
    stayButton = document.createElement("BUTTON");
    var stayText = document.createTextNode("Stay!");
    stayButton.appendChild(stayText);
    document.body.appendChild(stayButton);
    stayButton.setAttribute("id", "stayer");
    stayButton.onclick = stay;
}
//......................................................................................................

// Draw card for player
function hit()
{
    draw();
    
    while (myChecker = false)
        {
            checkMyDeck();
        }
    
    var card = 
        {
            suit: (suits[randomSuit]),
            rank: (ranks[randomRank])
        };
    imageAdder();
    myHand.push(card);
    deck.push(card);
    getMyValue();
    updateCount();
    checkUserBust();
    
}

// Hit function for the dealer
function dealerHit()
{
    draw();
    
    while (dealerChecker = false)
        {
            checkDealerDeck();
        }
    
    var card = 
        {
            suit: (suits[randomSuit]),
            rank: (ranks[randomRank])
        };
    
    dealerHand.push(card);
    deck.push(card);
    getDealerValue();
    updateCount();
    checkDealerBust();
}
//...................................................................................................

//...................................................................................................

// Ends player's turn
function stay()
{
    document.getElementById("hitter").style.display="none";
    document.getElementById("stayer").style.display="none";
    
    if (dealerCount >= 17)
        {
            reveal();
        }
    else
        {
            dealerTurn();
        }
}
//....................................................................................................

// Checks if the user has busted or not
function checkUserBust()
{
    if (myCount > 21)
        {
            document.body.innerHTML = "";
            var spanSign = document.createElement("span");
            var loserSign = document.createTextNode("YOU BUSTED!");
            spanSign.appendChild(loserSign);
            spanSign.setAttribute("id","loser");
            document.body.appendChild(spanSign);
        }
    else
        {
            return;    
        }
}
//....................................................................................................

// Checks if the dealer has busted or not
function checkDealerBust()
{
    if (dealerCount > 21)
        {
            document.body.innerHTML = "";
            var spanSign = document.createElement("span");
            var loserSign = document.createTextNode("YOU WON, DEALER BUSTED!");
            spanSign.appendChild(loserSign);
            spanSign.setAttribute("id", "loser");
            document.body.appendChild(spanSign);
        }
    else
        {
            return;
        }
}
//....................................................................................................

// Updates the scores on the webpage
function updateCount()
{
    document.getElementById("lul").innerHTML = "Player count is: " + myCount;
    document.getElementById("lol").innerHTML = "Dealer count is: " + dealerCount;
}
//.....................................................................................................

// Runs a function for the most common dealer hit/stay strategy
function dealerTurn()
{
    while (dealerCount < 17)
        {
            dealerHit();
        }
    reveal();
}
//......................................................................................................

// Final showdown between dealer and player after all cards have been drawn
function reveal()
{
    var winner = false;
    
    if (dealerCount > myCount)
        {
            document.body.innerHTML = "";
            var spanSign = document.createElement("span");
            var loserSign = document.createTextNode("YOU LOST!");
            spanSign.appendChild(loserSign);
            spanSign.setAttribute("id", "loser");
            document.body.appendChild(spanSign);
        }
    else
        {
            document.body.innerHTML = "";
            var spanSign = document.createElement("span");
            var loserSign = document.createTextNode("YOU WON!");
            spanSign.appendChild(loserSign);
            spanSign.setAttribute("id", "loser");
            document.body.appendChild(spanSign);
        }
}
//......................................................................................................

// Adds the images of the cards to the webpage
function imageAdder()
{
    var cardImage = document.createElement("IMG");
    if (randomSuit == "Diamonds")
        {
            if (randomRank == "2")
                {
                    cardImage.src = "images/cards/2d.png";
                }
            else if (randomRank == "3")
                {
                    cardImage.src = "images/cards/3d.png";
                }
            else if (randomRank == "4")
                {
                    cardImage.src = "images/cards/4d.png";
                }
            else if (randomRank == "5")
                {
                    cardImage.src = "images/cards/5d.png";
                }
            else if (randomRank == "6")
                {
                    cardImage.src = "images/cards/6d.png";
                }
            else if (randomRank == "7")
                {
                    cardImage.src = "images/cards/7d.png";
                }
            else if (randomRank == "8")
                {
                    cardImage.src = "images/cards/8d.png";
                }
            else if (randomRank == "9")
                {
                    cardImage.src = "images/cards/9d.png";
                }
            else if (randomRank == "10")
                {
                    cardImage.src = "images/cards/10d.png";
                }
            else if (randomRank == "Ace")
                {
                    cardImage.src = "images/cards/ad.png";
                }  
        }
    else if (randomSuit == "Hearts")
        {
            if (randomRank == "2")
                {
                    cardImage.src = "images/cards/2h.png";
                }
            else if (randomRank == "3")
                {
                    cardImage.src = "images/cards/3h.png";
                }
            else if (randomRank == "4")
                {
                    cardImage.src = "images/cards/4h.png";
                }
            else if (randomRank == "5")
                {
                    cardImage.src = "images/cards/5h.png";
                }
            else if (randomRank == "6")
                {
                    cardImage.src = "images/cards/6h.png";
                }
            else if (randomRank == "7")
                {
                    cardImage.src = "images/cards/7h.png";
                }
            else if (randomRank == "8")
                {
                    cardImage.src = "images/cards/8h.png";
                }
            else if (randomRank == "9")
                {
                    cardImage.src = "images/cards/9h.png";
                }
            else if (randomRank == "10")
                {
                    cardImage.src = "images/cards/10h.png";
                }
            else if (randomRank == "Ace")
                {
                    cardImage.src = "images/cards/ah.png";
                }   
        }
    else if (randomSuit == "Clubs")
        {
            if (randomRank == "2")
                {
                    cardImage.src = "images/cards/2c.png";
                }
            else if (randomRank == "3")
                {
                    cardImage.src = "images/cards/3c.png";
                }
            else if (randomRank == "4")
                {
                    cardImage.src = "images/cards/4c.png";
                }
            else if (randomRank == "5")
                {
                    cardImage.src = "images/cards/5c.png";
                }
            else if (randomRank == "6")
                {
                    cardImage.src = "images/cards/6c.png";
                }
            else if (randomRank == "7")
                {
                    cardImage.src = "images/cards/7c.png";
                }
            else if (randomRank == "8")
                {
                    cardImage.src = "images/cards/8c.png";
                }
            else if (randomRank == "9")
                {
                    cardImage.src = "images/cards/9c.png";
                }
            else if (randomRank == "10")
                {
                    cardImage.src = "images/cards/10c.png";
                }
            else if (randomRank == "Ace")
                {
                    cardImage.src = "images/cards/ac.png";
                }  
        }
    else if (randomSuit == "Spades")
        {
            if (randomRank == "2")
                {
                    cardImage.src = "images/cards/2s.png";
                }
            else if (randomRank == "3")
                {
                    cardImage.src = "images/cards/3s.png";
                }
            else if (randomRank == "4")
                {
                    cardImage.src = "images/cards/4s.png";
                }
            else if (randomRank == "5")
                {
                    cardImage.src = "images/cards/5s.png";
                }
            else if (randomRank == "6")
                {
                    cardImage.src = "images/cards/6s.png";
                }
            else if (randomRank == "7")
                {
                    cardImage.src = "images/cards/7s.png";
                }
            else if (randomRank == "8")
                {
                    cardImage.src = "images/cards/8s.png";
                }
            else if (randomRank == "9")
                {
                    cardImage.src = "images/cards/9s.png";
                }
            else if (randomRank == "10")
                {
                    cardImage.src = "images/cards/10s.png";
                }
            else if (randomRank == "Ace")
                {
                    cardImage.src = "images/cards/as.png";
                }  
        }
    cardImage.height = "200";
    cardImage.width = "100";
    document.getElementById("pictures").appendChild(cardImage);
}
//...........................................................................................................



