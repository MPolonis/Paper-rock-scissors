'use strict';
var output = document.getElementById('output');
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');
var buttonNewGame = document.getElementById('ng');
var roundsToWin;
var playerPoints = 0;
var compPoints = 0;
var round = 0;
var gameDone;
var userChoice;
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
    playerPoints++;
    return 'You won!';
  } else {
    compPoints++;
    return'You lost!'; 
     }
}

// New Game
var games = function(){
  document.getElementById('round').innerHTML = round;
};

var scores = function(){
  document.getElementById('playerPoints').innerHTML = 'Player: ' + playerPoints;
  document.getElementById('compPoints').innerHTML = 'Computer: ' + compPoints; 
  document.getElementById('round').innerHTML = round;
};

// Reset a game
var resetGame = function(){
    playerPoints = 0;
    compPoints = 0;
    round = 0;
    document.getElementById('playerPoints').innerHTML = 'Player: ' +        playerPoints;
    document.getElementById('compPoints').innerHTML = 'Computer: ' + compPoints; 
    document.getElementById('round').innerHTML = round;
    document.getElementById('paper').disabled = false;
    document.getElementById('rock').disabled = false;
    document.getElementById('scissors').disabled = false;
    output.innerHTML = "Let's start!"; 
  }
// main function
var wholeGame = function(userChoice){
  round++;
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
  if ((roundsToWin === playerPoints) || (roundsToWin === compPoints)){
    gameDone = true;
    buttonsBlock();
  } else {
    gameDone = false;
  }
 };

var finisher = function(){
  if ((gameDone == true) && (roundsToWin === playerPoints)){
    output.innerHTML = 'You won the entire game! Congrats! ' + '<br><br>' + 'Now, please press the "New Game" button to play again! ';
  } else if ((gameDone == true) && (roundsToWin === compPoints)){
    output.innerHTML = 'You lost the entire game!' + '<br><br>' + 'Now, please press the "New Game" button to play again! ';
  }
}

// buttons
buttonPaper.addEventListener('click', function(){
  var userChoice = 'paper';
  wholeGame(userChoice);
})

buttonRock.addEventListener('click', function(){
  var userChoice = 'rock';
  wholeGame(userChoice);
})

buttonScissors.addEventListener('click', function(){
  var userChoice = 'scissors';
  wholeGame(userChoice);
});

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