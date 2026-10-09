/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// The box's position and size
let boxX = 200;
let boxY = 200;
let boxSize = 150;

// The creature's size (it sits at the same position as the box)
let creatureSize = 60;

// How close the mouse needs to be before the creature hides
let hideDistance = 100;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draws the box and the creature peeking out of it
 */
function draw() {
    background(220);

    drawBox();

    // Only draw the creature if the mouse isn't too close
    const mouseDistance = dist(mouseX, mouseY, boxX, boxY);
    if (mouseDistance > hideDistance) {
        drawCreature();
    }
}

/**
 * Draws a simple open box
 */
function drawBox() {
    push();
    rectMode(CENTER);
    noFill();
    stroke(120, 80, 50);
    strokeWeight(6);
    rect(boxX, boxY, boxSize, boxSize);
    pop();
}

/**
 * Draws a little circle creature with a face
 */
function drawCreature() {
    push();
    noStroke();
    fill(240, 200, 60);
    circle(boxX, boxY, creatureSize);

    // Eyes
    fill(0);
    circle(boxX - 10, boxY - 5, 6);
    circle(boxX + 10, boxY - 5, 6);

    // Mouth
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(boxX, boxY + 5, 20, 15, 0, PI);
    pop();
}
