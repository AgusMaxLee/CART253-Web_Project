/**
 * Title of Project
 * Agustin Maximo Lee
 *
 * Description of this prototype goes here.
 */

"use strict";

// The player's position, size, and movement speed
let playerX = 300;
let playerY = 300;
const playerSize = 30;
const playerSpeed = 4;

// Every bullet currently on screen, and how often a new one spawns
let bullets = [];
let spawnTimer = 0;
const spawnInterval = 30;
const bulletSize = 20;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 600);
}

/**
 * Moves the player based on which arrow keys are held, then draws it
 */
function draw() {
    background(20);

    spawnBulletsOverTime();
    updateAndDrawBullets();

    movePlayer();
    drawPlayer();
}

/**
 * Adds a new bullet every spawnInterval frames
 */
function spawnBulletsOverTime() {
    spawnTimer++;

    if (spawnTimer >= spawnInterval) {
        bullets.push(createBullet());
        spawnTimer = 0;
    }
}

/**
 * Builds and returns a new bullet starting at a random edge of the
 * canvas, aimed generally toward the opposite side
 */
function createBullet() {
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
 * Moves every bullet, draws it, and removes any that have left the canvas
 */
function updateAndDrawBullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;

        if (isBulletOffScreen(bullet)) {
            bullets.splice(i, 1);
            continue;
        }

        push();
        noStroke();
        fill(230, 80, 80);
        circle(bullet.x, bullet.y, bulletSize);
        pop();
    }
}

/**
 * Returns true if the given bullet has moved past the canvas edges
 * by more than its own size (with a little margin)
 */
function isBulletOffScreen(bullet) {
    const margin = bulletSize;
    return bullet.x < -margin || bullet.x > width + margin ||
        bullet.y < -margin || bullet.y > height + margin;
}

/**
 * Checks which arrow keys are currently held down and moves the
 * player accordingly, keeping it on the canvas
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
 * Draws the player as a square
 */
function drawPlayer() {
    push();
    rectMode(CENTER);
    fill(80, 160, 240);
    rect(playerX, playerY, playerSize, playerSize);
    pop();
}
