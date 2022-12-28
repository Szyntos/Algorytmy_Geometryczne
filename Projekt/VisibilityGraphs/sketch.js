let border = 30;
let default_stroke = "rgb(0, 0, 0)";
let default_stroke_weight = 1;
let default_fill = "rgb(0, 0, 0)";
let w = 1000;
let h = 1000;
let but_functions = 0;
let data = {};
let lineindex = 0;
function preload() {
  try {
    file = loadJSON("data/data.json");
    load = 1
  } catch (exceptionVar) {
    console.log("ERROR")
    console.log(exceptionVar)

    load = 0
  } 
  // load = 0
  
}
function setup() {
  
  sort_mouse_effect_active = 0
  fr = 60;
  dddd = 0;
  sstep = 0;
  shapeIndex = 0;
  datasetCounter = 0;
  triangulationSwitch = 1;
  IntersectionCheck = 1;
  stepbystep = 0;
  fromPointIndex = 9+6;
  fromPointFromMouseSwitch = 0;
  computeGraphSwitch = 0;
  stepbystepgraph = 0
  graphanimationswitch = 0;
  lastFrame = 0;
  graphsTimeCheck = 0;
  graphsstep = 0;
  frameRate(fr);
  // noLoop()
  createCanvas(w, h);
  create_border(border, 1);
  button_add = createButton("Następny Punkt");
  button_add.position(w / 10, height - border);
  button_add.mousePressed(nextFromPoint);
  button_add.size(w / 10, border+10);

  button_add_lines = createButton("Punkt z Myszki");
  button_add_lines.position((w / 10) * 2, height - border);
  button_add_lines.mousePressed(fromPointFromMouse);
  button_add_lines.size(w / 10, border+10);

  button_begin_shape = createButton("Dodaj Figurę");
  button_begin_shape.position((w / 10) * 0, height + 10);
  button_begin_shape.mousePressed(BegShape);
  button_begin_shape.size(w / 10, border+10);

  button_clear = createButton("Wyczyść Scenę");
  button_clear.position(0, height - border);
  button_clear.mousePressed(Clear);
  button_clear.size(w / 10, border+10);

  button_saveJS = createButton("Zapisz do Json");
  button_saveJS.position((w / 10) * 2, height + 10);
  button_saveJS.mousePressed(saveJson);
  button_saveJS.size(w / 10, border+10);

  button_loadJS = createFileInput(handleFile);
  button_loadJS.position((w / 10) * 3, height + 10);
  button_loadJS.size(w / 10, border+10);

  button_resetAnim = createButton("Reset Animacji");
  button_resetAnim.position((w / 10) * 4, height - border);
  button_resetAnim.mousePressed(resetAnimation);
  button_resetAnim.size(w / 10, border+10);

  button_animate = createButton("Animacja widoczneW.");
  button_animate.position((w / 10) * 3, height - border);
  button_animate.mousePressed(StepSwitch);
  button_animate.size(w / 10, border+10);

  button_SwitchIntCheck = createButton("Poprzedni Krok");
  button_SwitchIntCheck.position((w / 10) * 5, height - border);
  button_SwitchIntCheck.mousePressed(stepminus);
  button_SwitchIntCheck.size(w / 10, border+10);

  button_step = createButton("Następny Krok");
  button_step.position((w / 10) * 6, height - border);
  button_step.mousePressed(stepplus);
  button_step.size(w / 10, border+10);

  button_spawnDataset_and_clear = createButton("Animacja Grafu");
  button_spawnDataset_and_clear.position((w / 10) * 7, height - border);
  button_spawnDataset_and_clear.mousePressed(StepSwitchGraph);
  button_spawnDataset_and_clear.size(w / 10, border+10);

  button_VisGraph = createButton("Oblicz Graf Widoczności");
  button_VisGraph.position((w / 10) * 8, height - border);
  button_VisGraph.mousePressed(computeGraph);
  button_VisGraph.size(w / 10, border+10);

  button_VisGraph = createButton("Porównanie Czasu");
  button_VisGraph.position((w / 10) * 9, height - border);
  button_VisGraph.mousePressed(graphsTime);
  button_VisGraph.size(w / 10, border+10);

  button_VisGraph = createButton("Zapisz do txt");
  button_VisGraph.position((w / 10) * 5, height +10);
  button_VisGraph.mousePressed(saveToTXT);
  button_VisGraph.size(w / 10, border+10);

  button_loadTXT = createFileInput(handleFileTXT);
  button_loadTXT.position((w / 10) * 6, height + 10);
  button_loadTXT.size(w / 10, border+10);

  button_VisGraph = createButton("Zapisz Graf");
  button_VisGraph.position((w / 10) * 8, height + 10);
  button_VisGraph.mousePressed(saveGraph);
  button_VisGraph.size(w / 10, border+10);

  textSize(20);
  textAlign(CENTER, CENTER);
  if (file&& load) {
    scene = new Scene(file);
  } else {
    scene = new Scene();
  }
  // scene = new Scene();
  shapeIndex = scene.getShapes().length
  // scene = new Scene();
  // createDatasets(scene)
  reset_frame = -fr * 10000000;
}

