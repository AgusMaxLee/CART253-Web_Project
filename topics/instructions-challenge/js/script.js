/**
 * Minion
 * Name
 *
 * It is a minion.
 */

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draws the cat
 */
function draw() {
  // Pink background
  background(255, 180, 180);
  
  // No stroke everywhere!
  noStroke();
  
  drawCat();
}

/**
 * Draws the cat using functions
 */
function drawCat() {
  drawHead();
  drawEyes();
//   drawNose();
//   drawMouth();
}

/**
 * Draws the cat's head (including its ears)
 */
function drawHead() {
  
  // Minion head

  push();
  fill("yellow");
  circle(200, 200, 250);
  
  // Minion body

  fill("yellow");
  rect(75, 200, 250, 200);
  pop();
}

/**
 * Draws the minion's eye
 */
function drawEyes() {
     // goggles
  push();
  fill("black");
  rect(70, 170, 260, 40);
  pop();
    // goggles
  push();
  fill("#97978f");
  ellipse(200, 200, 160);
  pop();
    // eye
  push();
  fill(255);
  ellipse(200, 200, 120);
  fill(0);
  ellipse(200, 200, 50);
  pop();

}

// /**
//  * Draws the cat's nose
//  */
// function drawNose() {
//   // Cat nose
//   push();
//   fill(255, 100, 100);
//   triangle(190, 340, 210, 340, 200, 360);
//   pop();
// }

// /**
//  * Draws the cat's mouth
//  */
// function drawMouth() {
//   // Cat mouth
//   push();
//   strokeWeight(2);
//   stroke(255, 100, 100);
//   line(200, 360, 190, 370);
//   line(200, 360, 210, 370);
//   pop();
// }