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

// Whatever the player has clicked so far (empty until they pick one)
let playerChoice = "";

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

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("You picked: " + playerChoice, width / 2, 350);
    pop();
}

/**
 * Returns true if the mouse is currently over a button centred at
 * (x, y)
 */
function isMouseOverButton(x, y, size) {
    const d = dist(mouseX, mouseY, x, y);
    return d < size / 2;
}

/**
 * Checks whether the player clicked one of the three buttons, and
 * remembers their choice if so
 */
function mousePressed() {
    if (isMouseOverButton(150, 200, choiceSize)) {
        playerChoice = "rock";
    } else if (isMouseOverButton(300, 200, choiceSize)) {
        playerChoice = "paper";
    } else if (isMouseOverButton(450, 200, choiceSize)) {
        playerChoice = "scissors";
    }
}
