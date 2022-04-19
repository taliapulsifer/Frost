// Frost and Perlin Noise
let maxLevel = 5;
let branches = 2;
let agl = Math.PI * 2 * 0.85
let xOff = 0.0;

function setup() {
  createCanvas(400, 400);
}
function draw() {
  translate(200, 200);
  background(0);
  // drawing in local space, after translation and rotation it is world space
  let hex1 = new Hex(200, 200, 2);
  let hex2 = new Hex(200, 200, 2);
  hex1.draw();
  push();
  stroke(255, 0, 0);
  strokeWeight(4);
  /*point(hex1.getPoint(0).x, hex1.getPoint(0).y);
  point(hex1.getPoint(2).x, hex1.getPoint(2).y);
  point(hex1.getPoint(4).x, hex1.getPoint(4).y);*/
  pop();
  push();
  //frostLine(0);
  scale(0.5, 0.5);
  //translate(200, 200);
  for(let j = 0; j < 6; j++){
    
    let x = hex1.getPoint(j).x;
    let y = hex1.getPoint(j).y;
    push();
    translate(x, y);
    rotate(j * (60 * PI)/ 180)
    frostLine(0);
    pop();
  }
  /*translate(-100, -200);
  for(let j = 0; j < 6; j++){
    
    let x = hex2.getPoint(j).x;
    let y = hex2.getPoint(j).y;
    push();
    translate(x, y);
    rotate(j * (60 * PI)/ 180)
    frostLine(0);
    pop();
  }*/
  pop();

}

  function frostLine(level){
    if (level > maxLevel){
      return
    }
    strokeWeight(1);
    

    for(let i = 0; i <= branches; i++){
      stroke(255);
      line(0, 0, 150, 0);

      push();
      translate(200 * i / (branches + 1), 0);
      scale(0.5, 0.5);

      push();
      rotate(angl(xOff));
      frostLine(level + 1);
      pop();

      push();
      rotate(-angl(xOff));
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
  function angl(xOff){
    xOff = xOff + 0.1;
    let n = noise(xOff) * width;
    return(n);
  }


