const cell11 = document.getElementById('cell11');
const cell12 = document.getElementById('cell12');
const cell13 = document.getElementById('cell13');
const cell14 = document.getElementById('cell14');
const cell15 = document.getElementById('cell15');
const cell16 = document.getElementById('cell16');
const cell17 = document.getElementById('cell17');

const cell21 = document.getElementById('cell21');
const cell22 = document.getElementById('cell22');
const cell23 = document.getElementById('cell23');
const cell24 = document.getElementById('cell24');
const cell25 = document.getElementById('cell25');
const cell26 = document.getElementById('cell26');
const cell27 = document.getElementById('cell27');

const cell31 = document.getElementById('cell31');
const cell32 = document.getElementById('cell32');
const cell33 = document.getElementById('cell33');
const cell34 = document.getElementById('cell34');
const cell35 = document.getElementById('cell35');
const cell36 = document.getElementById('cell36');
const cell37 = document.getElementById('cell37');

const cell41 = document.getElementById('cell41');
const cell42 = document.getElementById('cell42');
const cell43 = document.getElementById('cell43');
const cell44 = document.getElementById('cell44');
const cell45 = document.getElementById('cell45');
const cell46 = document.getElementById('cell46');
const cell47 = document.getElementById('cell47');

const cell51 = document.getElementById('cell51');
const cell52 = document.getElementById('cell52');
const cell53 = document.getElementById('cell53');
const cell54 = document.getElementById('cell54');
const cell55 = document.getElementById('cell55');
const cell56 = document.getElementById('cell56');
const cell57 = document.getElementById('cell57');

const cell61 = document.getElementById('cell61');
const cell62 = document.getElementById('cell62');
const cell63 = document.getElementById('cell63');
const cell64 = document.getElementById('cell64');
const cell65 = document.getElementById('cell65');
const cell66 = document.getElementById('cell66');
const cell67 = document.getElementById('cell67');

const cells = [[cell11, cell12, cell13, cell14, cell15, cell16, cell17],
[cell21, cell22, cell23, cell24, cell25, cell26, cell27],
[cell31, cell32, cell33, cell34, cell35, cell36, cell37],
[cell41, cell42, cell43, cell44, cell45, cell46, cell47],
[cell51, cell52, cell53, cell54, cell55, cell56, cell57],
[cell61, cell62, cell63, cell64, cell65, cell66, cell67]];

const newGameEl = document.getElementById('new-game');
const winnerEl = document.getElementById('winner');
const scoreJoueurEl = document.getElementById("score-joueur");
const scoreOrdinateurEl = document.getElementById("score-ordinateur");

let scoreJoueur = 0;
let scoreOrdinateur = 0;

scoreJoueurEl.innerText = `Score : ${scoreJoueur}`;
scoreOrdinateurEl.innerText = `Score : ${scoreOrdinateur}`;

newGameEl.addEventListener('click', reset);

let grid = [['_', '_', '_', '_', '_', '_', '_'],
['_', '_', '_', '_', '_', '_', '_'],
['_', '_', '_', '_', '_', '_', '_'],
['_', '_', '_', '_', '_', '_', '_'],
['_', '_', '_', '_', '_', '_', '_'],
['_', '_', '_', '_', '_', '_', '_']];

let player = 'red';
let ia = 'yellow';

function play() {
    for (const row of cells) {
        for (const cell of row) {
            cell.addEventListener('click', () => {
                if (grid[0][cell.id[5] - 1] === '_' && checkWin() === null) {
                    let row = getCellPlayable(cell.id[5] - 1);
                    cells[row][cell.id[5] - 1].style.backgroundColor = 'red';
                    grid[row][cell.id[5] - 1] = 'red';
                    let winner = checkWin()
                    if (winner === null) {
                        IAv2();
                    }
                    else {
                        countScores(winner);
                    }
                }
            });
        }
    }
}


function reset() {
    for (const row of cells) {
        for (const cell of row) {
            cell.style.backgroundColor = 'white';
        }
    }
    grid = [['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_']];
}


function getCellPlayable(col) {
    for (let i = 5; i >= 0; i--) {
        if (grid[i][col] === '_') {
            return i;
        }
    }
    return null;
}


function isMoveAvailable() {
    for (const row of grid) {
        for (const cell of row) {
            if (cell === '_') {
                return true;
            }
        }
    }
    return false;
}

