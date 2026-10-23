/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// Which screen we're currently showing
let gameState = "start";

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
 * Starts the game the moment the player clicks, if we're on the start screen
 */
function mousePressed() {
    if (gameState === "start") {
        gameState = "playing";
    }
}
