/**
 * Rocket Launch
 * Agustin Maximo Lee
 *
 * A scene of a rocket launching off the ground
 * 
 */

"use strict";

// How high up the rocket currently is
let rocketHeight = 0;
let rocketAcceleration = 3;
let flameLength = 60;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(640, 1000);
}

/**
 * Draws the night sky, ground, and rocket, and moves the rocket up
 */
function draw() {
    drawSky();
    drawStars();
    drawGround();
    drawRocket();

    // Move the rocket up a little more each frame
    rocketHeight += 1;
    // Move faster after certain height
    if (rocketHeight > 150) {
        rocketHeight = rocketHeight + rocketAcceleration
        flameLength += 0.5;  // grows the flame of the rocket
    }
}

/**
 * Fills the background
 */
function drawSky() {
    background(10, 10, 40);
}

/**
 * Draws white stars
 */
function drawStars() {
    push();
    fill(255);
    noStroke();
    circle(50, 80, 4);
    circle(150, 40, 3);
    circle(250, 120, 5);
    circle(400, 60, 3);
    circle(500, 150, 4);
    circle(580, 90, 3);
    circle(100, 200, 3);
    circle(550, 300, 4);
    pop();
}

/**
 * Draws a strip of ground along the bottom of the canvas
 */
function drawGround() {
    push();
    fill(40, 90, 40);
    noStroke();
    rect(0, height - 40, width, 40);
    pop();
}

/**
 * Draws the rocket, positioned using rocketHeight
 */
function drawRocket() {
    // Center the rocket horizontally, and raise it by rocketHeight
    const x = width / 2;
    const y = height - 50 - rocketHeight;

    push();
    translate(x, y);

    // Flame
    push();
    fill(255, 150, 0);
    triangle(-15, 20, 15, 20, 0, flameLength);
    pop();

    // Rocket body
    push();
    fill(220);
    rectMode(CENTER);
    rect(0, 0, 40, 100);
    pop();

    // Nose cone
    push();
    fill(200, 30, 30);
    triangle(-20, -50, 20, -50, 0, -90);
    pop();

    // Window
    push();
    fill(100, 180, 220);
    circle(0, -20, 20);
    pop();

    // Fins
    push();
    fill(200, 30, 30);
    triangle(-20, 50, -20, 20, -35, 50);
    triangle(20, 50, 20, 20, 35, 50);
    pop();

    pop();
}
