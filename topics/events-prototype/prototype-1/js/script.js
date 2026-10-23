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
}

/**
 * Starts the game the moment the player clicks, if its on the start screen
 */
function mousePressed() {
    if (gameState === "start") {
        gameState = "playing";
    }
}
