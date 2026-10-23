/**
 * Tilt Simulator
 * Agustin Maximo Lee
 *
 * League of Legends post-game phrases fall. Type each
 * one before it reaches the bottom, or it's game over. Clear all 20
 * to win.
 */

"use strict";

// Which screen is currently showing
let gameState = "start";

// The background image
let bgImg;

// All the words that can appear
const words = ["gg ez", "team diff", "ff15", "report jgl", "skill issue",
    "uninstall", "top gap", "carried", "int", "throw", "outplayed", "tilted",
    "smurf", "hardstuck", "feeder", "bad game", "afk", "gg wp", "lucky",
    "yo mama"];

// How fast words fall, which words haven't been handed out to a lane
// yet, and how many have been successfully typed so far
let wordSpeed = 1;
let remainingWords = [];
let wordsCompleted = 0;

// Three independent falling words, each with its own horizontal spot
let lanes = [
    { x: 170, word: "", y: 0, buffer: "", active: false },
    { x: 500, word: "", y: 0, buffer: "", active: false },
    { x: 830, word: "", y: 0, buffer: "", active: false }
];

/**
 * Creates the canvas, loads the background image, and sets the font
 */
async function setup() {
    createCanvas(1000, 500);
    bgImg = await loadImage('assets/images/type_game_background.jpg');
    textFont('Press Start 2P');
}


/**
 * Draws whichever screen matches the current game state
 */
function draw() {
    image(bgImg, 0, 0, width, height);

    if (gameState === "start") {
        drawMessageScreen("Tilt Simulator", "Click to Start");
    } else if (gameState === "playing") {
        updateAndDrawPlaying();
    } else if (gameState === "gameover") {
        drawMessageScreen("GAME OVER", "Click to Restart");
    } else if (gameState === "victory") {
        drawMessageScreen("VICTORY!", "Click to Restart");
    }
}

/**
 * Draws a big title and a smaller instruction line, centred on the canvas
 */
function drawMessageScreen(title, instruction) {
    // Darken the background image so the text stands out
    push();
    fill(0, 150);
    noStroke();
    rect(0, 0, width, height);
    pop();

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text(title, width / 2, height / 2 - 20);
    textSize(20);
    text(instruction, width / 2, height / 2 + 30);
    pop();
}

/**
 * Updates and draws all three lanes
 */
function updateAndDrawPlaying() {
    push();
    fill(255);
    textAlign(LEFT, TOP);
    textSize(16);
    text("Typed " + wordsCompleted + " / " + words.length, 10, 10);
    pop();

    for (let i = 0; i < lanes.length; i++) {
        updateAndDrawLane(lanes[i]);
    }
}

/**
 * Moves one lane's word down (if it has one), draws it with the typed
 * part in green, and ends the game if it reaches the bottom
 */
function updateAndDrawLane(lane) {
    if (!lane.active) {
        return;
    }

    lane.y += wordSpeed;

    if (lane.y > height) {
        gameState = "gameover";
        return;
    }

    const matched = lane.word.substring(0, lane.buffer.length);
    const remaining = lane.word.substring(lane.buffer.length);

    push();
    textAlign(LEFT, CENTER);
    textSize(28);
    const startX = lane.x - textWidth(lane.word) / 2;

    fill(80, 220, 100);
    text(matched, startX, lane.y);

    fill(255);
    text(remaining, startX + textWidth(matched), lane.y);
    pop();
}

/**
 * Checks every character typed while playing against each active
 * lane, advancing whichever one it still matches
 */
function keyTyped() {
    if (gameState !== "playing") {
        return;
    }

    for (let i = 0; i < lanes.length; i++) {
        tryLetterOnLane(lanes[i], key);
    }
}

/**
 * Tries adding one typed letter to one lane's progress
 */
function tryLetterOnLane(lane, letter) {
    if (!lane.active) {
        return;
    }

    const attempt = lane.buffer + letter;

    if (lane.word.toLowerCase().startsWith(attempt.toLowerCase())) {
        lane.buffer = attempt;

        if (lane.buffer.length === lane.word.length) {
            wordsCompleted++;
            wordSpeed += 0.05;

            if (wordsCompleted >= words.length) {
                gameState = "victory";
            } else {
                spawnLane(lane);
            }
        }
    } else {
        lane.buffer = "";
    }
}

/**
 * Clicking (re)starts the game whenever its not already in progress
 */
function mousePressed() {
    if (gameState !== "playing") {
        startGame();
    }
}

/**
 * Resets everything and begins a fresh run, seeding all 3 lanes
 */
function startGame() {
    wordSpeed = 1;
    remainingWords = words.slice();
    wordsCompleted = 0;

    for (let i = 0; i < lanes.length; i++) {
        spawnLane(lanes[i]);
    }

    gameState = "playing";
}

/**
 * Gives a lane a random word that hasn't been used yet this run and
 * sends it back to the top, or deactivates it if none are left
 */
function spawnLane(lane) {
    if (remainingWords.length === 0) {
        lane.active = false;
        return;
    }

    const randomIndex = floor(random(remainingWords.length));
    lane.word = remainingWords[randomIndex];
    // Remove that word from the list so it can't be picked again this run
    remainingWords.splice(randomIndex, 1);

    lane.y = 20;
    lane.buffer = "";
    lane.active = true;
}
