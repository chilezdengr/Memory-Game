/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//  I realised that writing multiple 'let' statement would be redundant so I decided to clean up a bit
const deck = document.querySelector('.deck');
let toggledCards, moves, clockOff, time, clockId, matched;
 toggledCards = [];
 moves = 0;
 clockOff = true;
 time = 0;
 matched = 0;
 clockId;
 

//  Variables to test the Modal
/*
time = 121;
 displayTime();
 moves = 16;
 checkScore();
 toggleModal();
*/
// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
 deck.addEventListener('click', function(event){
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)) {
        if(clockOff) {
            startClock();
            clockOff = false;
        }
        toggleCard(clickTarget);
        addToggledCard(clickTarget);
        if (toggledCards.length === 2) {
            checkForMatch(clickTarget);
            addMove();
            checkScore();
        }
        const totalPairs = 8;
        if(matched === totalPairs){
            gameOver();
        }
    }
 });

//  FUNCTION TO TOGGLE CARD TO MAKE CODE CLEANER
function toggleCard(card){
    card.classList.toggle('open');
    card.classList.toggle('show');
 }


 
 // function to add open cards to the array list toggledCards
 function addToggledCard(clickTarget) {
     toggledCards.push(clickTarget);
    //  console.log(toggledCards);
     
 }

//  Function to check for match
function checkForMatch() {
    if (toggledCards[0].firstElementChild.className === 
        toggledCards[1].firstElementChild.className) {
            toggledCards[0].classList.toggle('match');
            toggledCards[1].classList.toggle('match');
            toggledCards = [];  
            matched++;    
        } else {
            setTimeout(() => {
                toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];// resets the toggledcards array
            }, 980);
        
        }
}


function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li')) ;
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }    
}
shuffleDeck();

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

function checkScore() {
    if (moves === 14 || moves === 26) {
        hideStar();
    }
}

function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for(star of starList) {
        if(star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}
// hideStar();
// hideStar();

function startClock() {
     clockId = setInterval(() => {
        time++;
        displayTime();
        // console.log(time);       
    }, 1000);
}

function displayTime() {
    const mins = Math.floor(time/60);
    const secs = time%60;
    const clock = document.querySelector('.clock');
    // console.log(clock);
    clock.innerHTML = time;
    if (secs < 10) {
        clock.innerHTML = `${mins}:0${secs}`;
    } else {
        clock.innerHTML = `${mins}:${secs}`;
    }
    
}

function stopClock() {
    clearInterval(clockId);
}
   
// Modal Functions

function toggleModal() {
    const modal = document.querySelector('.modal_main');
    modal.classList.toggle('hide');
}

// toggleModal(); //this call opens the modal
// toggleModal(); // this call agaun closes the modal

function writeModalStats(){
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if(star.style.display !== "none") {
            starCount++;
        }
    }
    console.log(starCount);
    return starCount;
    
}

document.querySelector('.modal_cancel').addEventListener('click',toggleModal);

document.querySelector('.modal_replay').addEventListener('click', replayGame);
document.querySelector('.restart').addEventListener('click', resetGame);


function resetGame() {
    resetClockTime();
    resetMoves();
    resetStars();
    shuffleDeck();
    resetDeck();
    toggledCards = [];
    matched = 0;
}

function replayGame() {
    resetGame();
    toggleModal();
    
}

function resetClockTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
}

function resetDeck() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}






