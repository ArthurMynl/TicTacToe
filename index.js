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

newGameEl.addEventListener("click", reset);

const cells = [[cell1, cell2, cell3], [cell4, cell5, cell6], [cell7, cell8, cell9]];
let gameboard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let isFinished = 0;
let scoreJoueur = 0;
let scoreOrdinateur = 0;

scoreJoueurEl.innerText = `Score : ${scoreJoueur}`;
scoreOrdinateurEl.innerText = `Score : ${scoreOrdinateur}`;


function play() {
    for (const row of cells) {
        for (const cell of row) {
            cell.addEventListener("click", () => {
                if (cell.innerHTML === "" && isFinished === 0) {
                    cell.innerHTML = "X";
                    gameboard[cell.id[4] - 1][cell.id[5] - 1] = "X";
                    checkWin();
                    if (isFinished === 0) {
                        IA()
                    }
                }
            });
        }
    }
}

function reset() {
    for (const row of cells) {
        for (const cell of row) {
            cell.innerHTML = "";
        }
    }
    gameboard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    isFinished = 0;
    winnerEl.innerText = "";
}


function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (gameboard[i][0] == gameboard[i][1] && gameboard[i][1] == gameboard[i][2]) {
            if (gameboard[i][0] == "X") {
                isFinished = "X wins!";

            } else if (gameboard[i][0] === "O") {
                isFinished = "O wins!";
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        if (gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i]) {
            if (gameboard[0][i] === "X") {
                isFinished = "X wins!";
            } else if (gameboard[0][i] === "O") {
                isFinished = "O wins!";
            }
        }
    }
    if (gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) {
        if (gameboard[0][0] === "X") {
            isFinished = "X wins!";
        } else if (gameboard[0][0] === "O") {
            isFinished = "O wins!";
        }
    }
    if (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]) {
        if (gameboard[0][2] === "X") {
            isFinished = "X wins!";
        } else if (gameboard[0][2] === "O") {
            isFinished = "O wins!";
        }
    }
    var isDraw = true;
    for (var i = 0; i < gameboard.length; i++) {
        for (var j = 0; j < gameboard[i].length; j++) {
            if (gameboard[i][j] === 0) {
                isDraw = false;
            }
        }
    }
    if (isDraw && isFinished === 0) {
        isFinished = "Draw!";
    }

    if (isFinished !== 0) {
        handleFinished();
    }
}

function handleFinished() {
    winnerEl.innerText = `${isFinished}`;
    if (isFinished === "X wins!") {
        scoreJoueur++;
        scoreJoueurEl.innerText = `Score : ${scoreJoueur}`;
    }
    else if (isFinished === "O wins!") {
        scoreOrdinateur++;
        scoreOrdinateurEl.innerText = `Score : ${scoreOrdinateur}`;
    }
}

function IA() {
    let random = Math.floor(Math.random() * 3);
    let random2 = Math.floor(Math.random() * 3);
    if (gameboard[random][random2] === 0) {
        cells[random][random2].innerHTML = "O";
        gameboard[random][random2] = "O";
        checkWin();
    }
    else {
        IA();
    }
}


function minmax(node, depth, maximizingPlayer) {
    if (checkWin() !== 0) {
        if (checkWin() === "X wins!") {
            return -10 + depth;
        }
        else if (checkWin() === "O wins!") {
            return 10 - depth;
        }
        else {
            return 0;
        }
    }
    if (maximizingPlayer) {
        let best = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameboard[i][j] === 0) {
                    gameboard[i][j] = "X";
                    best = Math.max(best, minmax(node, depth + 1, false));
                    gameboard[i][j] = 0;
                }
            }
        }
        return best;
    }
    else {
        let best = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameboard[i][j] === 0) {
                    gameboard[i][j] = "O";
                    best = Math.min(best, minmax(node, depth + 1, true));
                    gameboard[i][j] = 0;
                }
            }
        }
        return best;
    }
}

play();