function draw_scene(s) {
  // LineIntersection(new Line(new Point(900, 312), new Point(123, 500)), new Line(new Point(250, 600), new Point(500, 449)))
  // console.log(s.getAddedLC())
  for (let i = 0; i < s.getAddedPC().length; i++) {
    s.getAddedPC()[i].drawAsShape(2);


    s.getAddedPC()[i].draw(2);
  }
  for (let i = 0; i < s.getPC().length; i++) {
    if (sort_mouse_effect_active == 0) {
      s.getPC()[i].draw(10);
    }
  }

  


  for (let i = 0; i < s.getLC().length; i++) {
    s.getLC()[i].draw(1);
  }
  for (let i = 0; i < s.getShapes().length; i++) {
    s.getShapes()[i].drawAsShape(1)
  }
  if (s.getShapes().length){
    indexx = 0
    for (let j = 0; j < scene.getShapes().length; j++){
      polygon = scene.getShapes()[j]
      points = polygon.getPC().getArray()
      for (let i = 0; i < points.length; i++){
          tmp = points[i].getPayload()
          if (tmp.length < 4){
              tmp.push([null, indexx])
              points[i].setPayload(tmp)
          }else{
              tmp[3] = [tmp[3][0], indexx]
              points[i].setPayload(tmp)
          }
          indexx++
      }
    }
    polygonsArray = s.getShapes()
    

    allPointsFromShapesArray = []
      
    for (let i = 0; i < polygonsArray.length; i++){
        polygon = polygonsArray[i]
        if (polygon.getPC().getArray().length > 1){
            points = polygon.getPC().getArray()
            for (let j = 0; j < points.length; j++){
              allPointsFromShapesArray.push(points[j])

            }
          }  
      }
    if (allPointsFromShapesArray.length > 2){
      if (stepbystepgraph == 1){
        fromPoint = allPointsFromShapesArray[graphsstep % (allPointsFromShapesArray.length)]
        toAdd = visibleVertices(s.getShapes(), fromPoint)[1]
        if (lastFrame + 10 > frameCount){
          visibleVertices(s.getShapes(), fromPoint)[1].draw("GraphAnimation")
        }
        if (graphanimationswitch){
          lastFrame = frameCount;
          
          
          alreadyInScene = s.getAddedLC()
          alreadyInScene = alreadyInScene.concat(toAdd)
          s.replaceAddedLC(alreadyInScene)

          graphanimationswitch = 0
        }
        
      }else if (stepbystepgraph == 2){
        s.replaceAddedLC([])
        stepbystepgraph = 0;
      }else if (computeGraphSwitch == 1){
        graphStart = Date.now()
        if (s.getAddedLC().length > 0){
          s.getAddedLC()[0] = visibilityGraph(polygonsArray)
        }else{
          s.pushAddedLC(visibilityGraph(polygonsArray))
          // s.getAddedLC()[0].draw("greenalpha")
        }
        graphStop = Date.now()
        alert("Ilość połączeń w grafie widoczności: " + s.getAddedLC()[0].getArray().length/2)
        
        if (graphsTimeCheck){
          graphNaiveStart = Date.now()
          visibilityGraphNaive(polygonsArray)
          alert("Czas dzialania algorytmu: " + -(graphStart - graphStop)/1000 + " [s]\n" +
                "Czas dzialania algorytmu naiwnego: " + -(graphNaiveStart - Date.now())/1000 + " [s]")
          graphsTimeCheck = 0;
        }
        
        computeGraphSwitch++
      }else if (computeGraphSwitch == 0){
        if (s.getAddedLC().length > 0){
          s.getAddedLC()[0] = new LinesCollection();
        }
        
        if (fromPointFromMouseSwitch){
          fromPoint = new Point(mouseX, mouseY)
          fromPoint.setPayload([-1, [-2, -2], -3])
        }else{
          fromPoint = allPointsFromShapesArray[fromPointIndex % (allPointsFromShapesArray.length)]
        }
        if (fromPoint){
          fromPoint.draw("green")
        }
        if (stepbystep){
          VV = visibleVertices(s.getShapes(), fromPoint, 1, sstep)
        }else{
          VV = visibleVertices(s.getShapes(), fromPoint)
        }
        
        VV[0].draw("blue")
        VV[1].draw("greenalpha")
      }
    }
    
    

  }
  for (let i = 0; i < s.getAddedLC().length; i++) {
    drawWhileAddingLines(s.getAddedLC())
    if (s.getAddedLC()[i]){
      s.getAddedLC()[i].draw("greenalpha");
    }
    
  }
  
}

function draw() {
  stroke(default_stroke);
  strokeWeight(default_stroke_weight);
  if (but_functions == 2){
    create_border(border, 0,"rgb(130, 255, 130)");
  }else{
    create_border(border, 0);
  }
  draw_scene(scene);
  stroke(default_stroke);
  strokeWeight(default_stroke_weight);
  // text(sstep, 100, 100);
  shapeCount = 0;
  verticesCount = 0;
  for (let i = 0; i < scene.getShapes().length; i++){
    if (scene.getShapes()[i].getPC().getArray().length){
      shapeCount++;
      verticesCount = verticesCount + scene.getShapes()[i].getPC().getArray().length;
    }
  }
  text("Współrzędne myszki: X = " + str(mouseX) + ' Y = ' + str(mouseY) + "  Ilość Figur: " + shapeCount +
       "  Ilość wierzchołków: " + verticesCount + "  Krok Animacji: " + sstep, 450, 18);
  
  // sort_mouse_effect(scene)
}
