/**
 * Mr. Impossible
 * Agustin Maximo Lee
 *
 * A square character that eases toward wherever you click, with two
 * eyes that always look in the direction it's heading.
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

    drawEyes();
}

/**
 * Draws two small dots that look toward the target, so the character
 * appears to face wherever it's headed
 */
function drawEyes() {
    // Direction from the character toward its target
    const angle = atan2(targetY - charY, targetX - charX);

    // How far out from the centre the eyes sit, and how far apart
    const eyeDistance = charSize * 0.2;
    const eyeSpacing = charSize * 0.15;

    // A point out in front of the character, in the direction it's facing
    const frontX = charX + cos(angle) * eyeDistance;
    const frontY = charY + sin(angle) * eyeDistance;

    // Offset sideways from that point (perpendicular to the facing direction)
    const sideX = -sin(angle) * eyeSpacing;
    const sideY = cos(angle) * eyeSpacing;

    push();
    noStroke();
    fill(0);
    circle(frontX + sideX, frontY + sideY, 6);
    circle(frontX - sideX, frontY - sideY, 6);
    pop();
}
