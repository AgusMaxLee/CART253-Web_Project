/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// The gift box's position and size
let giftX = 200;
let giftY = 200;
let giftSize = 100;

// How squished the box currently is: 1 = normal size, smaller = squished
let giftScale = 1;

// What the gift revealed last time it was clicked (empty until first click)
let result = "";

// The sound that plays for each possible gift (no sound for the empty box)
let puppySound;
let socksSound;
let moneySound;
let bombSound;

/**
 * Creates the canvas and loads each gift's sound effect
 */
async function setup() {
    createCanvas(400, 400);

    puppySound = await loadSound('assets/sounds/bark.wav');
    socksSound = await loadSound('assets/sounds/bo-womp.mp3');
    moneySound = await loadSound('assets/sounds/money-soundfx.mp3');
    bombSound = await loadSound('assets/sounds/planting-c4-csgo.mp3');
}

/**
 * Draws the gift box and whatever it last revealed
 */
function draw() {
    background(220);

    // Ease the squish back to normal size each frame
    giftScale += (1 - giftScale) * 0.1;
    const displaySize = giftSize * giftScale;

    push();
    rectMode(CENTER);
    fill(200, 30, 60);
    rect(giftX, giftY, displaySize, displaySize);

    // Ribbon
    stroke(255, 210, 60);
    strokeWeight(8);
    line(giftX - displaySize / 2, giftY, giftX + displaySize / 2, giftY);
    line(giftX, giftY - displaySize / 2, giftX, giftY + displaySize / 2);
    pop();

    push();
    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(24);
    text(result, width / 2, 320);
    pop();
}

/**
 * Picks a random number and uses it to decide which of 5
 * possible gifts to reveal
 */
function mousePressed() {
    // Squish the box down; it eases back to normal size in draw()
    giftScale = 0.8;

    const pick = random(5);

    if (pick < 1) {
        result = "A puppy!";
        puppySound.play();
    } else if (pick < 2) {
        result = "Socks...";
        socksSound.play();
    } else if (pick < 3) {
        result = "A million dollars!";
        moneySound.play();
    } else if (pick < 4) {
        result = "An empty box.";
        // No sound - it's empty!
    } else {
        result = "A bomb!";
        bombSound.play();
    }
}
