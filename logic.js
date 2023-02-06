console.dir(document.body);

let secondPlayerGame = [];
let winningGames;
let winnerName;
let enteredPlayerName;
let playerNumberDisplay; //Either "Player X" or "Player O" which shows in the cards
let playerNameDisplay; //Name for player which shows in their respective cards
let firstPlayerName = "First Player";
let firstPlayerGame = [];
let secondPlayerName = "Second Player";
const editFirstName = document.getElementById("first-player-edit-button");
const editSecondName = document.getElementById("second-player-edit-button");
const nameChangeOverlay = document.getElementById("name-change-overlay");
const nameChangeOverlayButton = document.querySelector(
  "#name-change-overlay button"
);
const startGameButton = document.getElementById("start-game");
const gameBoard = document.getElementById("gameplay");
const playerTurn = document.getElementById("player-turn");
const playerTurnName = document.querySelector("#player-turn span");
let turn = "playerX"; //Determines which player's turn it is, by default X
let squares; //Declaring squares as a global variable, which holds all 9 squares in the board

//Code for handling the name form
const gameForm = document.getElementById("name-form");
function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  enteredPlayerName = formData.get("playername");
  closeNameChangeOverlay();
}
gameForm.addEventListener("submit", savePlayerConfig);

function openNameChangeOverlay(event) {
  //Grab "Player O" or "Player X"
  playerNumberDisplay =
    event.target.previousElementSibling.previousElementSibling;
  //Grab player's current name
  playerNameDisplay = event.target.previousElementSibling;
  //Grab paragraph on overlay to display which player will change name
  const playerNameChangeHelper = document.querySelector(
    "#name-change-overlay label"
  );
  //Grab input field on overlay
  const playerNameChangeInputValue = document.querySelector(
    "#name-change-overlay input"
  );

  //Sets text to display correct player name to be changed
  if (playerNumberDisplay.textContent == "Player X") {
    playerNameChangeHelper.textContent = "Set Player X's name";
  } else {
    playerNameChangeHelper.textContent = "Set Player O's name";
  }
  console.dir(playerNameDisplay.textContent);
  playerNameChangeInputValue.value = playerNameDisplay.textContent;
  //Make name change overlay visible
  nameChangeOverlay.style.display = "flex";
}

function closeNameChangeOverlay() {
  playerNameDisplay.textContent = enteredPlayerName;
  if (playerNumberDisplay.textContent == "Player X") {
    firstPlayerName = enteredPlayerName;
  } else {
    secondPlayerName = enteredPlayerName;
  }
  //We save the name the user determined for a player and we save it on playerName
  /* let playerName = document.querySelector(".player-card p");
  playerName.textContent = enteredPlayerName; */
  nameChangeOverlay.style.display = "none";
}

function playerWon(playergame) {
  if (playergame.length < 3) {
    return false;
  } else {
    //We start comparing against all 8 possibilities
    let winner = false;
    //We select the array of winning games
    for (element of winningGames) {
      //We select the array with player's moves
      let matches = 0;
      for (squarePlayed of playergame) {
        //We compare every square used with every square that needs to be played in order to win
        for (square of element) {
          //If we find a correct square, we add 1 to our counter. We want to reach 3 for a winner
          if (squarePlayed == square.id) {
            matches++;
          }
          //We change background colour to highlight how one player won
          if (matches == 3)
            for (square of element) {
              square.style.backgroundColor = "var(--nandopurple)";
            }
        }
        if (matches == 3) {
          winner = true;
          break;
        }
      }
    }
    return winner;
  }
}

//For every square clicked we add the corresponding symbol to it, switch turns and check wether one player won or not
function modifySquare(event) {
  if (turn == firstPlayerName) {
    //Add a cross representing the first player
    event.target.innerHTML =
      "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'> <path stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12' /> </svg>";

    //Add square to the ones the player clicked
    firstPlayerGame.push(event.target.id);

    //Switch turn to second player, and display their name on screen
    turn = secondPlayerName;
    playerTurnName.textContent = secondPlayerName;

    //Check if playerX won
    if (playerWon(firstPlayerGame)) {
      playerTurnName.parentElement.parentElement.parentElement.innerHTML =
        "<p><strong><span></span></strong> wins! Fatality!</p>";
      winnerName = document.querySelector("#player-turn span");
      winnerName.textContent = firstPlayerName;
    }
  } else if (turn == secondPlayerName) {
    //Same as before but in case it's second player's turn
    event.target.innerHTML =
      "<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'> <path stroke-linecap='round' stroke-linejoin='round' d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>";
    secondPlayerGame.push(event.target.id);
    turn = firstPlayerName;
    playerTurnName.textContent = firstPlayerName;
    if (playerWon(secondPlayerGame)) {
      playerTurnName.parentElement.parentElement.parentElement.innerHTML =
        "<p><strong><span></span></strong> wins! Fatality!</p>";
      winnerName = document.querySelector("#player-turn span");
      winnerName.textContent = secondPlayerName;
    }
  }
  event.target.removeEventListener("click", modifySquare);
}

function buildGameBoard() {
  //We declare the layouts which, if played, determine a player has won
  winningGames = [
    //Match 3 columns
    [sq1, sq2, sq3],
    [sq4, sq5, sq6],
    [sq7, sq8, sq9],
    //Match 3 rows
    [sq1, sq4, sq7],
    [sq2, sq5, sq8],
    [sq3, sq6, sq9],
    //Diagonals
    [sq1, sq5, sq9],
    [sq3, sq5, sq7],
  ];

  //We grab all squares in the board and add an event listener to all
  squares = document.querySelectorAll(".boardsq");
  for (element of squares) {
    element.addEventListener("click", modifySquare);
  }
  //We set the turn to first player by displaying its name
  playerTurnName.textContent = firstPlayerName;
  turn = firstPlayerName;
}

function showGameBoard() {
  playerTurn.style.display = "flex";
  gameBoard.style.display = "flex";
  buildGameBoard();
}

editFirstName.addEventListener("click", openNameChangeOverlay);
editSecondName.addEventListener("click", openNameChangeOverlay);
/* nameChangeOverlayButton.addEventListener("click", closeNameChangeOverlay); */
startGameButton.addEventListener("click", showGameBoard);

/* 
We have a board with three columns and each column has 3 rows
We execute firstPlayerTurn,
Which adds an event listener to every square that has not been played
Played square means that its value is false


Board structure:

let board = [column, column, column];
let boardColumn {
  sq1: false,
  sq2: false,
  sq3: false,
};

*/
