/**
 * 3D Shape Generator
 * Agustin Maximo Lee
 *
 * An abstract scene of random 3D shapes, generated randomly.
 */

"use strict";

// How many shapes to generate
const numShapes = 15;
// The kinds of shapes that can be randomly picked
const shapeTypes = ["box", "sphere", "cone", "torus"];
let shapes = [];
// Background Color
let bgHue, bgSaturation, bgBrightness;

/**
 * Creates the canvas, sets up HSB colour mode, and generates random shapes.
 */
function setup() {
    createCanvas(640, 640, WEBGL);
    colorMode(HSB, 360, 100, 100);

    bgHue = random(0, 360);
    bgSaturation = random(30, 60);
    bgBrightness = random(10, 30);

    for (let i = 0; i < numShapes; i++) {
        shapes.push({
            x: random(-250, 250),
            y: random(-250, 250),
            z: random(-250, 250),
            size: random(20, 80),
            hue: random(0, 360),
            type: random(shapeTypes),
            spins: random() < 0.5,
            rotSpeed: random(-0.03, 0.03),
            moves: random() < 0.5,
            moveAmount: random(20, 60),
            moveSpeed: random(0.01, 0.05)
        });
    }
}

/**
 * Draws the background and every random shape in the shapes array
 */
function draw() {
    background(bgHue, bgSaturation, bgBrightness);

    for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];

        // If this shape moves, bob it up and down over time
        let y = s.y;
        if (s.moves) {
            y += sin(frameCount * s.moveSpeed) * s.moveAmount;
        }

        push();
        translate(s.x, y, s.z);

        // If this shape spins, rotate it a little more each frame
        if (s.spins) {
            rotateX(frameCount * s.rotSpeed);
            rotateY(frameCount * s.rotSpeed);
        }

        fill(s.hue, 80, 90);
        noStroke();

        // Draws the shape depending on the type 
        if (s.type === "box") {
            box(s.size);
        } else if (s.type === "sphere") {
            sphere(s.size / 2);
        } else if (s.type === "cone") {
            cone(s.size / 2, s.size);
        } else if (s.type === "torus") {
            torus(s.size / 2, s.size / 6);
        }

        pop();
    }
}
