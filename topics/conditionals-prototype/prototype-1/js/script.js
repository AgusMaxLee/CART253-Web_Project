/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// The gift box's position and size
let giftX = 200;
let giftY = 200;
let giftSize = 100;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draws the closed gift box
 */
function draw() {
    background(220);

    push();
    rectMode(CENTER);
    fill(200, 30, 60);
    rect(giftX, giftY, giftSize, giftSize);

    // Ribbon
    stroke(255, 210, 60);
    strokeWeight(8);
    line(giftX - giftSize / 2, giftY, giftX + giftSize / 2, giftY);
    line(giftX, giftY - giftSize / 2, giftX, giftY + giftSize / 2);
    pop();
}
