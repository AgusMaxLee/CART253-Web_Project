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

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draws the character as a square
 */
function draw() {
    background(220);

    push();
    rectMode(CENTER);
    fill(80, 120, 200);
    rect(charX, charY, charSize, charSize);
    pop();
}
