//First player name and moveset
let firstPlayerName = "First Player";
let firstPlayerGame = [];

//Second player name and moveset
let secondPlayerName = "Second Player";
let secondPlayerGame = [];

//Name grabbed from input field
let enteredPlayerName;

let playerNumberDisplay; //Either "Player X" or "Player O" which shows in the cards
let playerNameDisplay; //Name for player which shows in their respective cards

//Grab edition buttons for both players, to then grab corresponding paragraphs
const editFirstName = document.getElementById("first-player-edit-button");
const editSecondName = document.getElementById("second-player-edit-button");

//Grab overlay and overlay buttons
const nameChangeOverlay = document.getElementById("name-change-overlay");

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

editFirstName.addEventListener("click", openNameChangeOverlay);
editSecondName.addEventListener("click", openNameChangeOverlay);    