function IA() {
    let col = Math.floor(Math.random() * 7);
    let row = getCellPlayable(col);
    if (row === null) {
        IA();
    }
    else {
        cells[row][col].style.backgroundColor = 'yellow';
        grid[row][col] = 'yellow';
        let winner = checkWin();
        if (winner !== null) {
            countScores(winner);
        }
    }
}


function countScores(winner) {
    winnerEl.innerText = `${winner} a gagné !`;
    if (winner === player) {
        scoreJoueur++;
        scoreJoueurEl.innerText = `Score : ${scoreJoueur}`;
    }
    else if (winner === ia) {
        scoreOrdinateur++;
        scoreOrdinateurEl.innerText = `Score : ${scoreOrdinateur}`;
    }
}


function checkWin() {
    if (!isMoveAvailable()) {
        return 'draw';
    }
    // verify if 4 reds or 4 yellows are in a row
    for (const row of grid) {
        for (let i = 0; i < row.length - 3; i++) {
            if (row[i] === 'red' && row[i + 1] === 'red' && row[i + 2] === 'red' && row[i + 3] === 'red') {
                return 'red';
            } else if (row[i] === 'yellow' && row[i + 1] === 'yellow' && row[i + 2] === 'yellow' && row[i + 3] === 'yellow') {
                return 'yellow';
            }
        }
    }
    // verify if 4 reds or 4 yellows are in a column
    for (let i = 0; i < grid.length - 3; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 'red' && grid[i + 1][j] === 'red' && grid[i + 2][j] === 'red' && grid[i + 3][j] === 'red') {
                return 'red';
            } else if (grid[i][j] === 'yellow' && grid[i + 1][j] === 'yellow' && grid[i + 2][j] === 'yellow' && grid[i + 3][j] === 'yellow') {
                return 'yellow';
            }
        }
    }
    // verify if 4 reds or 4 yellows are in a diagonal
    for (let i = 0; i < grid.length - 3; i++) {
        for (let j = 0; j < grid[i].length - 3; j++) {
            if (grid[i][j] === 'red' && grid[i + 1][j + 1] === 'red' && grid[i + 2][j + 2] === 'red' && grid[i + 3][j + 3] === 'red') {
                return 'red';
            } else if (grid[i][j] === 'yellow' && grid[i + 1][j + 1] === 'yellow' && grid[i + 2][j + 2] === 'yellow' && grid[i + 3][j + 3] === 'yellow') {
                return 'yellow';
            }
        }
    }
    // verify if 4 reds or 4 yellows are in a diagonal
    for (let i = 3; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length - 3; j++) {
            if (grid[i][j] === 'red' && grid[i - 1][j + 1] === 'red' && grid[i - 2][j + 2] === 'red' && grid[i - 3][j + 3] === 'red') {
                return 'red';
            } else if (grid[i][j] === 'yellow' && grid[i - 1][j + 1] === 'yellow' && grid[i - 2][j + 2] === 'yellow' && grid[i - 3][j + 3] === 'yellow') {
                return 'yellow';
            }
        }
    }
    return null;
}

function boardEmpty() {
    for (const row of grid) {
        for (const cell of row) {
            if (cell !== '_') {
                return false;
            }
        }
    }
    return true;
}

function IAv2() {
    if (boardEmpty()) {
        col = Math.floor(Math.random() * 7);
        cells[0][col].style.backgroundColor = ia;
        grid[0][col] = ia;
    }
    else {
        let bestMove = findBestMove();
        cells[bestMove[0]][bestMove[1]].style.backgroundColor = ia;
        grid[bestMove[0]][bestMove[1]] = ia;
        let winner = checkWin();
        if (winner !== null) {
            countScores(winner);
        }
    }

}

function findBestMove() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < grid.length; i++) {
        let row = getCellPlayable(i);
        if (row !== null) {
            grid[row][i] = ia;
            let score = minimax(grid, 0, false);
            grid[row][i] = '_';
            if (score > bestScore) {
                bestScore = score;
                bestMove = [row, i];
            }
        }
    }
    console.log(bestScore);
    return bestMove;
}

/**
 * if negative, the player is losing
 * if positive, the player is winning
 */
