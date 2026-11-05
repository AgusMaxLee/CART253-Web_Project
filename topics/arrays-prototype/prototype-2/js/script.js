/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// Look images (shown while hovering, in "look" mode)
let lookLeftImg, lookCenterImg, lookRightImg;

// Peek images (shown after clicking into a direction)
let peekLeftImg, peekCenterImg, peekRightImg;

// Shown briefly while switching from look to peek
let transitionImg;

// Which overall mode we're in ("look", "transitioning", or "peek"),
// and which direction we last clicked into
let mode = "look";
let direction = "center";

// How long we've been transitioning for
let transitionTimer = 0;
const transitionDuration = 60;

/**
 * Creates the canvas and loads every image
 */
async function setup() {
    createCanvas(960, 540);

    lookLeftImg = await loadImage('assets/images/Look_Left.png');
    lookCenterImg = await loadImage('assets/images/Look_Center.png');
    lookRightImg = await loadImage('assets/images/Look_Right.png');

    peekLeftImg = await loadImage('assets/images/Peek_Left.png');
    peekCenterImg = await loadImage('assets/images/Peek_Center.png');
    peekRightImg = await loadImage('assets/images/Peek_Right.png');

    transitionImg = await loadImage('assets/images/Transition.png');
}

/**
 * Draws whichever image matches the current mode and direction
 */
function draw() {
    if (mode === "look") {
        direction = getHoverDirection();
        image(getLookImage(direction), 0, 0, width, height);
    } else if (mode === "transitioning") {
        image(transitionImg, 0, 0, width, height);
        transitionTimer++;
        if (transitionTimer >= transitionDuration) {
            mode = "peek";
            transitionTimer = 0;
        }
    } else if (mode === "peek") {
        image(getPeekImage(direction), 0, 0, width, height);
    }
}

/**
 * Returns "left", "right", or "center" based on where the mouse is
 */
function getHoverDirection() {
    if (mouseX < width / 3) {
        return "left";
    } else if (mouseX > width * 2 / 3) {
        return "right";
    } else {
        return "center";
    }
}

/**
 * Clicking while in look mode starts a transition into a peek
 */
function mousePressed() {
    if (mode === "look") {
        direction = getHoverDirection();
        mode = "transitioning";
        transitionTimer = 0;
    }
}

/**
 * Returns the look image for a given direction
 */
function getLookImage(dir) {
    if (dir === "left") return lookLeftImg;
    else if (dir === "right") return lookRightImg;
    else return lookCenterImg;
}

/**
 * Returns the peek image for a given direction
 */
function getPeekImage(dir) {
    if (dir === "left") return peekLeftImg;
    else if (dir === "right") return peekRightImg;
    else return peekCenterImg;
}
