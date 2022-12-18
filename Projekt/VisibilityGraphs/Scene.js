class Point {
  constructor(x, y, type = null) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.payload = [];
  }
  draw(size=0) {
    if (size == "green"){
      stroke("rgba(0,204,0, 0.7)");
      strokeWeight(15);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
      return
    }
    if (size == "blue"){
      stroke("rgba(0,0,204, 0.7)");
      strokeWeight(15);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
      return
    }
    if (this.type == "po") {
      stroke("rgb(0,204,0)");
      strokeWeight(15);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    } else if (this.type == "ko") {
      stroke("rgb(255,0,0)");
      strokeWeight(15);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    } else if (this.type == "la") {
      stroke("rgb(0,0,255)");
      strokeWeight(15);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    } else if (this.type == "dz") {
      stroke("rgb(0,112,121)");
      strokeWeight(15);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    } else if (this.type == "pr") {
      stroke("rgb(102,51,0)");
      strokeWeight(15);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    } else if (this.type == "stack") {
      stroke("rgb(255,0,0)");
      strokeWeight(25);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    } else if (this.type == "current") {
      stroke("#0032FF9E");
      strokeWeight(30);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    } else if (this.type == "test") {
      stroke("rgba(105,0,152,0.75)");
      strokeWeight(50);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    }else if (this.type == "stackcurrent") {
      stroke("rgb(255,0,0)");
      strokeWeight(25);
      point(this.x, this.y);
      stroke("rgba(105,0,152,0.75)");
      strokeWeight(50);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    } else if (this.type == "correct"){
      stroke("rgb(0,180,0)");
      strokeWeight(15);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    }
    else if (size != 0){
      stroke("rgb(255,0,0)");
      strokeWeight(size);
      point(this.x, this.y);
      stroke(default_stroke);
      strokeWeight(default_stroke_weight);
    }else{
      point(this.x, this.y);
    }
  }
  setType(t){
    this.type = t
  }
  toVertex() {
    vertex(this.x, this.y);
  }
  setPayload(payload){
    this.payload = payload
  }
  setIndex(index){
    this.payload[2] = index
  }
  getPayload(){
    return this.payload
  }
}


class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }
  draw() {
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}

class PointsCollection {
  constructor(obj) {
    if (!obj) {
      this.pointsArray = [];
      this.type = null;
    } else {
      obj && Object.assign(this, obj);
      for (let i = 0; i < this.pointsArray.length; i++) {
        this.tmp = this.pointsArray[i].payload
        this.pointsArray[i] = new Point(
          this.pointsArray[i].x,
          this.pointsArray[i].y,
          this.pointsArray[i].type
        );
        this.pointsArray[i].setPayload(this.tmp)
      }
    }
  }
  setType(t) {
    this.type = t;
  }
  getArray() {
    return this.pointsArray;
  }
  pushArray(array) {
    this.pointsArray = array;
  }
  push(p) {
    this.pointsArray.push(p);
  }


  draw(strokeW) {
    if (strokeW == "blue"){
      stroke("rgba(0,204,0, 0.7)");
      for (let i = 0; i < this.pointsArray.length; i++) {
        this.pointsArray[i].draw(strokeW);
      }
      return
    }
    strokeWeight(strokeW);
    stroke("rgb(255, 0, 0)")
    for (let i = 0; i < this.pointsArray.length; i++) {
      this.pointsArray[i].draw();
    }
    if (this.type == "monotonic") {
      if (this.pointsArray.length > 2) {
        stroke(0);
        strokeWeight(2);
        fill(255);
        text("Y-Monotonic", this.pointsArray[0].x, this.pointsArray[0].y + 15);
      }
    } else if (this.type == "not_monotonic") {
      stroke(0);
      strokeWeight(2);
      fill(255);
      text(
        "Not Y-Monotonic",
        this.pointsArray[0].x,
        this.pointsArray[0].y + 15
      );
    }
    strokeWeight(default_stroke_weight);
    stroke(default_stroke)
  }



  drawAsShape(strokeW) {
    strokeWeight(strokeW);
    // noStroke();
    beginShape();
    fill("#00F6FF8E");
    for (let i = 0; i < this.pointsArray.length; i++) {
      this.pointsArray[i].toVertex();
    }
    endShape(CLOSE);
  }
}




class LinesCollection {
  constructor(obj) {
    if (!obj) {
      this.linesArray = [];
      this.lineFirstPoint;
    } else {
      obj && Object.assign(this, obj);
      for (let i = 0; i < this.linesArray.length; i++) {
        this.linesArray[i] = new Line(
          new Point(this.linesArray[i].p1.x, this.linesArray[i].p1.y),
          new Point(this.linesArray[i].p2.x, this.linesArray[i].p2.y)
        );
      }
    }
  }
  contains(line) {
    for (let i = 0; i < this.linesArray.length; i++) {
      if (
        (this.linesArray[i].p1.x == line.p1.x &&
          this.linesArray[i].p1.y == line.p1.y &&
          this.linesArray[i].p2.x == line.p2.x &&
          this.linesArray[i].p2.y == line.p2.y) ||
        (this.linesArray[i].p1.x == line.p2.x &&
          this.linesArray[i].p1.y == line.p2.y &&
          this.linesArray[i].p2.x == line.p1.x &&
          this.linesArray[i].p2.y == line.p1.y)
      ) {
        return true;
      }
    }
    return false;
  }
  getArray() {
    return this.linesArray;
  }
  pushArray(array) {
    this.linesArray = array;
  }
  push(p1, p2) {
    this.linesArray.push(new Line(p1, p2));
  }
  pushByOnePoint(p1){
    this.lineFirstPoint;
    if (lineindex == 0){
      this.lineFirstPoint = p1
    }
    else{
      this.linesArray.push(new Line(this.lineFirstPoint, p1));
    }
  }
  addLC(addedLC){
    for (let i = 0; i < addedLC.getArray().length; i++){
      this.linesArray.push(addedLC.getArray()[i])
    }
  }



