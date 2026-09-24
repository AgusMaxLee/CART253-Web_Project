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
 * Draws a single rotating box at the centre
 */
function draw() {
    background(20);

    // Rotate the whole scene a little more each frame
    rotateY(frameCount * 0.01);

    push();
    fill(200, 100, 255);
    box(100);
    pop();
}
