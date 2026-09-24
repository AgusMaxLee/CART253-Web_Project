/**
 * 3D Shapes
 * Agustin Maximo Lee
 *
 * A 3D box with a simple face on it, rotated by the mouse position.
 */

"use strict";

/**
 * Creates a 3D (WEBGL) canvas
 */
function setup() {
    createCanvas(640, 640, WEBGL);
}

/**
 * Draws a single box with a face, rotated based on the mouse position
 */
function draw() {
    background(20);

    // Turn the box based on where the mouse is on the canvas
    // (angleX is limited to a gentle nod up/down so it never flips upside down)
    const angleY = map(mouseX, 0, width, -HALF_PI, HALF_PI);
    const angleX = map(mouseY, 0, height, QUARTER_PI, -QUARTER_PI);
    rotateY(angleY);
    rotateX(angleX);

    push();
    fill(200, 100, 255);
    box(100);
    pop();

    drawFace();
}

/**
 * Draws a simple face at the front of the box, so it rotates along with it
 */
function drawFace() {
    // Eyes 
    push();
    fill(0);
    translate(-20, -15, 51);
    sphere(8);
    pop();

    push();
    fill(0);
    translate(20, -15, 51);
    sphere(8);
    pop();

    // Mouth
    push();
    fill(200, 30, 30);
    translate(0, 20, 51);
    box(40, 8, 5);
    pop();
}
