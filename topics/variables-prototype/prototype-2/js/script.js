/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// The door's position and size
let doorX = 200;
let doorY = 200;
let doorWidth = 80;
let doorHeight = 160;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draws a closed door
 */
function draw() {
    background(220);

    push();
    rectMode(CENTER);
    fill(120, 80, 50);
    rect(doorX, doorY, doorWidth, doorHeight);
    pop();
}
