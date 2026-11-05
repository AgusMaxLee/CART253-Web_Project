/**
 * Mr. Furious (and Friends)
 * Agustin Maximo Lee
 *
 * Mr. Furious gets angrier as the night sky turns to day, same as
 * before, but now there's a whole flock of birds pestering him
 * instead of just one.
 *
 * Based on the original "Mr. Furious" example by Pippin Barr, used
 * for the variables-challenge earlier in this course. The single
 * bird from that version has been replaced with an array of many
 * independent birds for this prototype.
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 150,
  // Mr. Furious anger management
  red_limit: 100,
  patience: 0.2,
  //Shake
  min_Shake: 200,
  max_Shake: 200,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  }
};

// Sky
let sky = {
  change_time: 0.2,
  fill: {
    r: 0,
    g: 0,
    b: 0,
  }
}

// How many birds to create, and the array that holds all of them
const numBirds = 10;
let birds = [];

let img;

/**
 * Create the canvas and a whole array of birds
 */
async function setup() {
  createCanvas(400, 400);
  img = await loadImage('assets/images/images.jpg');

  for (let i = 0; i < numBirds; i++) {
    birds.push(createBird());
  }
}

/**
 * Builds and returns one bird with a random starting position and speed
 */
function createBird() {
  return {
    x: random(0, 350),
    y: random(0, 350),
    size: random(30, 60),
    speedX: random(1, 3),
    speedY: random(1, 2),
    accelerationX: 0.01,
    accelerationY: 0.01
  };
}

/**
 * Draw (and update) Mr. Furious, the sky, and every bird
 */
function draw() {
  //Draw Sky
  background(sky.fill.r, sky.fill.g, sky.fill.b);

  // Change night to day
  // Gradually decrease green and blue only if they are above zero
  if (sky.fill.r < 178) sky.fill.g += sky.change_time;
  if (sky.fill.g < 255) sky.fill.g += sky.change_time;
  if (sky.fill.b < 255) sky.fill.b += sky.change_time;

  // Apply the updated color
  background(sky.fill.r, sky.fill.g, sky.fill.b);

  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();

  // Make Mr. Furious get red
  // Gradually decrease green and blue only if they are above zero
  if (mrFurious.fill.g > mrFurious.red_limit) mrFurious.fill.g -= mrFurious.patience;
  if (mrFurious.fill.b > mrFurious.red_limit) mrFurious.fill.b -= mrFurious.patience;

  // Apply the updated color
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);

  // Shake
  mrFurious.x = random(mrFurious.min_Shake, mrFurious.max_Shake);
  mrFurious.y = random(mrFurious.min_Shake, mrFurious.max_Shake);

  mrFurious.min_Shake = mrFurious.min_Shake - 0.008
  mrFurious.min_Shake = constrain(mrFurious.min_Shake, 150, 200);
  mrFurious.max_Shake = mrFurious.max_Shake + 0.008
  mrFurious.max_Shake = constrain(mrFurious.max_Shake, 200, 250);

  // Move and draw every bird in the array
  for (let i = 0; i < birds.length; i++) {
    updateAndDrawBird(birds[i]);
  }
}

/**
 * Moves one bird, bounces it off the canvas edges, and draws it
 */
function updateAndDrawBird(bird) {
  push();
  noStroke();
  image(img, bird.x, bird.y, bird.size, bird.size);
  pop();

  bird.x += bird.speedX;
  bird.speedX = bird.speedX + bird.accelerationX;

  bird.y += bird.speedY;
  bird.speedY = bird.speedY + bird.accelerationY;

  // Bounce bird
  if (bird.x > 350 || bird.x < 0) {
    bird.speedX *= -1;
    bird.accelerationX *= -1;
  }

  if (bird.y > 350 || bird.y < 0) {
    bird.speedY *= -1;
    bird.accelerationY *= -1;
  }
}
