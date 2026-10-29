/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// The three choice images, and the size each one is drawn at
let rockImg;
let paperImg;
let scissorsImg;
const choiceSize = 120;

/**
 * Creates the canvas and loads the three choice images
 */
async function setup() {
    createCanvas(600, 400);
    imageMode(CENTER);

    rockImg = await loadImage('assets/images/rock.png');
    paperImg = await loadImage('assets/images/paper.jpg');
    scissorsImg = await loadImage('assets/images/scissors.png');
}

/**
 * Draws the three choice buttons
 */
function draw() {
    background(20);

    image(rockImg, 150, 200, choiceSize, choiceSize);
    image(paperImg, 300, 200, choiceSize, choiceSize);
    image(scissorsImg, 450, 200, choiceSize, choiceSize);
}
