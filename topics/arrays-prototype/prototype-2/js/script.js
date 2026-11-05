/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// Look images (shown while hovering)
let lookLeftImg, lookCenterImg, lookRightImg;

/**
 * Creates the canvas and loads the three look images
 */
async function setup() {
    createCanvas(960, 540);

    lookLeftImg = await loadImage('assets/images/Look_Left.png');
    lookCenterImg = await loadImage('assets/images/Look_Center.png');
    lookRightImg = await loadImage('assets/images/Look_Right.png');
}

/**
 * Shows whichever look image matches where the mouse currently is
 */
function draw() {
    if (mouseX < width / 3) {
        image(lookLeftImg, 0, 0, width, height);
    } else if (mouseX > width * 2 / 3) {
        image(lookRightImg, 0, 0, width, height);
    } else {
        image(lookCenterImg, 0, 0, width, height);
    }
}
