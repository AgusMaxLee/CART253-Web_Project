/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// The four directions, in a fixed order that matches every image array below
const directions = ["left", "center", "right", "back"];

// One array per set of images, each lined up with the directions
// array above (look has no "back" image, so it just repeats the
// centre one)
let lookImages = [];
let peekImages = [];
let lightImages = [];

// Shown briefly while switching between look and peek
let transitionImg;

// An array of screen regions, each one a clickable/hoverable zone
let zones = [];

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

    const lookCenterImg = await loadImage('assets/images/Look_Center.png');
    lookImages = [
        await loadImage('assets/images/Look_Left.png'),
        lookCenterImg,
        await loadImage('assets/images/Look_Right.png'),
        lookCenterImg
    ];

    peekImages = [
        await loadImage('assets/images/Peek_Left.png'),
        await loadImage('assets/images/Peek_Center.png'),
        await loadImage('assets/images/Peek_Right.png'),
        await loadImage('assets/images/Peek_Back.png')
    ];

    lightImages = [
        await loadImage('assets/images/Light_Left.png'),
        await loadImage('assets/images/Light_Center.png'),
        await loadImage('assets/images/Light_Right.png'),
        await loadImage('assets/images/Light_Back.png')
    ];

    transitionImg = await loadImage('assets/images/Transition.png');

    stepsSound = await loadSound('assets/sounds/Steps.mp3');
    doorSound = await loadSound('assets/sounds/Door_Open.mp3');
    lightSound = await loadSound('assets/sounds/Light.mp3');

    // The bottom strip is "back", checked first so it takes priority
    // over the left/right/center zones in the corners. Each one is a
    // rectangle: x, y is its top-left corner, w, h is its size
    const backHeight = 100;
    zones = [
        { name: "back", x: 0, y: height - backHeight, w: width, h: backHeight },
        { name: "left", x: 0, y: 0, w: width / 3, h: height - backHeight },
        { name: "right", x: width * 2 / 3, y: 0, w: width / 3, h: height - backHeight },
        { name: "center", x: width / 3, y: 0, w: width / 3, h: height - backHeight }
    ];
}

/**
 * Draws whichever image matches the current mode and direction
 */
function draw() {
    if (mode === "look") {
        // "back" has no look image, so fall back to the centre one
        const hoverZone = getZoneAt(mouseX, mouseY);
        direction = (hoverZone === "back") ? "center" : hoverZone;
        image(getImageForDirection(lookImages, direction), 0, 0, width, height);
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
        image(getImageForDirection(peekImages, direction), 0, 0, width, height);
    } else if (mode === "light") {
        image(getImageForDirection(lightImages, direction), 0, 0, width, height);
    }
}

/**
 * Returns the image for a given direction out of an images array,
 * using the directions array to line the two up
 */
function getImageForDirection(imagesArray, dir) {
    const index = directions.indexOf(dir);
    return imagesArray[index];
}

/**
 * Returns true if the point (px, py) overlaps the rectangle
 * described by x, y, w, h
 */
function isPointInRect(px, py, x, y, w, h) {
    return px >= x && px < x + w && py >= y && py < y + h;
}

/**
 * Returns the name of whichever zone overlaps the given point
 */
function getZoneAt(x, y) {
    for (let i = 0; i < zones.length; i++) {
        const zone = zones[i];
        if (isPointInRect(x, y, zone.x, zone.y, zone.w, zone.h)) {
            return zone.name;
        }
    }
    return "center";
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
    const clickedZone = getZoneAt(mouseX, mouseY);

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
