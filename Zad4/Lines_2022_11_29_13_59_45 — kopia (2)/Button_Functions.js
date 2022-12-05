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
    scene.pushAddedPC(new PointsCollection());
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

function resetAnimation() {
  reset_frame = frameCount;
  sstep = 0
}
function debug() {
  dddd = (dddd + 1) % 2;
}
function spawnDataset_and_clear() {
  Clear();

  createDatasets(scene, datasetCounter);
  datasetCounter++;
}
function triangulationSwitch_function() {
  triangulationSwitch = (triangulationSwitch + 1) % 2;
}
function stepplus() {
  sstep++;
}

function drawWhileAddingLines(LC_arr) {
  if (lineindex == 1) {
    l = new Line(
      LC_arr[LC_arr.length - 1].lineFirstPoint,
      new Point(mouseX, mouseY)
    );
    for (let i = 0; i < LC_arr.length; i++) {
      for (let k = 0; k < LC_arr[i].getArray().length; k++) {
        // console.log(s.getAddedLC()[i].getArray());
        LineIntersection(l, LC_arr[i].getArray()[k]);
      }
    }

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
          .getAddedPC()
          [scene.getAddedPC().length - 1].push(new Point(mouseX, mouseY));
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
          .getAddedLC()
          [scene.getAddedLC().length - 1].pushByOnePoint(
            new Point(mouseX, mouseY)
          );
        lineindex = (lineindex + 1) % 2;
        // console.log(scene)
      }
      break;
  }
}
