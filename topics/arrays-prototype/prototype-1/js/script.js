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

// How many birds there will eventually be, how often a new one
// appears, and the array that holds whichever ones exist so far
const numBirds = 10;
const spawnInterval = 90;
let spawnTimer = 0;
let birds = [];

let img;

/**
 * Create the canvas - birds get added one at a time instead of all at once
 */
async function setup() {
  createCanvas(400, 400);
  img = await loadImage('assets/images/images.jpg');
}

/**
 * Adds one new bird every spawnInterval frames, until there are numBirds
 */
function spawnBirdsOverTime() {
  if (birds.length >= numBirds) {
    return;
  }

  spawnTimer++;
  if (spawnTimer >= spawnInterval) {
    birds.push(createBird());
    spawnTimer = 0;
  }
}

/**
 * Draws a face on Mr. Furious that gets angrier-looking as
 * angerLevel goes from 0 (calm) to 1 (furious): the eyebrows tilt
 * into a scowl and the mouth flips from a smile into a frown
 */
function drawFace(angerLevel) {
  const leftEyeX = mrFurious.x - 25;
  const rightEyeX = mrFurious.x + 25;
  const eyeY = mrFurious.y - 20;

  // Eyes
  push();
  noStroke();
  fill(0);
  circle(leftEyeX, eyeY, 14);
  circle(rightEyeX, eyeY, 14);
  pop();

  // Eyebrows: flat when calm, angled into a V (furrowed) when angry
  const browY = eyeY - 15;
  const innerDrop = map(angerLevel, 0, 1, 0, 12);

  push();
  stroke(0);
  strokeWeight(4);
  line(leftEyeX - 12, browY, leftEyeX + 12, browY + innerDrop);
  line(rightEyeX + 12, browY, rightEyeX - 12, browY + innerDrop);
  pop();

  // Mouth: curves into a smile when calm, flips into a frown when
  // getting angry, then flies wide open into a scream once furious
  const mouthY = mrFurious.y + 35;

  if (angerLevel > 0.8) {
    // Final stage: wide open screaming mouth (a "D" shape: flat top
    // lip, rounded open jaw below), growing as he gets angrier
    const screamOpenness = map(angerLevel, 0.8, 1, 0, 1);
    push();
    noStroke();
    fill(0);
    arc(mrFurious.x, mouthY, 55, 30 + screamOpenness * 40, PI, TWO_PI, CHORD);
    pop();
  } else {
    const mouthCurve = map(angerLevel, 0, 0.8, 20, -20);
    push();
    noFill();
    stroke(0);
    strokeWeight(4);
    bezier(
      mrFurious.x - 30, mouthY,
      mrFurious.x - 15, mouthY + mouthCurve,
      mrFurious.x + 15, mouthY + mouthCurve,
      mrFurious.x + 30, mouthY
    );
    pop();
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

  // 0 = perfectly calm, 1 = as angry as he gets
  const angerLevel = constrain(map(mrFurious.fill.g, 225, mrFurious.red_limit, 0, 1), 0, 1);
  drawFace(angerLevel);

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

  // Add a new bird every so often, then move and draw all of them
  spawnBirdsOverTime();
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
