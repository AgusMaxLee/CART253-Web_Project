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
let peekLeftImg, peekCenterImg, peekRightImg, peekBackImg;

// Light images (shown while shining the light during a peek)
let lightLeftImg, lightCenterImg, lightRightImg, lightBackImg;

// Shown briefly while switching between look and peek
let transitionImg;

// Footsteps while transitioning, the door opening once a peek
// begins, and the light switch toggling on/off
let stepsSound;
let doorSound;
let lightSound;

// Which overall mode we're in ("look", "transitioning", "peek", or
// "light"), and which direction we last clicked into
let mode = "look";
let direction = "center";

// Used while mode is "transitioning": where we're headed ("peek" or
// "look"), and how long we've been transitioning for
let transitionTarget = "";
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
    peekBackImg = await loadImage('assets/images/Peek_Back.png');

    lightLeftImg = await loadImage('assets/images/Light_Left.png');
    lightCenterImg = await loadImage('assets/images/Light_Center.png');
    lightRightImg = await loadImage('assets/images/Light_Right.png');
    lightBackImg = await loadImage('assets/images/Light_Back.png');

    transitionImg = await loadImage('assets/images/Transition.png');

    stepsSound = await loadSound('assets/sounds/Steps.mp3');
    doorSound = await loadSound('assets/sounds/Door_Open.mp3');
    lightSound = await loadSound('assets/sounds/Light.mp3');
}

/**
 * Draws whichever image matches the current mode and direction
 */
function draw() {
    if (mode === "look") {
        // "back" has no look image, so fall back to the centre one
        const hoverZone = getHoverDirection();
        direction = (hoverZone === "back") ? "center" : hoverZone;
        image(getLookImage(direction), 0, 0, width, height);
    } else if (mode === "transitioning") {
        image(transitionImg, 0, 0, width, height);
        transitionTimer++;
        if (transitionTimer >= transitionDuration) {
            mode = transitionTarget;
            transitionTimer = 0;

            // Arrived at a door (not the bottom "back" direction or
            // the centre one, since neither of those is a real door)
            if (mode === "peek" && direction !== "back" && direction !== "center") {
                doorSound.play();
            }
        }
    } else if (mode === "peek") {
        image(getPeekImage(direction), 0, 0, width, height);
    } else if (mode === "light") {
        image(getLightImage(direction), 0, 0, width, height);
    }
}

/**
 * Returns "left", "right", "center", or "back" based on where the
 * mouse is. The bottom strip of the screen is checked first, so it
 * takes priority over left/right in the corners
 */
function getHoverDirection() {
    const backHeight = 100;

    if (mouseY > height - backHeight) {
        return "back";
    } else if (mouseX < width / 3) {
        return "left";
    } else if (mouseX > width * 2 / 3) {
        return "right";
    } else {
        return "center";
    }
}

/**
 * Starts a transition toward the given mode ("peek" or "look"),
 * playing the footstep sound as we start walking
 */
function startTransition(target) {
    transitionTarget = target;
    mode = "transitioning";
    transitionTimer = 0;
    stepsSound.play();
}

/**
 * Handles a click depending on the current mode: enters a peek from
 * look, exits back to look from the bottom zone, or toggles the light
 */
function mousePressed() {
    const clickedZone = getHoverDirection();

    if (mode === "look") {
        direction = clickedZone;
        startTransition("peek");
    } else if (mode === "peek" || mode === "light") {
        if (clickedZone === "back") {
            startTransition("look");
        } else {
            mode = (mode === "peek") ? "light" : "peek";
            lightSound.play();
        }
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
    else if (dir === "back") return peekBackImg;
    else return peekCenterImg;
}

/**
 * Returns the light image for a given direction
 */
function getLightImage(dir) {
    if (dir === "left") return lightLeftImg;
    else if (dir === "right") return lightRightImg;
    else if (dir === "back") return lightBackImg;
    else return lightCenterImg;
}
