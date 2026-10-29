/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// The player's position, size, and movement speed
let playerX = 300;
let playerY = 300;
const playerSize = 30;
const playerSpeed = 4;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 600);
}

/**
 * Moves the player based on which arrow keys are held, then draws it
 */
function draw() {
    background(20);

    movePlayer();
    drawPlayer();
}

/**
 * Checks which arrow keys are currently held down and moves the
 * player accordingly, keeping it on the canvas
 */
function movePlayer() {
    if (keyIsDown(LEFT_ARROW)) {
        playerX -= playerSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        playerX += playerSpeed;
    }
    if (keyIsDown(UP_ARROW)) {
        playerY -= playerSpeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        playerY += playerSpeed;
    }

    playerX = constrain(playerX, playerSize / 2, width - playerSize / 2);
    playerY = constrain(playerY, playerSize / 2, height - playerSize / 2);
}

/**
 * Draws the player as a square
 */
function drawPlayer() {
    push();
    rectMode(CENTER);
    fill(80, 160, 240);
    rect(playerX, playerY, playerSize, playerSize);
    pop();
}
