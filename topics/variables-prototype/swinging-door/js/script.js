/**
 * Swinging Door
 * Agustin Maximo Lee
 *
 * A door, viewed from above, that swings open and closed on its own,
 * driven entirely by a variable animated with sine.
 */

"use strict";

// Where the door is hinged (the point it swings around)
let hingeX = 150;
let hingeY = 200;

// The door panel's length and thickness, in this top-down view
let doorLength = 100;
let doorThickness = 10;

// How open the door is: 0 = fully closed, 1 = fully open (90 degrees)
let doorOpenness = 0;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draws a door, viewed from above, swinging open and closed on its own
 */
function draw() {
    background(220);

    // Cycle smoothly between 0 and 1 using sine
    doorOpenness = (sin(frameCount * 0.02) + 1) / 2;

    // Turn that into an angle: closed = flat along the wall, open = swung into the room
    const doorAngle = map(doorOpenness, 0, 1, 0, HALF_PI);

    drawWall();
    drawDoor(doorAngle);
}

/**
 * Draws a simple wall with a gap where the doorway is
 */
function drawWall() {
    push();
    stroke(100);
    strokeWeight(doorThickness);
    line(0, hingeY, hingeX, hingeY);
    line(hingeX + doorLength, hingeY, width, hingeY);
    pop();
}

/**
 * Draws the door panel as a rectangle rotated around the hinge point
 */
function drawDoor(angle) {
    push();
    translate(hingeX, hingeY);
    rotate(angle);
    rectMode(CORNER);
    noStroke();
    fill(120, 80, 50);
    rect(0, -doorThickness / 2, doorLength, doorThickness);
    pop();

    // Mark the hinge itself
    push();
    noStroke();
    fill(50);
    circle(hingeX, hingeY, 6);
    pop();
}
