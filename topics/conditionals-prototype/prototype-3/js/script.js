/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Colours the background based on which quadrant the mouse is in
 */
function draw() {
    const inLeftHalf = mouseX < width / 2;
    const inTopHalf = mouseY < height / 2;

    if (inLeftHalf && inTopHalf) {
        background(230, 90, 90); // top-left: red
    } else if (!inLeftHalf && inTopHalf) {
        background(90, 130, 230); // top-right: blue
    } else if (inLeftHalf && !inTopHalf) {
        background(90, 200, 120); // bottom-left: green
    } else {
        background(240, 210, 70); // bottom-right: yellow
    }
}
