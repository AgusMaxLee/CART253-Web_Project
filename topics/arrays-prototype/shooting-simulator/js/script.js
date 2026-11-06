/**
 * Shooting Simulator
 * Agustin Maximo Lee
 *
 * A simple 3D firing range. Click to lock the mouse and look around,
 * then click again to shoot. Pop every target on the back wall.
 */

"use strict";

// The current look direction, built up from mouse movement while
// the pointer is locked
let yaw = 0;
let pitch = 0;
const lookSensitivity = 0.002;

// How big targets are, and the array holding all of them
const targetSize = 15;
const numTargets = 5;
let targets = [];

// How close the crosshair has to land to a target
const hitRadius = 8;

// How far below the camera the floor sits, and how wide the
// range's lane is
const floorY = 150;
const laneWidth = 1000;
const laneLength = 3000;

// How far ahead the back wall (and every target on it)
const wallZ = -laneLength + 200;
const wallHeight = 600;

// Shoot and hit sounds
let shootSound;
let hitSound;

/**
 * Creates a 3D canvas, a set of random targets, and loads the sounds
 */
async function setup() {
    createCanvas(800, 500, WEBGL).parent('game-container');

    for (let i = 0; i < numTargets; i++) {
        targets.push(createTarget());
    }

    shootSound = await loadSound('assets/sounds/shoot.mp3');
    hitSound = await loadSound('assets/sounds/hit.mp3');
}

/**
 * Builds and returns one target at a random spot on the wall's
 * surface
 */
function createTarget() {
    const halfLane = laneWidth / 2;
    const edgeMargin = targetSize * 2;

    return {
        x: random(-halfLane + edgeMargin, halfLane - edgeMargin),
        y: random(floorY - wallHeight + edgeMargin, floorY - edgeMargin),
        // Sits just in front of the wall, instead of at a random distance
        z: wallZ + 20
    };
}

/**
 * Points the camera based on the accumulated look direction
 */
function draw() {
    background(30);

    // How far left/right and up/down to look, based on the mouse
    const lookDistance = 300;
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
 * Draws a large flat plane below the camera
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
 * Draws a wall at the far end of the lane, standing on the floor
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
 * Draws a fixed counter/ledge directly in front of the starting
 * position
 */
function drawCounter() {
    push();
    translate(0, floorY - 40, -150);
    fill(120, 90, 60);
    box(laneWidth, 80, 30);
    pop();
}

/**
 * Draws one target as a sphere at its stored position
 */
function drawTarget(target) {
    push();
    translate(target.x, target.y, target.z);
    fill(230, 80, 80);
    sphere(targetSize);
    pop();
}

/**
 * Locks the mouse to the canvas on the first click, then every click
 * after that is a shot
 */
function mousePressed() {
    if (!document.pointerLockElement) {
        requestPointerLock();
    } else {
        shootSound.play();
        checkForHit();
    }
}

/**
 * Removes the target the crosshair is currently on, by
 * putting each target's 3D position onto the 2D (using
 * p5's own worldToScreen) and checking that against the
 * center point
 */
function checkForHit() {
    for (let i = targets.length - 1; i >= 0; i--) {
        const target = targets[i];
        const screenPos = worldToScreen(target.x, target.y, target.z);

        if (dist(screenPos.x, screenPos.y, width / 2, height / 2) < hitRadius) {
            targets.splice(i, 1);
            hitSound.play();
            break;
        }
    }
}

/**
 * While the pointer is locked, turns mouse movement into a change
 * in the look direction
 */
function mouseMoved() {
    yaw += movedX * lookSensitivity;
    pitch += movedY * lookSensitivity;
    pitch = constrain(pitch, -QUARTER_PI, QUARTER_PI);
}