function evaluatePosition(player) {
    let opponent;
    if (player === 'red') {
        opponent === 'yellow';
    }
    else {
        opponent === 'red';
    }
    let score = 0;
    // if 3 player aligned horizontally and 1 empty
    for (let i = 0; i < grid.length - 3; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === player && grid[i + 1][j] === player && grid[i + 2][j] === player && grid[i + 3][j] === '_') {
                score += 10;
            }
            if (grid[i][j] === '_' && grid[i + 1][j] === player && grid[i + 2][j] === player && grid[i + 3][j] === player) {
                score += 10;
            }
            if (grid[i][j] === player && grid[i + 1][j] === player && grid[i + 2][j] === '_' && grid[i + 3][j] === '_') {
                score += 4;
            }
            if (grid[i][j] === '_' && grid[i + 1][j] === player && grid[i + 2][j] === player && grid[i + 3][j] === '_') {
                score += 4;
            }
            if (grid[i][j] === '_' && grid[i + 1][j] === '_' && grid[i + 2][j] === player && grid[i + 3][j] === player) {
                score += 4;
            }
            if (grid[i][j] === opponent && grid[i + 1][j] === opponent && grid[i + 2][j] === '_' && grid[i + 3][j] === '_') {
                score -= 4;
            }
            if (grid[i][j] === '_' && grid[i + 1][j] === opponent && grid[i + 2][j] === opponent && grid[i + 3][j] === '_') {
                score -= 4;
            }
            if (grid[i][j] === '_' && grid[i + 1][j] === '_' && grid[i + 2][j] === opponent && grid[i + 3][j] === opponent) {
                score -= 4;
            }
            if (grid[i][j] === opponent && grid[i + 1][j] === opponent && grid[i + 2][j] === opponent && grid[i + 3][j] === '_') {
                score -= 8;
            }
            if (grid[i][j] === '_' && grid[i + 1][j] === opponent && grid[i + 2][j] === opponent && grid[i + 3][j] === opponent) {
                score -= 8;
            }
        }
    }
    // if 3 player aligned vertically and 1 empty
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length - 3; j++) {
            if (grid[i][j] === player && grid[i][j + 1] === player && grid[i][j + 2] === player && grid[i][j + 3] === '_') {
                score += 10;
            }
            if (grid[i][j] === '_' && grid[i][j + 1] === player && grid[i][j + 2] === player && grid[i][j + 3] === player) {
                score += 10;
            }
            if (grid[i][j] === opponent && grid[i][j + 1] === opponent && grid[i][j + 2] === opponent && grid[i][j + 3] === '_') {
                score -= 8;
            }
            if (grid[i][j] === '_' && grid[i][j + 1] === opponent && grid[i][j + 2] === opponent && grid[i][j + 3] === opponent) {
                score -= 8;
            }
            if (grid[i][j] === opponent && grid[i][j + 1] === opponent && grid[i][j + 2] === '_' && grid[i][j + 3] === '_') {
                score -= 4;
            }
            if (grid[i][j] === '_' && grid[i][j + 1] === opponent && grid[i][j + 2] === opponent && grid[i][j + 3] === '_') {
                score -= 4;
            }
            if (grid[i][j] === '_' && grid[i][j + 1] === '_' && grid[i][j + 2] === opponent && grid[i][j + 3] === opponent) {
                score -= 4;
            }
            if (grid[i][j] === player && grid[i][j + 1] === player && grid[i][j + 2] === '_' && grid[i][j + 3] === '_') {
                score += 4;
            }
            if (grid[i][j] === '_' && grid[i][j + 1] === player && grid[i][j + 2] === player && grid[i][j + 3] === '_') {
                score += 4;
            }
            if (grid[i][j] === '_' && grid[i][j + 1] === '_' && grid[i][j + 2] === player && grid[i][j + 3] === player) {
                score += 4;
            }
        }
    }
    // if 3 player aligned diagonally and 1 empty
    for (let i = 0; i < grid.length - 3; i++) {
        for (let j = 0; j < grid[i].length - 3; j++) {
            if (grid[i][j] === player && grid[i + 1][j + 1] === player && grid[i + 2][j + 2] === player && grid[i + 3][j + 3] === '_') {
                score += 10;
            }
            if (grid[i][j] === '_' && grid[i + 1][j + 1] === player && grid[i + 2][j + 2] === player && grid[i + 3][j + 3] === player) {
                score += 10;
            }
            if (grid[i][j] === player && grid[i + 1][j + 1] === player && grid[i + 2][j + 2] === '_' && grid[i + 3][j + 3] === '_') {
                score += 4;
            }
            if (grid[i][j] === '_' && grid[i + 1][j + 1] === player && grid[i + 2][j + 2] === player && grid[i + 3][j + 3] === '_') {
                score += 4;
            }
            if (grid[i][j] === '_' && grid[i + 1][j + 1] === '_' && grid[i + 2][j + 2] === player && grid[i + 3][j + 3] === player) {
                score += 4;
            }
            if (grid[i][j] === opponent && grid[i + 1][j] === opponent && grid[i + 2][j] === opponent && grid[i + 3][j] === '_') {
                score -= 8;
            }
            if (grid[i][j] === '_' && grid[i + 1][j] === opponent && grid[i + 2][j] === opponent && grid[i + 3][j] === opponent) {
                score -= 8;
            }
            if (grid[i][j] === opponent && grid[i + 1][j + 1] === opponent && grid[i + 2][j + 2] === '_' && grid[i + 3][j + 3] === '_') {
                score -= 4;
            }
            if (grid[i][j] === '_' && grid[i + 1][j + 1] === opponent && grid[i + 2][j + 2] === opponent && grid[i + 3][j + 3] === '_') {
                score -= 4;
            }
            if (grid[i][j] === '_' && grid[i + 1][j + 1] === '_' && grid[i + 2][j + 2] === opponent && grid[i + 3][j + 3] === opponent) {
                score -= 4;
            }
        }
    }
    // if 3 player aligned diagonally and 1 empty
    for (let i = 3; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length - 3; j++) {
            if (grid[i][j] === player && grid[i - 1][j + 1] === player && grid[i - 2][j + 2] === player && grid[i - 3][j + 3] === '_') {
                score += 10;
            }
            if (grid[i][j] === '_' && grid[i - 1][j + 1] === player && grid[i - 2][j + 2] === player && grid[i - 3][j + 3] === player) {
                score += 10;
            }
            if (grid[i][j] === opponent && grid[i - 1][j + 1] === opponent && grid[i - 2][j + 2] === '_' && grid[i - 3][j + 3] === '_') {
                score -= 4;
            }
            if (grid[i][j] === '_' && grid[i - 1][j + 1] === opponent && grid[i - 2][j + 2] === opponent && grid[i - 3][j + 3] === '_') {
                score -= 4;
            }
            if (grid[i][j] === '_' && grid[i - 1][j + 1] === '_' && grid[i - 2][j + 2] === opponent && grid[i - 3][j + 3] === opponent) {
                score -= 4;
            }
            if (grid[i][j] === opponent && grid[i - 1][j + 1] === opponent && grid[i - 2][j + 2] === opponent && grid[i - 3][j + 3] === '_') {
                score -= 8;
            }
            if (grid[i][j] === '_' && grid[i - 1][j + 1] === opponent && grid[i - 2][j + 2] === opponent && grid[i - 3][j + 3] === opponent) {
                score -= 8;
            }
            if (grid[i][j] === player && grid[i - 1][j + 1] === player && grid[i - 2][j + 2] === '_' && grid[i - 3][j + 3] === '_') {
                score += 4;
            }
            if (grid[i][j] === '_' && grid[i - 1][j + 1] === player && grid[i - 2][j + 2] === player && grid[i - 3][j + 3] === '_') {
                score += 4;
            }
            if (grid[i][j] === '_' && grid[i - 1][j + 1] === '_' && grid[i - 2][j + 2] === player && grid[i - 3][j + 3] === player) {
                score += 4;
            }
        }
    }

    return score;
}


function minimax(grid, depth, isMaximizing) {
    let winner = checkWin();
    if (winner === ia) {
        return 100 - depth;
    }
    else if (winner === player) {
        return -100 + depth;
    }
    else if (winner === "draw") {
        return 0;
    }
    else if (depth === 5) {
        let score = evaluatePosition(ia);
        return score;
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < grid.length; i++) {
            let row = getCellPlayable(i);
            if (row !== null) {
                grid[row][i] = ia;
                let score = minimax(grid, depth + 1, false);
                grid[row][i] = '_';
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < grid.length; i++) {
            let row = getCellPlayable(i);
            if (row !== null) {
                grid[row][i] = player;
                let score = minimax(grid, depth + 1, true);
                grid[row][i] = '_';
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    }
}

play()


