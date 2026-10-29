/**
 * Rock Paper Scissors
 * Agustin Maximo Lee
 *
 * Pick rock, paper, or scissors and see how you do against a computer
 * that always picks randomly. Keeps track of your wins and losses.
 */

"use strict";

// The three choice images, the table background, and the size each
// choice image is drawn at
let rockImg;
let paperImg;
let scissorsImg;
let tableImg;
const choiceSize = 100;

// Which screen is currently showing
let gameState = "start";

// Whatever the player and computer have picked so far, and who won
let playerChoice = "";
let computerChoice = "";
let result = "";

// How many rounds the player has won and lost so far
let wins = 0;
let losses = 0;

/**
 * Creates the canvas and loads the images
 */
async function setup() {
    createCanvas(600, 400);
    imageMode(CENTER);

    rockImg = await loadImage('assets/images/rock.png');
    paperImg = await loadImage('assets/images/paper.png');
    scissorsImg = await loadImage('assets/images/scissors.png');
    tableImg = await loadImage('assets/images/table.jpg');

    textFont('Luckiest Guy');
}

/**
 * Draws whichever screen matches the current game state
 */
function draw() {
    image(tableImg, width / 2, height / 2, width, height);

    if (gameState === "start") {
        drawStartScreen();
    } else if (gameState === "playing") {
        drawPlayingScreen();
        drawScore();
    } else if (gameState === "end") {
        drawEndScreen();
        drawScore();
    }
}

/**
 * Draws the win/loss counter in the corner
 */
function drawScore() {
    push();
    fill(255);
    textAlign(LEFT, TOP);
    textSize(16);
    text("Wins: " + wins + "  Losses: " + losses, 10, 10);
    pop();
}

/**
 * Draws the title and a "click to start" prompt
 */
function drawStartScreen() {
    push();
    fill(0, 150);
    noStroke();
    rect(0, 0, width, height);
    pop();

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("Rock Paper Scissors", width / 2, height / 2 - 20);
    textSize(20);
    text("Click to Start", width / 2, height / 2 + 30);
    pop();
}

/**
 * Draws the three choice buttons at the bottom of the canvas
 */
function drawPlayingScreen() {
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Pick your move!", width / 2, 60);
    pop();

    image(rockImg, 150, 320, choiceSize, choiceSize);
    image(paperImg, 300, 320, choiceSize, choiceSize);
    image(scissorsImg, 450, 320, choiceSize, choiceSize);
}

/**
 * Draws the computer's choice up top, along with the player's own
 * choice and the result of the round
 */
function drawEndScreen() {
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("You", 150, 60);
    text("Computer", 450, 60);
    pop();

    image(getImageForChoice(playerChoice), 150, 120, choiceSize, choiceSize);
    image(getImageForChoice(computerChoice), 450, 120, choiceSize, choiceSize);

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(result, width / 2, 220);
    textSize(18);
    text("Click to Play Again", width / 2, 270);
    pop();
}

/**
 * Returns the matching image for a given choice name
 */
function getImageForChoice(choice) {
    if (choice === "rock") {
        return rockImg;
    } else if (choice === "paper") {
        return paperImg;
    } else {
        return scissorsImg;
    }
}

/**
 * Returns true if the mouse is currently over a button centred at
 * (x, y)
 */
function isMouseOverButton(x, y, size) {
    const d = dist(mouseX, mouseY, x, y);
    return d < size / 2;
}

/**
 * Handles clicks depending on which screen is showing: starts the
 * game, checks the three choice buttons, or returns to play again
 */
function mousePressed() {
    if (gameState === "start") {
        gameState = "playing";
    } else if (gameState === "playing") {
        checkChoiceClick();
    } else if (gameState === "end") {
        gameState = "playing";
    }
}

/**
 * Checks whether the player clicked one of the three buttons, and if
 * so, plays out the round
 */
function checkChoiceClick() {
    if (isMouseOverButton(150, 320, choiceSize)) {
        playerChoice = "rock";
    } else if (isMouseOverButton(300, 320, choiceSize)) {
        playerChoice = "paper";
    } else if (isMouseOverButton(450, 320, choiceSize)) {
        playerChoice = "scissors";
    } else {
        return;
    }

    computerChoice = getComputerChoice();
    result = determineWinner(playerChoice, computerChoice);
    updateScore(result);
    gameState = "end";
}

/**
 * Increases the win or loss count based on the round's result
 */
function updateScore(roundResult) {
    if (roundResult === "You Win!") {
        wins++;
    } else if (roundResult === "You Lose!") {
        losses++;
    }
}

/**
 * Returns a random choice: "rock", "paper", or "scissors"
 */
function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    return options[floor(random(3))];
}

/**
 * Returns "You Win!", "You Lose!", or "Tie!" based on the player's
 * and computer's choices
 */
function determineWinner(player, computer) {
    if (player === computer) {
        return "Tie!";
    }

    const playerWins =
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper");

    if (playerWins) {
        return "You Win!";
    } else {
        return "You Lose!";
    }
}
