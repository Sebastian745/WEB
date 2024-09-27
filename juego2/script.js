const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const imageX = 'img/manzana.png';
const imageO = 'img/pera.png';

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

let scoreX = 0;
let scoreO = 0;
let draws = 0;

const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const drawsElement = document.getElementById('draws');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive) return;

        board[index] = currentPlayer;

        // Eliminar cualquier texto previo en la celda antes de insertar la imagen
        cell.innerHTML = '';  // Vacía la celda para que no se superpongan textos

        // Insertar la imagen correspondiente en la celda
        const img = document.createElement('img');
        img.src = currentPlayer === 'X' ? imageX : imageO;
        cell.appendChild(img);

        checkWinner();
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    });
});

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === 'X') {
            document.body.style.backgroundColor = 'red'; // Color de fondo si gana el Jugador 1
            alert('¡El jugador 1 ha ganado!');
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            document.body.style.backgroundColor = 'green'; // Color de fondo si gana el Jugador 2
            alert('¡El jugador 2 ha ganado!');
            scoreO++;
            scoreOElement.textContent = scoreO;
        }
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        document.body.style.backgroundColor = 'white'; // Color de fondo si es un empate
        alert('¡Es un empate!');
        gameActive = false;
        draws++;
        drawsElement.textContent = draws;
    }
}

restartButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    
    // Limpiar el contenido de las celdas
    cells.forEach(cell => cell.innerHTML = ''); // Asegúrate de que se eliminen las imágenes
    document.body.style.backgroundColor = 'white'; // Resetea el color de fondo al reiniciar
});