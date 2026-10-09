/**
 * No-No Box
 * Agustin Maximo Lee
 *
 * A shy creature peeks out of a box, gets nervous as the mouse gets
 * closer, and hides completely once the mouse gets too close.
 */

"use strict";

// The box's position and size
let boxX = 200;
let boxY = 200;
let boxSize = 150;

// The creature's size (it sits at the same position as the box)
let creatureSize = 60;

// How close the mouse needs to be before the creature hides,
// and before it starts looking nervous
let hideDistance = 100;
let nervousDistance = 200;

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

    // How close is the mouse, and which face should that trigger?
    const mouseDistance = dist(mouseX, mouseY, boxX, boxY);

    if (mouseDistance > nervousDistance) {
        drawCreature(false);
    } else if (mouseDistance > hideDistance) {
        drawCreature(true);
    }
    // Otherwise, too close - don't draw the creature at all (it's hiding)
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
 * Draws a little circle creature with a face.
 * If nervous is true, it gets wide eyes and a flat mouth instead
 * of its normal calm face.
 */
function drawCreature(nervous) {
    push();
    noStroke();
    fill(240, 200, 60);
    circle(boxX, boxY, creatureSize);

    // Eyes (bigger when nervous)
    fill(0);
    const eyeSize = nervous ? 10 : 6;
    circle(boxX - 10, boxY - 5, eyeSize);
    circle(boxX + 10, boxY - 5, eyeSize);

    // Mouth (a flat worried line when nervous, a smile otherwise)
    noFill();
    stroke(0);
    strokeWeight(2);
    if (nervous) {
        line(boxX - 8, boxY + 10, boxX + 8, boxY + 10);
    } else {
        arc(boxX, boxY + 5, 20, 15, 0, PI);
    }
    pop();
}
