const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Draw!`;
const currentPlayerTurn = () => `${currentPlayer}'s Turn`;
var clicksound1 = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3')
var clicksound2 = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/click.mp3')    
var icon = new Image('icon.jpg')
var icon2 = new Image('icon2.jpg')
statusDisplay.innerHTML = currentPlayerTurn();
var victory = new Audio('victory.mp3')
var draw = new Audio('draw.mp3')
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if(roundWon) {
        victory.play();
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if(roundDraw) {
        draw.play();
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    clicksound2.play();
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {

    
    gameActive = true;
    clicksound1.play();
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");


}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

var audio = document.getElementById('audio');
var playPauseBTN = document.getElementById('playPauseBTN');
var count = 0;

function playPause(){
	if(count == 0){
		count = 1;
		audio.play();
        onclick=icon.play();
        
	}else{
		count = 0;
		audio.pause();
        onclick=icon2.play();
	}

}

