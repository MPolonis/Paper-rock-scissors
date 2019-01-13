'use strict';
var output = document.getElementById('output');
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');
var buttonNewGame = document.getElementById('ng');
var roundsToWin;
var gameDone;
var userChoice;
var rounds;
var params = {
  playerPoints: 0,
  compPoints: 0,
  round: 0,
};
// LOOP
var playerMove = document.querySelectorAll('.player-move');

for (var i = 0; i < playerMove.length; i++) {
  var userChoice = playerMove[i].getAttribute('data-move');
  playerMove[i].addEventListener('click', function () {
    
    wholeGame(userChoice);
  });

}
// Computer choice
var pcNumber = function(){
  return Math.floor(Math.random()*3+1);
};
var pcMove = function(pcNumber){ 
  if (pcNumber == 1) {
    return 'paper'
  } else if (pcNumber == 2) {
    return 'rock'
  } else {
    return 'scissors'
  }
};
// buttons block
var buttonsBlock = function(){
  document.getElementById('paper').disabled = true;
  document.getElementById('rock').disabled = true;
  document.getElementById('scissors').disabled = true;
};

// block buttons and greetings before start
(function(){
  buttonsBlock();
  output.innerHTML = 'Hi there!' + '<br><br>' + 'If you want to play, please press the "New Game" button.' + '<br><br>' + 'Good Luck!'
})();

// Comparison
var compare = function(userChoice, compChoice) {
  if (userChoice === compChoice) {
    return 'Tie!'; 
  } else if (
    (userChoice == 'rock') && (compChoice == 'scissors') || 
    (userChoice == 'paper') && (compChoice == 'rock') || 
    (userChoice == 'scissors') && (compChoice == 'paper')) {
    params.playerPoints++;
    return 'You won!';
  } else {
    params.compPoints++;
    return'You lost!'; 
     }
}

// New Game
var games = function(){
  document.getElementById('round').innerHTML = round;
};

var scores = function(){
  document.getElementById('playerPoints').innerHTML = 'Player: ' + params.playerPoints;
  document.getElementById('compPoints').innerHTML = 'Computer: ' + params.compPoints; 
  document.getElementById('round').innerHTML = params.round;
};

// Reset a game
var resetGame = function(){
    params.playerPoints = 0;
    params.compPoints = 0;
    params.round = 0;
    document.getElementById('playerPoints').innerHTML = 'Player: ' + params.playerPoints;
    document.getElementById('compPoints').innerHTML = 'Computer: ' + params.compPoints; 
    document.getElementById('round').innerHTML = params.round;
    document.getElementById('paper').disabled = false;
    document.getElementById('rock').disabled = false;
    document.getElementById('scissors').disabled = false;
    output.innerHTML = "Let's start!"; 
  }
// main function
var wholeGame = function(userChoice){
  params.round++;
  var compMove = pcNumber();
  var compChoice = pcMove(compMove);
  var result = compare(userChoice, compChoice);
  output.innerHTML = result + ' You played: ' + userChoice + '. Computer played: ' + compChoice + '.' + '<br>';
  scores();
  check();
  finisher();
}

// functions (check and finisher) needed to finish the game
var check = function(){
  if ((roundsToWin === params.playerPoints) || (roundsToWin === params.compPoints)){
    gameDone = true;
    buttonsBlock();
  } else {
    gameDone = false;
  }
 };

var finisher = function(){
  if ((gameDone == true) && (roundsToWin === params.playerPoints)){
    showModal();
    output.innerHTML = 'You won the entire game! Congrats! ' + '<br><br>' + 'Now, please press the "New Game" button to play again! ';
  } else if ((gameDone == true) && (roundsToWin === params.compPoints)){
    showModal();
    output.innerHTML = 'You lost the entire game!' + '<br><br>' + 'Now, please press the "New Game" button to play again! ';
  }
}

buttonNewGame.addEventListener('click', function(){
  rounds = window.prompt('Please specify the number of rounds needed to win');
  if ((rounds == '') || (rounds <= null) || (isNaN(rounds))){
    output.innerHTML = 'Please specify the number of rounds needed to win'; 
   } else {
    roundsToWin = parseInt(rounds);
    games(roundsToWin);
    document.getElementById('noOfGames').innerHTML = rounds;
    resetGame();
    return roundsToWin;
 }
})

// MODAl
var modals = document.querySelectorAll('.modal');

var showModal = function (event) {
  //event.preventDefault();
  for (var i = 0; i < modals.length; i++) {
    modals[i].classList.remove('show');
  }
  document.querySelector('#modal-results').classList.add('show');
  document.querySelector('#modal-overlay').classList.add('show');
};

var modalLinks = document.querySelectorAll('.show-modal');

for (var i = 0; i < modalLinks.length; i++) {
  modalLinks[i].addEventListener('click', showModal);
}

var hideModal = function (event) {
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);



for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener('click', function (event) {
    event.stopPropagation();
  });
}
