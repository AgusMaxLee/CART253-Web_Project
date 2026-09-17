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
  background("lightblue");
  
  // No stroke everywhere!
  noStroke();
  
  drawMinion();
}

/**
 * Draws the cat using functions
 */
function drawMinion() {
    drawLandscape();
    drawHair();
    drawHead();
    drawEyes();
    drawMouth();
    drawClothes();
}

/**
 * Draws the minion's head (including its eyes, goggles and hair)
 */
function drawHead() {
  
  // Minion head

  push();
  fill("#FCE029");
  circle(200, 200, 250);
  
  // Minion body

  fill("#FCE029");
  rect(75, 200, 250, 200);
  pop();
}

/**
 * Draws the minion's eye
 */
function drawEyes() {
     // Goggle's band
  push();
  fill("black");
  rect(70, 170, 260, 40);
  pop();
    // Goggles
  push();
  fill("#97978f");
  ellipse(200, 200, 160);
  pop();
    // Eye
  push();
  fill(255);
  ellipse(200, 200, 120);
  fill(0);
  ellipse(200, 200, 50);
  pop();

}

/**
 * Draws the Minion's mouth
 */
function drawMouth() {
// Draw the mouth
  push();
  strokeWeight(7);
  stroke(0, 20, 0);
  noFill();
  angleMode(DEGREES);
  arc(200, 150, 200, 340, 65, 115);
  pop();
}

/**
 * Draws the Minion's hair
 */
function drawHair() {
    push();
    stroke('black');
    strokeWeight(5);
    line(200, 150, 150, 55);
    line(200, 150, 200, 40);
    line(200, 150, 250, 55);
    pop();
}

/**
 * Draws the minion's clothes
 */
function drawClothes() {
  // Minion's clothes
  push();
  fill("#0A75BC");
  rect(75, 350, 250, 50);
  pop();
}

/**
 * Draw the mountains and sun
 */

function drawLandscape() {
    //mountains
    push();
    fill("brown");
    rect(55, 300, 50, 100);
    pop();
    push();
    fill("green");
    triangle(0, 315, 100, 20, 200, 315);
    pop();

    //sun
    push();
    fill("yellow");
    circle(400, 15, 250);
}