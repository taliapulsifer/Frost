// Frost and Perlin Noise
let maxLevel = 5;
let branches = 2;
let agl = Math.PI * 2 * 0.85

function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  // drawing in local space, after translation and rotation it is world space
  translate(100, 100);
  let hex1 = new Hex(200, 200, 6);
  hex1.draw();
  push();
  stroke(255, 0, 0);
  strokeWeight(4);
  point(hex1.getPoint(0).x, hex1.getPoint(0).y);
  point(hex1.getPoint(2).x, hex1.getPoint(2).y);
  point(hex1.getPoint(4).x, hex1.getPoint(4).y);
  pop();
  for(let j = 0; j < 6; j++){

    let x = hex1.getPoint(j).x;
    let y = hex1.getPoint(j).y;
    frostLine(0, x, y);
    rotate((60 * PI)/ 180)

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
   getPoint(index) {
   return {
    x : this.points[index].x,
    y : this.points[index].y
    };
    }
  }
  
  function frostLine(level, x, y){
    /*while(x < width && x > 0){
      while(y > 0 && y < height){

      }
    }*/
    if (level > maxLevel){
      return
    }
    strokeWeight(1);
    line(x, y, 150, 0);
    for(let i = 0; i < branches; i++){
      push();
      translate(200 * 1 / (branches + 1), y);
      scale(0.5, 0.5);
      push();
      rotate(agl);
      frostLine(level + 1);
      pop();
      push();
      frostLine(level + 1);
      pop();
      pop();
    }
  }

function angle(){
  let noiseValue = noise(20, 40);
  let angle = map(noiseValue, 0, 1, 0, 60);
  return angle;
}
function frost(Hex){
  let p;
  let x;
  let y;
  while(x < width && x > 0){
    // Setting barriers so that the frost does not go off of the given canvas
    while(y < height && x > 0){
      // create a random number and truncate the decimal to choose which option
      // to add on
      let rand = int(random(0, 3));
      for(let i = 0; i < 6; i ++){
        p = Hex.getPoint(i);
        x = p.x;
        y = p.y;
        commands(rand, x, y);
      }
    }
  }
  
}
function commands(int, x, y){
  if(int == 0){
    // draw a single line segment from start point out by 1
    line(x , y, x - 1, y - 1);
  }
  else if (int == 1){
    // draw a y shape from start point, set new start point to point
    // at which the line splits
    line(x, y, x - 1, y - 1);
    push();
    rotate(45)
    line(x - 1, y - 1, x - 2, y - 2);
    rotate(-90);
    line(x - 1, y - 1, x - 2, y - 2);
    pop();
  }
  else if (int == 2){
    // draw 7 shape, set the new start point to the point at which the
    // line branches off
    line(x, y, x - 1, y - 1);
    push();
    rotate(45)
    line(x - 1, y - 1, x - 2, y - 2);
    pop();
  }
  else{
    // draw two lines / double the length of the one line (2)
    line(x , y, x - 2, y - 2);
  }
}
