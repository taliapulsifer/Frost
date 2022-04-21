// Frost and Perlin Noise

// global variables that are either final or need to be set once but available everywhere
let maxLevel = 5;
let branches = 2;
let agl = Math.PI * 2 * 0.85
let xOff = 0.0;
let yOff = 0.0;
let zOff = 0.0;
let xStep = 0.01;
let yStep = 0.02;
function setup() {
  createCanvas(400, 400);
  frameRate(60);
}
function draw() {
  background(0);
  // drawing in local space(using drawFrost function), after translation and rotation it is world space
  //translate(200, 200); // intial translation moves to the center of the canvas
  scale(0.5, 0.5); // scaling makes the image smaller, 0.5 makes it half of the size
  drawFrost(3);// calling drawFrost, which uses the Hex class and calls frostLine
}
function drawFrost(int){
  for(let j = 0; j < int; j++){
    let hex = new Hex(200, 200, 2);
    push();
    translate(random(0, 400), random(0, 400));
    hex.draw();
    for(let j = 0; j < 6; j++){
  
      let x = hex.getPoint(j).x;
      let y = hex.getPoint(j).y;
      push();
      translate(x, y);
      rotate(j * (60 * PI)/ 180)
      frostLine(0);
      pop();
    }
    pop();
  }
}
  // Using Perlin Noise to determine the angle that will be assigned to each particle
  function angl(xOff){
    xOff = xOff + 0.1;
    let n = noise(xOff) * width;
    return(n);
  }

  function frostLine(level){
    let a = 100;
    if (level > maxLevel){
      return
    }
    strokeWeight(1);
    agl = angl(xOff);

    for(let i = 0; i <= branches; i++){
      stroke(255);
      line(0, 0, a, 0);
      push();
      translate(a * i / (branches + 1), 0);
      scale(0.5, 0.5);

      push();
      rotate(agl);
      frostLine(level + 1);
      pop();

      push();
      rotate(-agl);
      frostLine(level + 1);
      pop();

      pop();
      
    }
  }
//Making hexagons a class so that I can access the points
class Hex {
  constructor(x, y, radius) {
  this.points = new Array(6);
  this.x = x;
  this.y = y;
  //Create 6 points
  for (let i = 0; i < 6; ++i) {
  this.points[i] = {
  x: radius * cos((i * 60.0 * PI) / 180.0),
  y: radius * sin((i * 60.0 * PI) / 180.0),
  };
  }
  }
  // Drawing the Hex
   draw() {
  for (let i = 0; i < 6; ++i) {
  line(
  this.points[i].x,
  this.points[i].y,
  this.points[(i + 1) % 6].x,
  this.points[(i + 1) % 6].y
  );
  }
  }
  // get point so that I can access each point on the Hex
   getPoint(index) {
   return {
    x : this.points[index].x,
    y : this.points[index].y
    };
    }
  }




