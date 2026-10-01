/**
 * Mr. Impossible's House
 * Agustin Maximo Lee
 *
 * Mr. Impossible can be walked around a small house made of two walls
 * and five doors. Each door opens on its own as he gets close to it,
 * and the walls only let him through where an open doorway is.
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

// ---- Walls ----
// Each wall is a horizontal line from x1 to x2 at a given y
const wallThickness = 10;

let walls = [
    { y: 150, x1: 0, x2: 800 },
    { y: 350, x1: 0, x2: 800 }
];

// ---- Doors ----
// Each door is hinged on a specific wall (matched by its y)
const doorLength = 100;
const triggerDistance = 150;

let doors = [
    { hingeX: 150, hingeY: 150, openness: 0 },
    { hingeX: 400, hingeY: 150, openness: 0 },
    { hingeX: 650, hingeY: 150, openness: 0 },
    { hingeX: 250, hingeY: 350, openness: 0 },
    { hingeX: 550, hingeY: 350, openness: 0 }
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

    drawWalls();
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

    for (let i = 0; i < walls.length; i++) {
        blockAtWall(walls[i]);
    }
}

/**
 * If Mr. Impossible is at a solid part of this wall,
 * keeps him on whichever side of it he's already on
 */
function blockAtWall(wall) {

    if (isWallAt(mrImpossible.x, wall.y)) {
        const wallMargin = wallThickness / 2 + mrImpossible.size / 2;
        if (mrImpossible.y < wall.y) {
            mrImpossible.y = min(mrImpossible.y, wall.y - wallMargin);
        } else {
            mrImpossible.y = max(mrImpossible.y, wall.y + wallMargin);
        }
    }
}

/**
 * Checks whether the given x position, on the wall at the given y,
 * is solid wall (true) or inside one of that wall's doorway gaps (false)
 */
function isWallAt(x, wallYPosition) {
    for (let i = 0; i < doors.length; i++) {
        const door = doors[i];
        if (door.hingeY !== wallYPosition) {
            continue;
        }
        const withinDoorway = x > door.hingeX && x < door.hingeX + doorLength;
        if (withinDoorway) {
            return false;
        }
    }
    return true;
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
 * Draws both walls' solid segments directly, with the gaps for each
 * door typed in by hand (instead of calculating them from the doors array)
 */
function drawWalls() {
    push();
    stroke(100);
    strokeWeight(wallThickness);

    // Top wall (y = 150), with gaps for its doors at x = 150, 400, 650
    line(0, 150, 150, 150);
    line(250, 150, 400, 150);
    line(500, 150, 650, 150);
    line(750, 150, 800, 150);

    // Bottom wall (y = 350), with gaps for its doors at x = 250, 550
    line(0, 350, 250, 350);
    line(350, 350, 550, 350);
    line(650, 350, 800, 350);

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
    rect(0, -wallThickness / 2, doorLength, wallThickness);
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
