/**
 * Four Moods
 * Agustin Maximo Lee
 *
 * The canvas is split into 4 coloured quadrants based on mouse
 * position, and a clown moves differently depending on which
 * quadrant the mouse is in: shaking, drifting down, swaying, or
 * floating up.
 */

"use strict";

let clownImg;

// The clown's actual position (only changed by the "down" and "free" behaviours)
let clownX = 200;
let clownY = 200;
let clownSize = 80;

/**
 * Creates the canvas and loads the clown image
 */
async function setup() {
    createCanvas(400, 400);
    clownImg = await loadImage('assets/images/clown.png');
}

/**
 * Colours the background based on which quadrant the mouse is in,
 * and moves the clown differently depending on the colour
 */
function draw() {
    const inLeftHalf = mouseX < width / 2;
    const inTopHalf = mouseY < height / 2;

    // A temporary visual offset for behaviours that don't actually
    // move the clown's real position (shaking, swaying)
    let offsetX = 0;
    let offsetY = 0;

    if (inLeftHalf && inTopHalf) {
        // Red: shake in place
        background(230, 90, 90);
        offsetX = random(-5, 5);
        offsetY = random(-5, 5);
    } else if (!inLeftHalf && inTopHalf) {
        // Blue: slowly drift downward, wrapping back to the top
        background(90, 130, 230);
        clownY += 0.5;
        if (clownY > height) {
            clownY = 0;
        }
    } else if (inLeftHalf && !inTopHalf) {
        // Green: sway side to side
        background(90, 200, 120);
        offsetX = sin(frameCount * 0.05) * 30;
    } else {
        // Yellow: drift slowly upward, wrapping back to the bottom
        background(240, 210, 70);
        clownX += random(-1, 1);
        clownY += random(-1, 0);
        clownX = constrain(clownX, clownSize / 2, width - clownSize / 2);
        if (clownY < 0) {
            clownY = height;
        }
    }

    drawQuadrantLines();

    push();
    imageMode(CENTER);
    image(clownImg, clownX + offsetX, clownY + offsetY, clownSize, clownSize);
    pop();
}

/**
 * Draws a cross dividing the canvas into its 4 quadrants, so it's
 * clear where one behaviour ends and the next begins
 */
function drawQuadrantLines() {
    push();
    stroke(0, 80);
    strokeWeight(2);
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    pop();
}
