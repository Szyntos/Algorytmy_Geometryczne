function addPoints() {
  if (but_functions == 1) {
    but_functions = 0;
  } else {
    if (scene.getPC().length < 1) {
      scene.pushPC(new PointsCollection());
    }
    but_functions = 1;
  }
}

function BegShape() {
  if (but_functions == 2) {
    but_functions = 0;
  } else {
    scene.pushShapes(new Shape());
    shapeIndex = scene.getShapes().length
    scene.getShapes()[scene.getShapes().length-1].setIndex(shapeIndex-1)
    but_functions = 2;
  }
}

function addLines() {
  if (but_functions == 3) {
    but_functions = 0;
  } else {
    lineindex = 0;
    scene.pushAddedLC(new LinesCollection());
    but_functions = 3;
  }
}

function Clear() {
  scene.clear();
  but_functions = 0;
}

function loadJson() {
  scene.clear();
  but_functions = 0;
}

function saveJson() {
  saveJSON(scene, "data.json");
}

function handleFile(file) {
  scene = new Scene(file.data);
}
function handleFileTXT(file) {
  // console.log(file.data)
  different = file.data.split(";")
  differentShapes = []
  differentShapesPoints = []
  for (let i = 0; i < different.length; i++){
    if (different[i].trim().length > 2){
      differentShapes.push(different[i].trim())
      differentShapesPoints.push([])
    }
  }
  for (let i = 0; i < differentShapes.length; i++){
    points = differentShapes[i].split(",")
    for (let j = 0; j < points.length; j++){
      points[j] = points[j].trim()
    }
    differentShapesPoints[i] = points
  }
  scene = new Scene();
  for (let i = 0; i < differentShapesPoints.length; i++){
    scene.pushShapes(new Shape());
    shapeIndex = scene.getShapes().length
    scene.getShapes()[scene.getShapes().length-1].setIndex(shapeIndex-1)
    for (let j = 0; j < differentShapesPoints[i].length; j++){
      points = differentShapesPoints[i][j].split(" ")
      scene
          .getShapes()[scene.getShapes().length - 1].pushPoint(new Point(points[0], points[1]));
    }
  }
  
}
function saveToTXT(){
  const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
    URL.revokeObjectURL(a.href);
  };

  s = ""
  shapes = scene.getShapes()
  for (let i = 0; i < shapes.length; i++){
    shape = shapes[i]
    for (let j = 0; j < shape.getPC().getArray().length; j++){
      pointT = shape.getPC().getArray()[j]
      s = s + str(pointT.x) + " " + str(pointT.y)
      if (j != shape.getPC().getArray().length-1){
        s = s + ","
      }else{
        s = s + ";\n"
      }
      s = s + "\n"
    }
  }
  downloadToFile(s, "data.txt", "txt")
}

function resetAnimation() {
  reset_frame = frameCount;
  sstep = 0
}

function nextFromPoint() {
  fromPointIndex++;
}

function fromPointFromMouse() {
  fromPointFromMouseSwitch = (fromPointFromMouseSwitch + 1) % 2;
}

function computeGraph() {
  computeGraphSwitch = (computeGraphSwitch + 1)%3
}

function debug() {
  dddd = (dddd + 1) % 2;
}

function spawnDataset_and_clear() {
  Clear();
  a = window.prompt("Podaj ilosc linii", "Ilosc linii");
  a = int(a)
  createDatasetLines(scene, a);
  datasetCounter++;
}

function triangulationSwitch_function() {
  triangulationSwitch = (triangulationSwitch + 1) % 2;
}

function SwitchIntCheck() {
  IntersectionCheck = (IntersectionCheck + 1) % 2
}

function StepSwitch() {
  stepbystep = (stepbystep + 1) % 2
}
function StepSwitchGraph() {
  stepbystepgraph = (stepbystepgraph + 1) % 3
}

function stepplus() {
  sstep++;
  graphsstep++;
  graphanimationswitch = 1
}
function stepminus() {
  sstep--;
}

function graphsTime() {
  computeGraphSwitch = (computeGraphSwitch + 1)%3
  graphsTimeCheck++;
}

function saveGraph() {
  const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
    URL.revokeObjectURL(a.href);
  };

  s = ""
  shapes = scene.getShapes()
  for (let i = 0; i < shapes.length; i++){
    shape = shapes[i]
    for (let j = 0; j < shape.getPC().getArray().length; j++){
      pointT = shape.getPC().getArray()[j]
      s = s + str(pointT.x) + " " + str(pointT.y)
      if (j != shape.getPC().getArray().length-1){
        s = s + ","
      }else{
        s = s + ";\n"
      }
      s = s + "\n"
    }
  }
  s = s + "\n\n\n\n"

  polygonsArray = scene.getShapes()
  VG = visibilityGraph(polygonsArray).getArray()
  // console.log(VG)
  for (let i = 0; i < VG.length; i++){
    s = s + VG[i].p1.payload[3][1] + " " + VG[i].p2.payload[3][1] + "\n"
  }

  downloadToFile(s, "VisibilityGraph.txt", "txt")
}

function drawWhileAddingLines(LC_arr) {
  if (lineindex == 1) {
    l = new Line(
      LC_arr[LC_arr.length - 1].lineFirstPoint,
      new Point(mouseX, mouseY)
    );
    // for (let i = 0; i < LC_arr.length; i++) {
    //   for (let k = 0; k < LC_arr[i].getArray().length; k++) {
    //     // console.log(s.getAddedLC()[i].getArray());
    //     LineIntersection(l, LC_arr[i].getArray()[k]);
    //   }
    // }

    l.draw(2);
  }
}

function mouseClicked() {
  // console.log(but_functions);
  switch (but_functions) {
    case 0:
      break;
    case 1:
      if (
        mouseX > border &&
        mouseX < w + border &&
        mouseY > border &&
        mouseY < h + border
      ) {
        scene.getPC()[scene.getPC().length - 1].push(new Point(mouseX, mouseY));
      }
      break;
    case 2:
      if (
        mouseX > border &&
        mouseX < w + border &&
        mouseY > border &&
        mouseY < h + border
      ) {
        scene
          .getShapes()[scene.getShapes().length - 1].pushPoint(new Point(mouseX, mouseY));
        // console.log("pushed")
      }
      break;
    case 3:
      if (
        mouseX > border &&
        mouseX < w + border &&
        mouseY > border &&
        mouseY < h + border
      ) {
        // console.log(lineindex);
        scene
          .getAddedLC()[scene.getAddedLC().length - 1].pushByOnePoint(
            new Point(mouseX, mouseY)
          );
        lineindex = (lineindex + 1) % 2;
        // console.log(scene)
      }
      break;
  }
}