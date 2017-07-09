// SET UP ALL THE VARIABLES, ARRAYS, ETC ..........................
var suits = ["Diamonds","Hearts","Spades","Clubs"];
var ranks = ["Ace","2","3","4","5","6","7","8","9","10","Queen","King","Jack"];
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
            imageAdder();
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
    else if (ranks[randomRank] == "Queen")
        {
            myCount = myCount + 10;
        }
    else if (ranks[randomRank] == "Jack")
        {
            myCount = myCount + 10;
        }
    else if (ranks[randomRank] == "King")
        {
            myCount = myCount + 10;
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
    else if (ranks[randomRank] == "Queen")
        {
            dealerCount = dealerCount + 10;
        }
    else if (ranks[randomRank] == "Jack")
        {
            dealerCount = dealerCount + 10;
        }
    else if (ranks[randomRank] == "King")
        {
            dealerCount = dealerCount + 10;
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
            dealerImageAdder();
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
            dealerImageAdder();
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
    if (dealerCount < 22)
        {
            reveal();
        }
}
//......................................................................................................

// Final showdown between dealer and player after all cards have been drawn
function reveal()
{
    dealerImageAdder();
    var winner = false;
    
    if (dealerCount > myCount)
        {
            var spanSign = document.createElement("span");
            var loserSign = document.createTextNode("YOU LOST!");
            spanSign.appendChild(loserSign);
            spanSign.setAttribute("id", "loser");
            document.body.appendChild(spanSign);
        }
    else if (dealerCount == myCount)
        {
            if (dealerHand.length > myHand.length)
                {
                    var spanSign = document.createElement("span");
                    var loserSign = document.createTextNode("YOU WON!");
                    spanSign.appendChild(loserSign);
                    spanSign.setAttribute("id", "loser");
                    document.body.appendChild(spanSign);    
                }
            else if (dealerHand.length < myHand.length)
                {
                    var spanSign = document.createElement("span");
                    var loserSign = document.createTextNode("YOU LOST!");
                    spanSign.appendChild(loserSign);
                    spanSign.setAttribute("id", "loser");
                    document.body.appendChild(spanSign); 
                }
            else 
                {
                    var spanSign = document.createElement("span");
                    var loserSign = document.createTextNode("DRAW!");
                    spanSign.appendChild(loserSign);
                    spanSign.setAttribute("id", "loser");
                    document.body.appendChild(spanSign);
                }
        }
    else
    
        {
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
    cardImage.height = "200";
    cardImage.width = "100";
    
    if (suits[randomSuit] == "Diamonds")
        {
            if (ranks[randomRank] == "2")
                {
                    cardImage.src = "images/cards/2d.png";
                }
            else if (ranks[randomRank] == "3")
                {
                    cardImage.src = "images/cards/3d.png";
                }
            else if (ranks[randomRank] == "4")
                {
                    cardImage.src = "images/cards/4d.png";
                }
            else if (ranks[randomRank] == "5")
                {
                    cardImage.src = "images/cards/5d.png";
                }
            else if (ranks[randomRank] == "6")
                {
                    cardImage.src = "images/cards/6d.png";
                }
            else if (ranks[randomRank] == "7")
                {
                    cardImage.src = "images/cards/7d.png";
                }
            else if (ranks[randomRank] == "8")
                {
                    cardImage.src = "images/cards/8d.png";
                }
            else if (ranks[randomRank] == "9")
                {
                    cardImage.src = "images/cards/9d.png";
                }
            else if (ranks[randomRank] == "10")
                {
                    cardImage.src = "images/cards/10d.png";
                }
            else if (ranks[randomRank] == "Ace")
                {
                    cardImage.src = "images/cards/ad.png";
                }  
            else if (ranks[randomRank] == "Queen")
                {
                    cardImage.src = "images/cards/qd.png";
                }
            else if (ranks[randomRank] == "Jack")
                {
                    cardImage.src = "images/cards/jd.png";
                }
            else if (ranks[randomRank] == "King")
                {
                    cardImage.src = "images/cards/kd.png";
                }
        }
    else if (suits[randomSuit] == "Hearts")
        {
            if (ranks[randomRank] == "2")
                {
                    cardImage.src = "images/cards/2h.png";
                }
            else if (ranks[randomRank] == "3")
                {
                    cardImage.src = "images/cards/3h.png";
                }
            else if (ranks[randomRank] == "4")
                {
                    cardImage.src = "images/cards/4h.png";
                }
            else if (ranks[randomRank] == "5")
                {
                    cardImage.src = "images/cards/5h.png";
                }
            else if (ranks[randomRank] == "6")
                {
                    cardImage.src = "images/cards/6h.png";
                }
            else if (ranks[randomRank] == "7")
                {
                    cardImage.src = "images/cards/7h.png";
                }
            else if (ranks[randomRank] == "8")
                {
                    cardImage.src = "images/cards/8h.png";
                }
            else if (ranks[randomRank] == "9")
                {
                    cardImage.src = "images/cards/9h.png";
                }
            else if (ranks[randomRank] == "10")
                {
                    cardImage.src = "images/cards/10h.png";
                }
            else if (ranks[randomRank] == "Ace")
                {
                    cardImage.src = "images/cards/ah.png";
                }   
            else if (ranks[randomRank] == "Queen")
                {
                    cardImage.src = "images/cards/qh.png";
                }
            else if (ranks[randomRank] == "Jack")
                {
                    cardImage.src = "images/cards/jh.png";
                }
            else if (ranks[randomRank] == "King")
                {
                    cardImage.src = "images/cards/kh.png";
                }
        }
    else if (suits[randomSuit] == "Clubs")
        {
            if (ranks[randomRank] == "2")
                {
                    cardImage.src = "images/cards/2c.png";
                }
            else if (ranks[randomRank] == "3")
                {
                    cardImage.src = "images/cards/3c.png";
                }
            else if (ranks[randomRank] == "4")
                {
                    cardImage.src = "images/cards/4c.png";
                }
            else if (ranks[randomRank] == "5")
                {
                    cardImage.src = "images/cards/5c.png";
                }
            else if (ranks[randomRank] == "6")
                {
                    cardImage.src = "images/cards/6c.png";
                }
            else if (ranks[randomRank] == "7")
                {
                    cardImage.src = "images/cards/7c.png";
                }
            else if (ranks[randomRank] == "8")
                {
                    cardImage.src = "images/cards/8c.png";
                }
            else if (ranks[randomRank] == "9")
                {
                    cardImage.src = "images/cards/9c.png";
                }
            else if (ranks[randomRank] == "10")
                {
                    cardImage.src = "images/cards/10c.png";
                }
            else if (ranks[randomRank] == "Ace")
                {
                    cardImage.src = "images/cards/ac.png";
                }  
            else if (ranks[randomRank] == "Queen")
                {
                    cardImage.src = "images/cards/qc.png";
                }
            else if (ranks[randomRank] == "Jack")
                {
                    cardImage.src = "images/cards/jc.png";
                }
            else if (ranks[randomRank] == "King")
                {
                    cardImage.src = "images/cards/kc.png";
                }
        }
    else if (suits[randomSuit] == "Spades")
        {
            if (ranks[randomRank] == "2")
                {
                    cardImage.src = "images/cards/2s.png";
                }
            else if (ranks[randomRank] == "3")
                {
                    cardImage.src = "images/cards/3s.png";
                }
            else if (ranks[randomRank] == "4")
                {
                    cardImage.src = "images/cards/4s.png";
                }
            else if (ranks[randomRank] == "5")
                {
                    cardImage.src = "images/cards/5s.png";
                }
            else if (ranks[randomRank] == "6")
                {
                    cardImage.src = "images/cards/6s.png";
                }
            else if (ranks[randomRank] == "7")
                {
                    cardImage.src = "images/cards/7s.png";
                }
            else if (ranks[randomRank] == "8")
                {
                    cardImage.src = "images/cards/8s.png";
                }
            else if (ranks[randomRank] == "9")
                {
                    cardImage.src = "images/cards/9s.png";
                }
            else if (ranks[randomRank] == "10")
                {
                    cardImage.src = "images/cards/10s.png";
                }
            else if (ranks[randomRank] == "Ace")
                {
                    cardImage.src = "images/cards/as.png";
                }  
            else if (ranks[randomRank] == "Queen")
                {
                    cardImage.src = "images/cards/qs.png";
                }
            else if (ranks[randomRank] == "Jack")
                {
                    cardImage.src = "images/cards/js.png";
                }
            else if (ranks[randomRank] == "King")
                {
                    cardImage.src = "images/cards/ks.png";
                }
        }
    document.getElementById("hander").style.display="block";
    document.getElementById("pictures").appendChild(cardImage);
    cardImage.style.marginRight = "10px";
}
//...........................................................................................................

// Same function as imageAdder, but for the dealer at the end of the game, as per common play
function dealerImageAdder()
{
    for (var i = 0; i < dealerHand.length; i++)
        {
            var cardImage = document.createElement("IMG");
            cardImage.height = "200";
            cardImage.width = "100";    
            
            if (dealerHand[i].suit == "Diamonds")
                {
                    if (dealerHand[i].rank == "2")
                        {
                            cardImage.src = "images/cards/2d.png";
                        }
                    else if (dealerHand[i].rank == "3")
                        {
                            cardImage.src = "images/cards/3d.png";
                        }
                    else if (dealerHand[i].rank == "4")
                        {
                            cardImage.src = "images/cards/4d.png";
                        }
                    else if (dealerHand[i].rank == "5")
                        {
                            cardImage.src = "images/cards/5d.png";
                        }
                    else if (dealerHand[i].rank == "6")
                        {
                            cardImage.src = "images/cards/6d.png";
                        }
                    else if (dealerHand[i].rank == "7")
                        {
                            cardImage.src = "images/cards/7d.png";
                        }
                    else if (dealerHand[i].rank == "8")
                        {
                            cardImage.src = "images/cards/8d.png";
                        }
                    else if (dealerHand[i].rank == "9")
                        {
                            cardImage.src = "images/cards/9d.png";
                        }
                    else if (dealerHand[i].rank == "10")
                        {
                            cardImage.src = "images/cards/10d.png";
                        }
                    else if (dealerHand[i].rank == "Ace")
                        {
                            cardImage.src = "images/cards/ad.png";
                        }  
                    else if (dealerHand[i].rank == "Queen")
                        {
                            cardImage.src = "images/cards/qd.png";
                        }
                    else if (dealerHand[i].rank == "Jack")
                        {
                            cardImage.src = "images/cards/jd.png";
                        }
                    else if (dealerHand[i].rank == "King")
                        {
                            cardImage.src = "images/cards/kd.png";
                        }
                }
            else if (dealerHand[i].suit == "Hearts")
                {
                    if (dealerHand[i].rank == "2")
                        {
                            cardImage.src = "images/cards/2h.png";
                        }
                    else if (dealerHand[i].rank == "3")
                        {
                            cardImage.src = "images/cards/3h.png";
                        }
                    else if (dealerHand[i].rank == "4")
                        {
                            cardImage.src = "images/cards/4h.png";
                        }
                    else if (dealerHand[i].rank == "5")
                        {
                            cardImage.src = "images/cards/5h.png";
                        }
                    else if (dealerHand[i].rank == "6")
                        {
                            cardImage.src = "images/cards/6h.png";
                        }
                    else if (dealerHand[i].rank == "7")
                        {
                            cardImage.src = "images/cards/7h.png";
                        }
                    else if (dealerHand[i].rank == "8")
                        {
                            cardImage.src = "images/cards/8h.png";
                        }
                    else if (dealerHand[i].rank == "9")
                        {
                            cardImage.src = "images/cards/9h.png";
                        }
                    else if (dealerHand[i].rank == "10")
                        {
                            cardImage.src = "images/cards/10h.png";
                        }
                    else if (dealerHand[i].rank == "Ace")
                        {
                            cardImage.src = "images/cards/ah.png";
                        }   
                    else if (dealerHand[i].rank == "Queen")
                        {
                            cardImage.src = "images/cards/qh.png";
                        }
                    else if (dealerHand[i].rank == "Jack")
                        {
                            cardImage.src = "images/cards/jh.png";
                        }
                    else if (dealerHand[i].rank == "King")
                        {
                            cardImage.src = "images/cards/kh.png";
                        }
                }
            else if (dealerHand[i].suit == "Clubs")
                {
                    if (dealerHand[i].rank == "2")
                        {
                            cardImage.src = "images/cards/2c.png";
                        }
                    else if (dealerHand[i].rank == "3")
                        {
                            cardImage.src = "images/cards/3c.png";
                        }
                    else if (dealerHand[i].rank == "4")
                        {
                            cardImage.src = "images/cards/4c.png";
                        }
                    else if (dealerHand[i].rank == "5")
                        {
                            cardImage.src = "images/cards/5c.png";
                        }
                    else if (dealerHand[i].rank == "6")
                        {
                            cardImage.src = "images/cards/6c.png";
                        }
                    else if (dealerHand[i].rank == "7")
                        {
                            cardImage.src = "images/cards/7c.png";
                        }
                    else if (dealerHand[i].rank == "8")
                        {
                            cardImage.src = "images/cards/8c.png";
                        }
                    else if (dealerHand[i].rank == "9")
                        {
                            cardImage.src = "images/cards/9c.png";
                        }
                    else if (dealerHand[i].rank == "10")
                        {
                            cardImage.src = "images/cards/10c.png";
                        }
                    else if (dealerHand[i].rank == "Ace")
                        {
                            cardImage.src = "images/cards/ac.png";
                        }  
                    else if (dealerHand[i].rank == "Queen")
                        {
                            cardImage.src = "images/cards/qc.png";
                        }
                    else if (dealerHand[i].rank == "Jack")
                        {
                            cardImage.src = "images/cards/jc.png";
                        }
                    else if (dealerHand[i].rank == "King")
                        {
                            cardImage.src = "images/cards/kc.png";
                        }
                }
            else if (dealerHand[i].suit == "Spades")
                {
                    if (dealerHand[i].rank == "2")
                        {
                            cardImage.src = "images/cards/2s.png";
                        }
                    else if (dealerHand[i].rank == "3")
                        {
                            cardImage.src = "images/cards/3s.png";
                        }
                    else if (dealerHand[i].rank == "4")
                        {
                            cardImage.src = "images/cards/4s.png";
                        }
                    else if (dealerHand[i].rank == "5")
                        {
                            cardImage.src = "images/cards/5s.png";
                        }
                    else if (dealerHand[i].rank == "6")
                        {
                            cardImage.src = "images/cards/6s.png";
                        }
                    else if (dealerHand[i].rank == "7")
                        {
                            cardImage.src = "images/cards/7s.png";
                        }
                    else if (dealerHand[i].rank == "8")
                        {
                            cardImage.src = "images/cards/8s.png";
                        }
                    else if (dealerHand[i].rank == "9")
                        {
                            cardImage.src = "images/cards/9s.png";
                        }
                    else if (dealerHand[i].rank == "10")
                        {
                            cardImage.src = "images/cards/10s.png";
                        }
                    else if (dealerHand[i].rank == "Ace")
                        {
                            cardImage.src = "images/cards/as.png";
                        }  
                    else if (dealerHand[i].rank == "Queen")
                        {
                            cardImage.src = "images/cards/qs.png";
                        }
                    else if (dealerHand[i].rank == "Jack")
                        {
                            cardImage.src = "images/cards/js.png";
                        }
                    else if (dealerHand[i].rank == "King")
                        {
                            cardImage.src = "images/cards/ks.png";
                        }
                }
            document.getElementById("dealerHander").style.display = "block";
            document.getElementById("dealerPictures").appendChild(cardImage);
            cardImage.style.marginRight = "10px";
        }
}



