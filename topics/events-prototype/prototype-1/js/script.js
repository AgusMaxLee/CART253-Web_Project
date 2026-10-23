/**
 * Title of Project
 * Author Name
 *
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// Which screen is currently showing
let gameState = "start";

// The background image
let bgImg;

// All the words that can appear
const words = ["noob", "loot", "spawn", "combo", "pixel", "quest", "boss",
    "glitch", "respawn", "nerf", "buff", "clutch", "camper", "lag", "level",
    "potion", "sprint", "critical", "achievement", "legendary"];

// How fast words fall, which word comes next, and how many have
// been successfully typed so far
let wordSpeed = 1;
let nextWordIndex = 0;
let wordsCompleted = 0;

// Three independent falling words, each with its own horizontal spot
let lane1 = { x: 100, word: "", y: 0, buffer: "", active: false };
let lane2 = { x: 250, word: "", y: 0, buffer: "", active: false };
let lane3 = { x: 400, word: "", y: 0, buffer: "", active: false };

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
async function setup() {
    createCanvas(500, 600);
    bgImg = await loadImage('assets/images/type_game_background.jpg');
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    image(bgImg, 0, 0, width, height);

    if (gameState === "start") {
        drawMessageScreen("Type Mania", "Click to Start");
    } else if (gameState === "playing") {
        updateAndDrawPlaying();
    } else if (gameState === "gameover") {
        drawMessageScreen("GAME OVER", "Click to Restart");
    } else if (gameState === "victory") {
        drawMessageScreen("VICTORY!", "Click to Restart");
    }
}

/**
 * Draws a big title and a smaller instruction line, centred on the canvas
 */
function drawMessageScreen(title, instruction) {
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text(title, width / 2, height / 2 - 20);
    textSize(20);
    text(instruction, width / 2, height / 2 + 30);
    pop();
}

/**
 * Updates and draws all three lanes
 */
function updateAndDrawPlaying() {
    push();
    fill(255);
    textAlign(LEFT, TOP);
    textSize(16);
    text("Typed " + wordsCompleted + " / " + words.length, 10, 10);
    pop();

    updateAndDrawLane(lane1);
    updateAndDrawLane(lane2);
    updateAndDrawLane(lane3);
}

/**
 * Moves one lane's word down (if it has one), draws it with the typed
 * part in green, and ends the game if it reaches the bottom
 */
function updateAndDrawLane(lane) {
    if (!lane.active) {
        return;
    }

    lane.y += wordSpeed;

    if (lane.y > height) {
        gameState = "gameover";
        return;
    }

    const matched = lane.word.substring(0, lane.buffer.length);
    const remaining = lane.word.substring(lane.buffer.length);

    push();
    textAlign(LEFT, CENTER);
    textSize(28);
    const startX = lane.x - textWidth(lane.word) / 2;

    fill(80, 220, 100);
    text(matched, startX, lane.y);

    fill(255);
    text(remaining, startX + textWidth(matched), lane.y);
    pop();
}

/**
 * Checks every character typed while playing against each active
 * lane, advancing whichever one it still matches
 */
function keyTyped() {
    if (gameState !== "playing") {
        return;
    }

    tryLetterOnLane(lane1, key);
    tryLetterOnLane(lane2, key);
    tryLetterOnLane(lane3, key);
}

/**
 * Tries adding one typed letter to one lane's progress
 */
function tryLetterOnLane(lane, letter) {
    if (!lane.active) {
        return;
    }

    const attempt = lane.buffer + letter;

    if (lane.word.toLowerCase().startsWith(attempt.toLowerCase())) {
        lane.buffer = attempt;

        if (lane.buffer.length === lane.word.length) {
            wordsCompleted++;
            wordSpeed += 0.05;

            if (wordsCompleted >= words.length) {
                gameState = "victory";
            } else {
                spawnLane(lane);
            }
        }
    } else {
        lane.buffer = "";
    }
}

/**
 * Clicking (re)starts the game whenever its not already in progress
 */
function mousePressed() {
    if (gameState !== "playing") {
        startGame();
    }
}

/**
 * Resets everything and begins a fresh run, seeding all 3 lanes
 */
function startGame() {
    wordSpeed = 1;
    nextWordIndex = 0;
    wordsCompleted = 0;

    spawnLane(lane1);
    spawnLane(lane2);
    spawnLane(lane3);

    gameState = "playing";
}

/**
 * Gives a lane the next word in the list and sends it back to the
 * top, or deactivates it if every word has already been handed out
 */
function spawnLane(lane) {
    if (nextWordIndex >= words.length) {
        lane.active = false;
        return;
    }

    lane.word = words[nextWordIndex];
    nextWordIndex++;
    lane.y = 20;
    lane.buffer = "";
    lane.active = true;
}
