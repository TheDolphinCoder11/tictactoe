const board = document.getElementById('board');
const status = document.getElementById('status');
const winMessage = document.getElementById('winMessage');
const playerXScoreElement = document.getElementById('playerXScore');
const playerOScoreElement = document.getElementById('playerOScore');
const scoresElement = document.getElementById('scores');
let currentPlayer = '❌';
let gameBoard = Array(9).fill('');
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
        updateStatus();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === '❌' ? '🅾️' : '❌';
}

function updateStatus() {
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            status.textContent = `Player ${currentPlayer} wins!`;
            winMessage.textContent = `Player ${currentPlayer} wins!`;

            showWinAlert(currentPlayer);
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        status.textContent = 'It\'s a draw!';
        winMessage.textContent = 'It\'s a draw!';

        setTimeout(() => {
            alert('It\'s a draw!');
        }, 100);
    }
}

function resetGame() {
    gameBoard = Array(9).fill('');
    gameActive = true;
    currentPlayer = '❌';
    status.textContent = 'Player ❌\'s turn';
    winMessage.textContent = '';
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

function updateScores() {
    playerXScoreElement.textContent = `Player ❌: ${playerXScore}`;
    playerOScoreElement.textContent = `Player 🅾️: ${playerOScore}`;
}

function showWinAlert(player) {
    setTimeout(() => {
        alert(`Player ${player} wins!`);
        if (player === '❌') {
            playerXScore++;
        } else {
            playerOScore++;
        }
        updateScores();
    }, 100);
}

function ChangeColor() {
    var change = document.getElementById("meBaby");

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomGradient() {
        return 'linear-gradient(' + (Math.random() * 360) + 'deg, ' + getRandomColor() + ' 0%, ' + getRandomColor() + ' 100%)';
    }

    function changeColor() {
        change.style.background = getRandomGradient();
    }

    changeColor();
    setInterval(changeColor, 1000);
}

createBoard();
updateStatus();
updateScores();
