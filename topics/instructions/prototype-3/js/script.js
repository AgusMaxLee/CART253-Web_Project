/**
 * 3D Shape Generator
 * Agustin Maximo Lee
 *
 * An abstract scene of random 3D shapes, generated randomly.
 */

"use strict";

// How many shapes to generate
const numShapes = 15;
let shapes = [];

/**
 * Creates the canvas, sets up HSB colour mode, and generates random shapes.
 */
function setup() {
    createCanvas(640, 640, WEBGL);
    colorMode(HSB, 360, 100, 100);

    for (let i = 0; i < numShapes; i++) {
        shapes.push({
            x: random(-250, 250),
            y: random(-250, 250),
            z: random(-250, 250),
            size: random(20, 80),
            hue: random(0, 360)
        });
    }
}

/**
 * Draws the background
 */
function draw() {
    background(0, 0, 10);
}
