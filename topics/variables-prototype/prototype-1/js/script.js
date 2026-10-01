/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// The character's position and size
let charX = 200;
let charY = 200;
let charSize = 50;

// Where the character is currently headed
let targetX = 200;
let targetY = 200;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Moves the target to wherever was just clicked
 */
function mousePressed() {
    targetX = mouseX;
    targetY = mouseY;
}

/**
 * Draws the character as a square, easing it toward the target
 */
function draw() {
    background(220);

    // Move a little closer to the target each frame
    charX += (targetX - charX) * 0.05;
    charY += (targetY - charY) * 0.05;

    // Keep the character fully inside the canvas
    charX = constrain(charX, charSize / 2, width - charSize / 2);
    charY = constrain(charY, charSize / 2, height - charSize / 2);

    push();
    rectMode(CENTER);
    fill(80, 120, 200);
    rect(charX, charY, charSize, charSize);
    pop();
}
