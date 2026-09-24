/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
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
  fill:{
    r: 0,
    g: 0,
    b: 0,
  }
}

// Annoying bird
let bird ={
// Position and size
  x: 100,
  y: 200,
  size: 50,
  speedX: 2,
  speedY: 1.5,
  accelerationX: 0.01, 
  accelerationY: 0.01, 
  // Colour
  fill: {
    r: 0,
    g: 0,
    b: 0
  }
}
let img;

/**
 * Create the canvas
 */
async function setup() {
  createCanvas(400, 400);
  img = await loadImage('assets/images/images.jpg');
}

/**
 * Draw (and update) Mr. Furious
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

  // Draw Bird
  push();
  noStroke();
  fill(bird.fill.r, bird.fill.g, bird.fill.b);
  image(img, bird.x, bird.y, bird.size, bird.size);
  pop();
  drawBirdFlying();
  
  
}
// Bird Logic
function drawBirdFlying(){
  // Move bird
  bird.x += bird.speedX;
  bird.speedX = bird.speedX + bird.accelerationX;
  // bird.speedX = constrain(bird.speedX, -50, 50);

  bird.y += bird.speedY;
  bird.speedY = bird.speedY + bird.accelerationY;
  // bird.speedY = constrain(bird.speedY, -50, 50);
  
  // Bounce bird
  if (bird.x > 350|| bird.x < 0) {
    bird.speedX *= -1;
   bird.accelerationX *= -1;

  }

  if (bird.y > 350 || bird.y < 0) {
    bird.speedY *= -1;
   bird.accelerationY *= -1;

  }

}
