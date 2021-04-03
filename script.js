'use strict';

//DOM references
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');  //div player 0
const player1El = document.querySelector('.player--1');  //div player 1

//variables
let currentScore, activePlayer, scores, gameOn;

//functions
const switchplayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const init = function() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  gameOn = true;

  gameOn = true;
  scores = [0, 0];
  currentScore = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  activePlayer = 0;
}
// Init and hide dice when entering the game
init();
diceEl.classList.add('hidden');

//Set scores
score0El.textContent = 0;
score1El.textContent = 0;

// Rolling feature
rollDiceButton.addEventListener('click', function(){
  if (gameOn) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchplayer();
    }
  }
});
// Holding score
holdButton.addEventListener('click', function(){
  if (gameOn) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  }
  if (scores[activePlayer] >= 10) {
    gameOn = false;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    diceEl.classList.add('hidden');
  } else switchplayer();
});

newGameButton.addEventListener('click', init);
