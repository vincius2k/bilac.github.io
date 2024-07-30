document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const messageElement = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    const winnerMessageElement = document.getElementById('winnerMessage');
    const winnerTextElement = document.getElementById('winnerText');
    let board = Array(9).fill(null);
    let gameActive = true;
    const humanPlayer = 'X';
    const computerPlayer = 'O';

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(e) {
        const index = e.target.getAttribute('data-index');

        if (board[index] || !gameActive) {
            return;
        }

        board[index] = humanPlayer;
        e.target.textContent = humanPlayer;

        if (checkWinner(humanPlayer)) {
            displayWinner(humanPlayer, winningCombinations.find(combination => combination.every(i => board[i] === humanPlayer)));
            gameActive = false;
            return;
        }

        if (board.every(cell => cell)) {
            messageElement.textContent = 'Empate!';
            gameActive = false;
            return;
        }

        computerMove();
    }

    function computerMove() {
        const availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);

        if (availableCells.length === 0) {
            return;
        }

        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = computerPlayer;
        cells[randomIndex].textContent = computerPlayer;

        if (checkWinner(computerPlayer)) {
            displayWinner(computerPlayer, winningCombinations.find(combination => combination.every(i => board[i] === computerPlayer)));
            gameActive = false;
            return;
        }

        if (board.every(cell => cell)) {
            messageElement.textContent = 'Empate!';
            gameActive = false;
            return;
        }
    }

    function checkWinner(player) {
        return winningCombinations.some(combination => combination.every(index => board[index] === player));
    }

    function displayWinner(player, winningCombination) {
        winnerTextElement.textContent = `${player} venceu!`;
        winnerMessageElement.style.display = 'block';
        setTimeout(() => {
            winnerMessageElement.style.display = 'none';
        }, 3000);

        winningCombination.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });
        gameActive = true;
        messageElement.textContent = '';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
