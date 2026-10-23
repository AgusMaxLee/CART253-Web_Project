/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// Which screen is currently showing
let gameState = "start";

// All the words that can appear
const words = ["noob", "loot", "spawn", "combo", "pixel", "quest", "boss",
    "glitch", "respawn", "nerf", "buff", "clutch", "camper", "lag", "level",
    "potion", "sprint", "critical", "achievement", "legendary"];

// Which word is currently falling, how far down it's gotten, and how fast
let wordIndex = 0;
let currentWord = words[wordIndex];
let wordY = 0;
let wordSpeed = 1;

// What's been typed so far toward the current word
let typedBuffer = "";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(500, 600);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(20);

    if (gameState === "start") {
        drawMessageScreen("Type Mania", "Click to Start");
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
 * Moves the word down a little every frame, ending the game if it
 * reaches the bottom, and draws the word with the typed part in green
 */
function updateAndDrawPlaying() {
    wordY += wordSpeed;

    if (wordY > height) {
        gameState = "gameover";
        return;
    }

    // Progress indicator
    push();
    fill(255);
    textAlign(LEFT, TOP);
    textSize(16);
    text("Word " + (wordIndex + 1) + " / " + words.length, 10, 10);
    pop();

    // The word itself, with the typed part shown in green
    const matched = currentWord.substring(0, typedBuffer.length);
    const remaining = currentWord.substring(typedBuffer.length);

    push();
    textAlign(LEFT, CENTER);
    textSize(32);
    const totalWidth = textWidth(currentWord);
    const startX = width / 2 - totalWidth / 2;

    fill(80, 220, 100);
    text(matched, startX, wordY);

    fill(255);
    text(remaining, startX + textWidth(matched), wordY);
    pop();
}

/**
 * Builds up typedBuffer one letter at a time as long as it still
 * matches the start of currentWord, advancing to the next word (or
 * to victory) once it's fully typed, or resetting it on a mistake
 */
function keyTyped() {
    if (gameState !== "playing") {
        return;
    }

    const attempt = typedBuffer + key;

    if (currentWord.toLowerCase().startsWith(attempt.toLowerCase())) {
        typedBuffer = attempt;

        if (typedBuffer === currentWord) {
            typedBuffer = "";
            wordIndex++;

            if (wordIndex >= words.length) {
                gameState = "victory";
            } else {
                currentWord = words[wordIndex];
                wordY = 20;
                wordSpeed += 0.1;
            }
        }
    } else {
        typedBuffer = "";
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
 * Resets everything and begins a fresh run
 */
function startGame() {
    wordIndex = 0;
    currentWord = words[wordIndex];
    typedBuffer = "";
    wordY = 20;
    wordSpeed = 1;
    gameState = "playing";
}
