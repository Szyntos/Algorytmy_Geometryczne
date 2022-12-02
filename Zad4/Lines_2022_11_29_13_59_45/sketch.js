let border = 30;
let default_stroke = 0;
let default_stroke_weight = 1;
let w = 600;
let h = 700;
let but_functions = 0;
let data = {};
let lineindex = 0;
function preload() {
  file = loadJSON("data/data.json");
  load = 1
}
function setup() {
  fr = 60;
  dddd = 0;
  sstep = 0;
  datasetCounter = 0;
  triangulationSwitch = 1;
  frameRate(fr);
  // noLoop()
  createCanvas(w, h);
  create_border(border, 1);
  button_add = createButton("Add_Points");
  button_add.position(0, height - border);
  button_add.mousePressed(addPoints);
  button_add.size(w / 10, border);
  button_add_lines = createButton("Add_Lines");
  button_add_lines.position((w / 10) * 1, height - border);
  button_add_lines.mousePressed(addLines);
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
  button_triangulationSwitch = createButton("Triangulate");
  button_triangulationSwitch.position((w / 10) * 8, height - border);
  button_triangulationSwitch.mousePressed(triangulationSwitch_function);
  button_triangulationSwitch.size(w / 10, border);
  button_step = createButton("stepplus");
  button_step.position((w / 10) * 9, height - border);
  button_step.mousePressed(stepplus);
  button_step.size(w / 10, border);
  textAlign(CENTER, CENTER);
  if (file&& load) {
    scene = new Scene(file);
  } else {
    scene = new Scene();
  }
  // scene = new Scene();
  // createDatasets(scene)
  reset_frame = -fr * 10000000;
}

function draw_scene(s) {
  // LineIntersection(new Line(new Point(900, 312), new Point(123, 500)), new Line(new Point(250, 600), new Point(500, 449)))
  // console.log(s.getAddedLC())
  for (let i = 0; i < s.getAddedPC().length; i++) {
    s.getAddedPC()[i].drawAsShape(2);
    classify_verticies(s.getAddedPC()[i]);
    is_y_monotonic(s.getAddedPC()[i]);
    // if (triangulationSwitch){
    //   if (triangulate(s.getAddedPC()[i], frameCount, 1, sstep)){
    //   triangulate(s.getAddedPC()[i], frameCount, 1, sstep).draw(2)
    // }
    // }

    s.getAddedPC()[i].draw(2);
  }
  for (let i = 0; i < s.getPC().length; i++) {
    if (sort_mouse_effect_active == 0) {
      s.getPC()[i].draw(10);
    }
  }
  for (let i = 0; i < s.getAddedLC().length; i++) {
    drawWhileAddingLines(s.getAddedLC())
    // console.log("aaaaleleujsafa")
    if (s.getAddedLC()[i].getArray().length > 1) {
      // CheckIntersectionsStupidWay(s.getAddedLC()[i])
      CheckIntersectionsSweep(s.getAddedLC()[i]);
    }

    s.getAddedLC()[i].draw(2);
  }
  for (let i = 0; i < s.getLC().length; i++) {
    s.getLC()[i].draw(1);
  }
}

function draw() {
  stroke(default_stroke);
  strokeWeight(default_stroke_weight);
  create_border(border, 0);
  draw_scene(scene);
  // text(frameCount, 100, 100);
  // sort_mouse_effect(scene)
}
