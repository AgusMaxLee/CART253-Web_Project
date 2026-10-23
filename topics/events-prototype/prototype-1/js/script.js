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

// The word that falls, and how far down it's gotten
let currentWord = "noob";
let wordY = 0;

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
        drawStartScreen();
    } else if (gameState === "playing") {
        updateAndDrawPlaying();
    }
}

/**
 * Draws the "click to start" message
 */
function drawStartScreen() {
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Click to Start", width / 2, height / 2);
    pop();
}

/**
 * Moves the word down a little every frame, looping back to the top
 * once it reaches the bottom
 */
function updateAndDrawPlaying() {
    wordY += 1;

    if (wordY > height) {
        wordY = 0;
    }

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(currentWord, width / 2, wordY);
    pop();

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(typedBuffer, width / 2, wordY + 30);
    pop();
}

/**
 * Builds up typedBuffer one letter at a time as long as it still
 * matches the start of currentWord, or resets it on a mistake
 */
function keyTyped() {
    const attempt = typedBuffer + key;

    if (currentWord.toLowerCase().startsWith(attempt.toLowerCase())) {
        typedBuffer = attempt;

        if (typedBuffer === currentWord) {
            typedBuffer = "";
        }
    } else {
        typedBuffer = "";
    }
}

/**
 * Starts the game the moment the player clicks, if its on the start screen
 */
function mousePressed() {
    if (gameState === "start") {
        gameState = "playing";
    }
}
