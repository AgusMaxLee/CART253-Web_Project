/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// ---- Character ----
let mrImpossible = {
    x: 400,
    y: 400,
    targetX: 400,
    targetY: 400,
    size: 30
};

// ---- Doors ----
const doorLength = 100;
const doorThickness = 10;
const wallY = 150;
const triggerDistance = 150;

let doors = [
    { hingeX: 150, hingeY: wallY, openness: 0 },
    { hingeX: 400, hingeY: wallY, openness: 0 },
    { hingeX: 650, hingeY: wallY, openness: 0 }
];

/**
 * Creates a larger canvas, to give Mr. Impossible some room to walk around
 */
function setup() {
    createCanvas(800, 500);
}

/**
 * Sends Mr. Impossible toward wherever was just clicked
 */
function mousePressed() {
    mrImpossible.targetX = mouseX;
    mrImpossible.targetY = mouseY;
}

function draw() {
    background(220);

    updateCharacter();
    updateDoors();

    drawWall();
    for (let i = 0; i < doors.length; i++) {
        drawDoor(doors[i]);
    }

    drawCharacter();
}

/**
 * Moves Mr. Impossible toward his target, staying on the canvas
 */
function updateCharacter() {
    mrImpossible.x += (mrImpossible.targetX - mrImpossible.x) * 0.05;
    mrImpossible.y += (mrImpossible.targetY - mrImpossible.y) * 0.05;

    mrImpossible.x = constrain(mrImpossible.x, mrImpossible.size / 2, width - mrImpossible.size / 2);
    mrImpossible.y = constrain(mrImpossible.y, mrImpossible.size / 2, height - mrImpossible.size / 2);
}

/**
 * Opens each door based on how close Mr. Impossible currently is to it
 */
function updateDoors() {
    for (let i = 0; i < doors.length; i++) {
        const door = doors[i];
        const d = dist(mrImpossible.x, mrImpossible.y, door.hingeX, door.hingeY);
        door.openness = constrain(map(d, 0, triggerDistance, 1, 0), 0, 1);
    }
}

/**
 * Draws a plain wall across the room (the doors sit on top of it)
 */
function drawWall() {
    push();
    stroke(100);
    strokeWeight(doorThickness);
    line(0, wallY, width, wallY);
    pop();
}

/**
 * Draws one door, rotated around its hinge based on its openness
 */
function drawDoor(door) {
    const angle = map(door.openness, 0, 1, 0, HALF_PI);

    push();
    translate(door.hingeX, door.hingeY);
    rotate(angle);
    rectMode(CORNER);
    noStroke();
    fill(120, 80, 50);
    rect(0, -doorThickness / 2, doorLength, doorThickness);
    pop();

    push();
    noStroke();
    fill(50);
    circle(door.hingeX, door.hingeY, 6);
    pop();
}

/**
 * Draws Mr. Impossible as a square, with eyes looking toward his target
 */
function drawCharacter() {
    push();
    rectMode(CENTER);
    fill(80, 120, 200);
    rect(mrImpossible.x, mrImpossible.y, mrImpossible.size, mrImpossible.size);
    pop();

    drawEyes();
}

/**
 * Draws two small dots that look toward Mr. Impossible's target
 */
function drawEyes() {
    const angle = atan2(mrImpossible.targetY - mrImpossible.y, mrImpossible.targetX - mrImpossible.x);
    const eyeDistance = mrImpossible.size * 0.2;
    const eyeSpacing = mrImpossible.size * 0.15;

    const frontX = mrImpossible.x + cos(angle) * eyeDistance;
    const frontY = mrImpossible.y + sin(angle) * eyeDistance;
    const sideX = -sin(angle) * eyeSpacing;
    const sideY = cos(angle) * eyeSpacing;

    push();
    noStroke();
    fill(0);
    circle(frontX + sideX, frontY + sideY, 6);
    circle(frontX - sideX, frontY - sideY, 6);
    pop();
}
