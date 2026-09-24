/**
 * Orbiting Shapes
 * Agustin Maximo Lee
 *
 * An abstract 3D scene of simple shapes orbiting a centre point.
 */

"use strict";

/**
 * Creates a 3D (WEBGL) canvas
 */
function setup() {
    createCanvas(640, 640, WEBGL);
}

/**
 * Draws a single box, rotated based on the mouse position
 */
function draw() {
    background(20);

    // Turn the box based on where the mouse is on the canvas
    const angleY = map(mouseX, 0, width, 0, TWO_PI);
    const angleX = map(mouseY, 0, height, 0, TWO_PI);
    rotateY(angleY);
    rotateX(angleX);

    push();
    fill(200, 100, 255);
    box(100);
    pop();
}
