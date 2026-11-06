/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// how big the firing range is
const floorY = 150;
const laneWidth = 1000;
const laneLength = 3000;

// how far away the back wall is
const wallZ = -laneLength + 200;
const wallHeight = 600;

/**
 * makes the 3D canvas
 */
function setup() {
    createCanvas(800, 500, WEBGL);
}

/**
 * draws the floor, wall, and counter
 */
function draw() {
    background(30);

    camera(0, 0, 0, 0, 0, -300, 0, 1, 0);

    drawFloor();
    drawBackWall();
    drawCounter();
}

/**
 * the ground
 */
function drawFloor() {
    push();
    translate(0, floorY, -laneLength / 2 + 200);
    rotateX(HALF_PI);
    fill(90, 90, 80);
    noStroke();
    plane(laneWidth, laneLength);
    pop();
}

/**
 * the wall at the end of the lane
 */
function drawBackWall() {
    push();
    translate(0, floorY - wallHeight / 2, wallZ);
    fill(60, 60, 65);
    noStroke();
    plane(laneWidth, wallHeight);
    pop();
}

/**
 * a little counter/ledge in front, like a real range
 */
function drawCounter() {
    push();
    translate(0, floorY - 40, -150);
    fill(120, 90, 60);
    box(laneWidth, 80, 30);
    pop();
}
