const cell1 = document.getElementById("cell11");
const cell2 = document.getElementById("cell12");
const cell3 = document.getElementById("cell13");
const cell4 = document.getElementById("cell21");
const cell5 = document.getElementById("cell22");
const cell6 = document.getElementById("cell23");
const cell7 = document.getElementById("cell31");
const cell8 = document.getElementById("cell32");
const cell9 = document.getElementById("cell33");

const scoreJoueurEl = document.getElementById("score-joueur");
const scoreOrdinateurEl = document.getElementById("score-ordinateur");
const winnerEl = document.getElementById("winner");
const newGameEl = document.getElementById("new-game");
const checkbox = document.getElementById("switch");

newGameEl.addEventListener("click", reset);

const cells = [[cell1, cell2, cell3], [cell4, cell5, cell6], [cell7, cell8, cell9]];
let gameboard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let scoreJoueur = 0;
let scoreOrdinateur = 0;

scoreJoueurEl.innerText = `Score : ${scoreJoueur}`;
scoreOrdinateurEl.innerText = `Score : ${scoreOrdinateur}`;


let ia = 'O';
let player = 'X';
let playerPlayFirst = false;


function reset() {
    for (const row of cells) {
        for (const cell of row) {
            cell.innerHTML = "";
        }
    }
    gameboard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    isFinished = false;
    winnerEl.innerText = "";
    playerPlayFirst = !playerPlayFirst;
    if (!playerPlayFirst) {
        IAv2();
    }
}


function play() {
    for (const row of cells) {
        for (const cell of row) {
            cell.addEventListener("click", () => {
                if (cell.innerHTML === "" && checkWin() === null) {
                    cell.innerHTML = player;
                    gameboard[cell.id[4] - 1][cell.id[5] - 1] = player;
                    let winner = checkWin();
                    if (winner === null) {
                        IAv2()
                    }
                    else {
                        countScores(winner);
                    }
                }
            });
        }
    }
}


function checkWin() {
    let winner = null;
    if (isMoveAvailable() === false) {
        winner = "Draw";
    }
    for (let i = 0; i < 3; i++) {
        if (gameboard[i][0] == gameboard[i][1] && gameboard[i][1] == gameboard[i][2]) {
            if (gameboard[i][0] == player) {
                winner = player;
            } else if (gameboard[i][0] === ia) {
                winner = ia;
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        if (gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i]) {
            if (gameboard[0][i] === "X") {
                winner = player;
            } else if (gameboard[0][i] === "O") {
                winner = ia;
            }
        }
    }
    if (gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) {
        if (gameboard[0][0] === "X") {
            winner = player;
        } else if (gameboard[0][0] === "O") {
            winner = ia;
        }
    }
    if (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]) {
        if (gameboard[0][2] === "X") {
            winner = player;
        } else if (gameboard[0][2] === "O") {
            winner = ia;
        }
    }
    return winner;
}


function countScores(winner) {
    winnerEl.innerText = `${winner} a gagn?? !`;
    if (winner === player) {
        scoreJoueur++;
        scoreJoueurEl.innerText = `Score : ${scoreJoueur}`;
    }
    else if (winner === ia) {
        scoreOrdinateur++;
        scoreOrdinateurEl.innerText = `Score : ${scoreOrdinateur}`;
    }
}


function isMoveAvailable() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameboard[i][j] === 0) {
                return true;
            }
        }
    }
    return false;
}

function boardEmpty() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameboard[i][j] !== 0) {
                return false;
            }
        }
    }
    return true;
}


/**
 * Deprecated : in this function IA is just playing randomly, moreover, it doesn't work with the new game approach'
 */
function IA() {
    let random = Math.floor(Math.random() * 3);
    let random2 = Math.floor(Math.random() * 3);
    if (gameboard[random][random2] === 0) {
        cells[random][random2].innerHTML = ia;
        gameboard[random][random2] = ia;
        checkWin();
    }
    else {
        IA();
    }
}

function IAv2() {
    if (boardEmpty()) {
        random = Math.floor(Math.random() * 3);
        random2 = Math.floor(Math.random() * 3);
        cells[random][random2].innerHTML = ia;
        gameboard[random][random2] = ia;
    }
    else {
        let bestMove = findBestMove();
        cells[bestMove[0]][bestMove[1]].innerHTML = ia;
        gameboard[bestMove[0]][bestMove[1]] = ia;
        let winner = checkWin();
        if (winner !== null) {
            countScores(winner);
        }
    }
}

function findBestMove() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameboard[i][j] === 0) {
                gameboard[i][j] = ia;
                let score = minmax(gameboard, 0, false);
                gameboard[i][j] = 0;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = [i, j];
                }
            }
        }
    }
    return bestMove;
}



function minmax(gameboard, depth, isMaximizing) {
    let winner = checkWin();
    if (winner === ia) {
        return 10 - depth;
    }
    else if (winner === player) {
        return -10 + depth;
    }
    else if (winner === "Draw") {
        return 0;
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameboard[i][j] === 0) {
                    gameboard[i][j] = ia;
                    let score = minmax(gameboard, depth + 1, false);
                    gameboard[i][j] = 0;
                    bestScore = Math.max(bestScore, score);
                }
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameboard[i][j] === 0) {
                    gameboard[i][j] = player;
                    let score = minmax(gameboard, depth + 1, true);
                    gameboard[i][j] = 0;
                    bestScore = Math.min(bestScore, score);
                }
            }
        }
        return bestScore;
    }
}

if (!playerPlayFirst) {
    IAv2();
}
play();