  draw(strokeW) {
    if (strokeW == "greenalpha"){
      strokeWeight(1);
      stroke("rgba(0,204,0, 0.7)")
      for (let i = 0; i < this.linesArray.length; i++) {
        this.linesArray[i].draw();
      }
    }else{
      strokeWeight(strokeW);
      for (let i = 0; i < this.linesArray.length; i++) {
        this.linesArray[i].draw();
      }
      strokeWeight(default_stroke_weight);
      stroke(default_stroke)
    }
    
  }
}


class Shape {
  constructor(obj) {
    if (!obj) {
      this.PC = new PointsCollection();
      this.LC = new LinesCollection();
      this.type = null;
      this.index = null;
    } else {
      obj && Object.assign(this, obj);
      this.PC = new PointsCollection(this.PC);
      this.LC = new LinesCollection(this.LC);
    }
  }
  setType(t) {
    this.type = t;
  }
  getPC() {
    return this.PC;
  }
  getLC() {
    return this.LC;
  }
  setIndex(index){
    this.index = index
  }
  pushPoint(p) {
    // console.log(this)
    if (this.PC.getArray().length == 0){
      p.setPayload([this.index, [null, null], null])
    }else{
      p.setPayload([this.index, [this.PC.getArray().length-1, this.PC.getArray().length], null])
      this.tmp = this.PC.getArray()[0].getPayload()
      this.PC.getArray()[0].setPayload([this.tmp[0], [this.PC.getArray().length, 0], this.tmp[2]])
    }
    this.PC.push(p)
    if (this.PC.getArray().length == 2){
      this.LC.push(this.PC.getArray()[0], this.PC.getArray()[1])
      this.LC.push(this.PC.getArray()[1], this.PC.getArray()[0])
    }else if (this.PC.getArray().length > 2){
      this.LC.getArray().pop()
      this.LC.push(this.PC.getArray()[this.PC.getArray().length-2], p)
      this.LC.push(p, this.PC.getArray()[0])
    }
  }
  


  draw(strokeW) {
    strokeWeight(strokeW);
    stroke("rgb(255, 0, 0)")
    this.PC.draw(strokeW+5)
    this.LC.draw(strokeW)
    strokeWeight(default_stroke_weight);
    stroke(default_stroke)
  }



  drawAsShape(strokeW) {
    strokeWeight(strokeW);
    stroke("rgb(255, 0, 0)")
    this.PC.draw(strokeW+5)
    this.LC.draw(strokeW)
    strokeWeight(default_stroke_weight);
    stroke(default_stroke)
    strokeWeight(strokeW);
    beginShape();
    fill("#00F6FF8E");
    for (let i = 0; i < this.PC.getArray().length; i++) {
      this.PC.getArray()[i].toVertex();
    }
    endShape(CLOSE);
  }
}




class Scene {
  constructor(obj) {
    if (!obj) {
      this.PC = [];
      this.LC = [];
      this.addedPC = [];
      this.addedLC = [];
      this.shapes = [];
      // console.log(this.addedPC);
    } else {
      obj && Object.assign(this, obj);
      for (let i = 0; i < this.PC.length; i++) {
        this.PC[i] = new PointsCollection(this.PC[i]);
      }
      for (let i = 0; i < this.LC.length; i++) {
        this.LC[i] = new LinesCollection(this.LC[i]);
      }
      for (let i = 0; i < this.addedPC.length; i++) {
        this.addedPC[i] = new PointsCollection(this.addedPC[i]);
      }
      for (let i = 0; i < this.addedLC.length; i++) {
        this.addedLC[i] = new LinesCollection(this.addedLC[i]);
      }
      for (let i = 0; i < this.shapes.length; i++) {
        this.shapes[i] = new Shape(this.shapes[i]);
      }
    }
    // console.log(obj)
  }
  clear() {
    this.PC = [];
    this.LC = [];
    this.addedPC = [];
    this.addedLC = [];
    this.shapes = [];
  }
  pushPC(pC) {
    this.PC.push(pC);
  }
  pushLC(lC) {
    this.LC.push(lC);
  }
  pushAddedPC(pC) {
    this.addedPC.push(pC);
  }
  pushAddedLC(lC) {
    this.addedLC.push(lC);
  }
  pushShapes(sh){
    this.shapes.push(sh);
  }
  getShapes(){
    return this.shapes;
  }
  getPC() {
    return this.PC;
  }
  getLC() {
    return this.LC;
  }
  getAddedPC() {
    return this.addedPC;
  }
  getAddedLC() {
    return this.addedLC;
  }
}
