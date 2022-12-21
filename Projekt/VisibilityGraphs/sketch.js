let border = 30;
let default_stroke = 0;
let default_stroke_weight = 1;
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
  fromPointIndex = 7;
  fromPointFromMouseSwitch = 0;
  computeGraphSwitch = 0;
  frameRate(fr);
  // noLoop()
  createCanvas(w, h);
  create_border(border, 1);
  button_add = createButton("nextPoint");
  button_add.position(0, height - border);
  button_add.mousePressed(nextFromPoint);
  button_add.size(w / 10, border);
  button_add_lines = createButton("PointMouse");
  button_add_lines.position((w / 10) * 1, height - border);
  button_add_lines.mousePressed(fromPointFromMouse);
  button_add_lines.size(w / 10, border);
  button_begin_shape = createButton("Add_Shape");
  button_begin_shape.position((w / 10) * 2, height - border);
  button_begin_shape.mousePressed(BegShape);
  button_begin_shape.size(w / 10, border);
  button_clear = createButton("Clear");
  button_clear.position((w / 10) * 3, height - border);
  button_clear.mousePressed(Clear);
  button_clear.size(w / 10, border);
  button_saveJS = createButton("Save_Json");
  button_saveJS.position((w / 10) * 4, height - border);
  button_saveJS.mousePressed(saveJson);
  button_saveJS.size(w / 10, border);
  button_loadJS = createFileInput(handleFile);
  button_loadJS.position((w / 10) * 5, height - border);
  button_loadJS.size(w / 10, border);
  button_resetAnim = createButton("Reset_Anim");
  button_resetAnim.position((w / 10) * 6, height - border);
  button_resetAnim.mousePressed(resetAnimation);
  button_resetAnim.size(w / 10, border);
  button_spawnDataset_and_clear = createButton("Spawn_dataset");
  button_spawnDataset_and_clear.position((w / 10) * 7, height - border);
  button_spawnDataset_and_clear.mousePressed(spawnDataset_and_clear);
  button_spawnDataset_and_clear.size(w / 10, border);
  textSize(20);
  button_SwitchIntCheck = createButton("SwitchIntCheck");
  button_SwitchIntCheck.position((w / 10) * 8, height - border);
  button_SwitchIntCheck.mousePressed(SwitchIntCheck);
  button_SwitchIntCheck.size(w / 10, border);
  button_step = createButton("stepplus");
  button_step.position((w / 10) * 9, height - border);
  button_step.mousePressed(stepplus);
  button_step.size(w / 10, border);
  button_animate = createButton("ByStep");
  button_animate.position((w / 10) * 10, height - border);
  button_animate.mousePressed(StepSwitch);
  button_animate.size(w / 10, border);
  button_VisGraph = createButton("ComputeVG");
  button_VisGraph.position((w / 10) * 11, height - border);
  button_VisGraph.mousePressed(computeGraph);
  button_VisGraph.size(w / 10, border);
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

  for (let i = 0; i < s.getAddedLC().length; i++) {
    drawWhileAddingLines(s.getAddedLC())
    s.getAddedLC()[i].draw(2);
  }


  for (let i = 0; i < s.getLC().length; i++) {
    s.getLC()[i].draw(1);
  }
  for (let i = 0; i < s.getShapes().length; i++) {
    s.getShapes()[i].drawAsShape(1)
  }
  if (s.getShapes().length){
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
      if (computeGraphSwitch == 1){
        if (s.getAddedLC().length > 0){
          s.getAddedLC()[0] = visibilityGraph(polygonsArray)
        }else{
          s.pushAddedLC(visibilityGraph(polygonsArray))
          // s.getAddedLC()[0].draw("greenalpha")
          
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
        VV = visibleVertices(s.getShapes(), fromPoint)
        VV[0].draw("blue")
        VV[1].draw("greenalpha")
      }
    }
    
    

  }
  
}

function draw() {
  stroke(default_stroke);
  strokeWeight(default_stroke_weight);
  create_border(border, 0);
  draw_scene(scene);
  text(sstep, 100, 100);
  text(str(mouseX) + ' ' + str(mouseY), 50, 50);
  // sort_mouse_effect(scene)
}
