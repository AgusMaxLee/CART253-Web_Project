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

/**
 * Creates the canvas, sets up HSB colour mode, and generates random shapes.
 */
function setup() {
    createCanvas(640, 640, WEBGL);
    colorMode(HSB, 360, 100, 100);

    for (let i = 0; i < numShapes; i++) {
        shapes.push({
            x: random(-250, 250),
            y: random(-250, 250),
            z: random(-250, 250),
            size: random(20, 80),
            hue: random(0, 360),
            type: random(shapeTypes)
        });
    }
}

/**
 * Draws the background and every random shape in the shapes array
 */
function draw() {
    background(0, 0, 10);

    for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        push();
        translate(s.x, s.y, s.z);
        fill(s.hue, 80, 90);
        noStroke();

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
