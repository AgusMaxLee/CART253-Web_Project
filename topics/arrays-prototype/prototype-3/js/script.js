/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// where we're looking, built from mouse movement
let yaw = 0;
let pitch = 0;
const lookSensitivity = 0.002;
const lookDistance = 300;

// the targets
const targetSize = 15;
const numTargets = 5;
let targets = [];

// how big the firing range is
const floorY = 150;
const laneWidth = 1000;
const laneLength = 3000;

// how far away the back wall is
const wallZ = -laneLength + 200;
const wallHeight = 600;

/**
 * makes the 3D canvas and spawns the targets
 */
function setup() {
    createCanvas(800, 500, WEBGL).parent('game-container');

    for (let i = 0; i < numTargets; i++) {
        targets.push(createTarget());
    }
}

/**
 * makes one target somewhere on the back wall
 */
function createTarget() {
    const halfLane = laneWidth / 2;
    const edgeMargin = targetSize * 2;

    return {
        x: random(-halfLane + edgeMargin, halfLane - edgeMargin),
        y: random(floorY - wallHeight + edgeMargin, floorY - edgeMargin),
        z: wallZ + 20
    };
}

/**
 * points the camera wherever we're looking, then draws everything
 */
function draw() {
    background(30);

    const lookX = sin(yaw) * cos(pitch) * lookDistance;
    const lookY = sin(pitch) * lookDistance;
    const lookZ = -cos(yaw) * cos(pitch) * lookDistance;

    camera(0, 0, 0, lookX, lookY, lookZ, 0, 1, 0);

    drawFloor();
    drawBackWall();
    drawCounter();

    for (let i = 0; i < targets.length; i++) {
        drawTarget(targets[i]);
    }
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

/**
 * draws one target
 */
function drawTarget(target) {
    push();
    translate(target.x, target.y, target.z);
    fill(230, 80, 80);
    sphere(targetSize);
    pop();
}

/**
 * clicking locks the mouse so we can look around
 */
function mousePressed() {
    requestPointerLock();
}

/**
 * turns mouse movement into looking around
 */
function mouseMoved() {
    yaw += movedX * lookSensitivity;
    pitch += movedY * lookSensitivity;
    pitch = constrain(pitch, -QUARTER_PI, QUARTER_PI);
}
