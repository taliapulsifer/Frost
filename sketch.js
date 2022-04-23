// Frost and Perlin Noise
// global variables that are either final or need to be set once but available everywhere
let DesiredNumberOfSnowflakes = 2;
let MaxLevel = 3;
let Branches = 2;
let length = 100;
let MinSize = 0.1;
let MaxSize = 25;
let MaxSizeToGrow = 100;
let SnowFlakes = [];

function setup() {
  createCanvas(400, 400);
  frameRate(1);
  while (SnowFlakes.length < DesiredNumberOfSnowflakes){
    let newFlake = newSnowflake();
      let nearBySnowflakes = SnowFlakes.filter(function(flake){
        if (distance(flake.x, flake.y, newFlake.x, newFlake.y) < 200){
          return(flake.x, flake.y);
        }
    });
  }
  if (nearBySnowflakes.length == 0){
    SnowFlakes.push(newFlake);
  }
}
function newSnowflake(){
  return{
    x: random(100, width - 100),
    y : random(100, height - 100),
    z : random(0, 400),
    size : map((noise(random(0, 100))), 0, 1, MinSize, MaxSize),
    speed : random(0.1, 3)
  }
}
function draw() {
  background(0);
  // drawing in local space(using drawFrost function), after translation and rotation it is world space
  scale(0.5, 0.5); // scaling makes the image smaller, 0.5 makes it half of the size
  length += 10;
  SnowFlakes.forEach(seed => {
    // calling drawFrost, which uses the Hex class and calls frostLine
    drawFrost(seed.x, seed.y, seed.z);
  });
}
function drawFrost(x, y, seed) {
  let hex = new Hex(200, 200, 2);
  push();
  strokeWeight(2);
  stroke(255);
  translate(x, y);
  hex.draw();
  for (let j = 0; j < 6; j++) {

    let x = hex.getPoint(j).x;
    let y = hex.getPoint(j).y;
    push();
    translate(x, y);
    rotate(j * (60 * PI) / 180)
    frostLine(0, seed);
    pop();
  }
  pop();
}
// Using Perlin Noise to determine the angle that will be assigned to each particle
function branchAngle(x) {
  return noise(x) * width;
}
// Using Perlin Noise to determine the 'growing speed' of each piece of ice
function growthSpeed(){
  let noiseGrowth = noise(x, y);
  let growthValue = map(noiseGrowth, 0, 1, 2, 7);
  return(growthValue);
}
function frostLine(level, seed) {

  if (level > MaxLevel) {
    return
  }

  let agl = branchAngle(seed);
  for (let i = 0; i <= Branches; i++) {
    line(0, 0, length, 0);

    push();
    translate(length * i / (Branches + 1), 0);
    scale(0.5, 0.5);
    push();
    rotate(agl);
    frostLine(level + 1, agl);
    pop();
    push();
    rotate(-agl);
    frostLine(level + 1, -agl);
    pop();
    pop();

  }
}
function distance(x1, y1, x2, y2){
  return(sqrt[pow((x2 - x1), 2) + pow((y2 - y1), 2)]);
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
      x: this.points[index].x,
      y: this.points[index].y
    };
  }
}
