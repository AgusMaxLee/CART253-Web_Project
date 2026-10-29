/**
 * Mall Janitor Simulator
 * Agustin Maximo Lee
 *
 * You're a mall janitor picking up trash while dodging the people
 * walking by. Bump into one and you're fired! See how much trash
 * you collected before that happened.
 */

"use strict";

// The janitor's position, size, and movement speed
let playerX = 300;
let playerY = 300;
const playerSize = 90;
const playerSpeed = 4;

// Every person currently on screen, and how often a new one spawns
let people = [];
let spawnTimer = 0;
const spawnInterval = 30;
const personSize = 25;

// Which screen is currently showing
let gameState = "start";

// The current piece of trash, how many have been picked up, and its size
let trash;
let trashCollected = 0;
const trashSize = 60;

// The janitor, trash, mall floor, and person images
let janitorImg;
let trashImg;
let floorImg;
let personImg;

/**
 * Creates the canvas, loads the images, and places the first trash
 */
async function setup() {
    createCanvas(600, 600);
    imageMode(CENTER);
    textFont('Bangers');

    janitorImg = await loadImage('assets/images/Janitor.png');
    trashImg = await loadImage('assets/images/Trash.png');
    floorImg = await loadImage('assets/images/Mall_floor.jpg');
    personImg = await loadImage('assets/images/clown.png');

    trash = createTrash();
}

/**
 * Draws whichever screen matches the current game state
 */
function draw() {
    image(floorImg, width / 2, height / 2, width, height);

    // Darken the floor so the janitor, trash, and people stand out more
    push();
    fill(0, 100);
    noStroke();
    rect(0, 0, width, height);
    pop();

    if (gameState === "start") {
        drawMessageScreen("Mall Janitor Simulator", "Click to Start");
    } else if (gameState === "playing") {
        updateAndDrawPlaying();
    } else if (gameState === "gameover") {
        drawMessageScreen("YOU'RE FIRED!", "Trash Collected: " + trashCollected);
    }
}

/**
 * Moves the janitor, updates people and trash, and draws everything
 */
function updateAndDrawPlaying() {
    spawnPeopleOverTime();
    updateAndDrawPeople();
    checkPeopleCollisions();

    updateAndDrawTrash();

    movePlayer();
    drawPlayer();
}

/**
 * Draws a big title and a smaller instruction line, centred on the canvas
 */
function drawMessageScreen(title, instruction) {
    push();
    fill(0, 150);
    noStroke();
    rect(0, 0, width, height);
    pop();

    push();
    fill(255, 221, 0);
    textAlign(CENTER, CENTER);
    textSize(40);
    text(title, width / 2, height / 2 - 20);
    textSize(24);
    text(instruction, width / 2, height / 2 + 30);
    pop();
}

/**
 * Starts (or restarts) the game the moment the player clicks,
 * if its not already in progress
 */
function mousePressed() {
    if (gameState !== "playing") {
        startGame();
    }
}

/**
 * Resets everything and begins a new run
 */
function startGame() {
    playerX = width / 2;
    playerY = height / 2;
    people = [];
    spawnTimer = 0;
    trash = createTrash();
    trashCollected = 0;
    gameState = "playing";
}

/**
 * Builds and returns a new piece of trash at a random position
 */
function createTrash() {
    return { x: random(width), y: random(height) };
}

/**
 * Picks up the trash if the janitor is touching it (giving a new
 * one and increasing the count), then draws it
 */
function updateAndDrawTrash() {
    if (isColliding(playerX, playerY, playerSize, trash.x, trash.y, trashSize)) {
        trashCollected++;
        trash = createTrash();
    }

    image(trashImg, trash.x, trash.y, trashSize, trashSize);
}

/**
 * Fires the janitor if any person is currently touching them
 */
function checkPeopleCollisions() {
    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        if (isColliding(playerX, playerY, playerSize, person.x, person.y, personSize)) {
            gameState = "gameover";
            return;
        }
    }
}

/**
 * Returns true if two circular things are currently touching
 */
function isColliding(x1, y1, size1, x2, y2, size2) {
    const distance = dist(x1, y1, x2, y2);
    return distance < (size1 + size2) / 2;
}

/**
 * Adds a new person every spawnInterval frames
 */
function spawnPeopleOverTime() {
    spawnTimer++;

    if (spawnTimer >= spawnInterval) {
        people.push(createPerson());
        spawnTimer = 0;
    }
}

/**
 * Builds and returns a new person starting at a random edge of the
 * canvas, generally toward the opposite side
 */
function createPerson() {
    const edge = floor(random(4));
    const speed = random(2, 5);

    let x, y, vx, vy;

    if (edge === 0) {
        // Left edge, moving right
        x = 0;
        y = random(height);
        vx = speed;
        vy = random(-speed, speed);
    } else if (edge === 1) {
        // Right edge, moving left
        x = width;
        y = random(height);
        vx = -speed;
        vy = random(-speed, speed);
    } else if (edge === 2) {
        // Top edge, moving down
        x = random(width);
        y = 0;
        vx = random(-speed, speed);
        vy = speed;
    } else {
        // Bottom edge, moving up
        x = random(width);
        y = height;
        vx = random(-speed, speed);
        vy = -speed;
    }

    return { x: x, y: y, vx: vx, vy: vy };
}

/**
 * Moves every person, draws them, and removes any that have left the canvas
 */
function updateAndDrawPeople() {
    for (let i = people.length - 1; i >= 0; i--) {
        const person = people[i];
        person.x += person.vx;
        person.y += person.vy;

        if (isPersonOffScreen(person)) {
            people.splice(i, 1);
            continue;
        }

        image(personImg, person.x, person.y, personSize, personSize);
    }
}

/**
 * Returns true if the person has moved past the canvas edges
 * by more than their own size (with a little margin)
 */
function isPersonOffScreen(person) {
    const margin = personSize;
    return person.x < -margin || person.x > width + margin ||
        person.y < -margin || person.y > height + margin;
}

/**
 * Checks which arrow keys are pressed and moves the
 * janitor, keeping them on the canvas
 */
function movePlayer() {
    if (keyIsDown(LEFT_ARROW)) {
        playerX -= playerSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        playerX += playerSpeed;
    }
    if (keyIsDown(UP_ARROW)) {
        playerY -= playerSpeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        playerY += playerSpeed;
    }

    playerX = constrain(playerX, playerSize / 2, width - playerSize / 2);
    playerY = constrain(playerY, playerSize / 2, height - playerSize / 2);
}

/**
 * Draws the janitor
 */
function drawPlayer() {
    image(janitorImg, playerX, playerY, playerSize, playerSize);
}
