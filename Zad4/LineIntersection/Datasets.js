function createDatasets(s, i = 0) {
  s.pushAddedPC(new PointsCollection());
  ile = 9;
  switch (i % ile) {
    case 0:
      radius = min(w, h) / 3;
      for (let i = 0; i < 100; i++) {
        angle = (i / 100) * 2 * PI;
        s.getAddedPC()[s.getAddedPC().length - 1].push(
          new Point(
            border + w / 2 + radius * Math.sin(angle),
            border + h / 2 + radius * Math.cos(angle)
          )
        );
      }
      break;
    case 1:
      radius = min(w, h) / 3;
      for (let i = 0; i < 50; i++) {
        angle = (i / 50) * 2 * PI;
        s.getAddedPC()[s.getAddedPC().length - 1].push(
          new Point(
            border + w / 2 + (radius / 2) * Math.sin(angle),
            border + h / 2 + radius * Math.cos(angle)
          )
        );
      }
      break;
    case 2:
      radius = min(w, h) / 5;
      for (let i = 0; i < 50; i++) {
        angle = -(i / 50) * PI;
        s.getAddedPC()[s.getAddedPC().length - 1].push(
          new Point(
            border +
              w / 2 +
              radius *
                (Math.cos(2 * angle) +
                  Math.cos(2 * angle) / 2 +
                  Math.sin(4 * angle) / 3),
            border +
              h / 2 +
              radius *
                (Math.sin(2 * angle) +
                  (0.35 * Math.sin(2 * angle)) / 2 +
                  Math.cos(6 * angle) / 3)
          )
        );
      }
      break;
    case 3:
      radius = min(w, h) / 5;
      s_angle = PI / 1.5;
      for (let i = 0; i < 50; i++) {
        angle = -(i / 50) * PI;
        s.getAddedPC()[s.getAddedPC().length - 1].push(
          new Point(
            border +
              w / 2 +
              radius *
                (Math.cos(2 * angle + s_angle) +
                  Math.cos(2 * angle + s_angle) / 2 +
                  Math.sin(6 * angle + s_angle) / 3),
            border +
              h / 2 -
              radius *
                (Math.sin(2 * angle) +
                  (0.35 * Math.sin(2 * angle)) / 2 +
                  Math.cos(2 * angle) / 3)
          )
        );
      }
      break;
    case 4:
      radius = min(w, h) / 3;
      for (let i = 0; i < 50; i++) {
        angle = (i / 100) * 2 * PI;
        s.getAddedPC()[s.getAddedPC().length - 1].push(
          new Point(
            border + w / 2 + radius * Math.sin(angle),
            border + h / 2 + radius * Math.cos(angle)
          )
        );
      }
      break;
    case 5:
      radius = min(w, h) / 3;
      for (let i = 0; i < 25; i++) {
        angle = (i / 50) * 2 * PI;
        s.getAddedPC()[s.getAddedPC().length - 1].push(
          new Point(
            border + w / 2 + (radius / 2) * Math.sin(angle),
            border + h / 2 + radius * Math.cos(angle)
          )
        );
      }
      break;
    case 6:
      radius = min(w, h) / 5;
      for (let i = 0; i < 25; i++) {
        angle = -(i / 50) * PI;
        s.getAddedPC()[s.getAddedPC().length - 1].push(
          new Point(
            border +
              w / 2 +
              radius *
                (Math.cos(2 * angle) +
                  Math.cos(2 * angle) / 2 +
                  Math.sin(4 * angle) / 3),
            border +
              h / 2 +
              radius *
                (Math.sin(2 * angle) +
                  (0.35 * Math.sin(2 * angle)) / 2 +
                  Math.cos(6 * angle) / 3)
          )
        );
      }
      break;
    case 7:
      radius = min(w, h) / 5;
      s_angle = PI / 1.5;
      for (let i = 0; i < 25; i++) {
        angle = -(i / 50) * PI;
        s.getAddedPC()[s.getAddedPC().length - 1].push(
          new Point(
            border +
              w / 2 +
              radius *
                (Math.cos(2 * angle + s_angle) +
                  Math.cos(2 * angle + s_angle) / 2 +
                  Math.sin(6 * angle + s_angle) / 3),
            border +
              h / 2 -
              radius *
                (Math.sin(2 * angle) +
                  (0.35 * Math.sin(2 * angle)) / 2 +
                  Math.cos(2 * angle) / 3)
          )
        );
      }
      break;
    case 8:
      radius = min(w, h) / 3;
      s_angle = 0;
      for (let i = 0; i < 50; i++) {
        angle = -(i / 50) * 2 * PI;
        s.getAddedPC()[s.getAddedPC().length - 1].push(
          new Point(
            border +
              w / 2 +
              radius *
                (Math.abs(Math.cos(angle + s_angle)) *
                  Math.cos(angle + s_angle) +
                  Math.abs(Math.sin(angle + s_angle)) *
                    Math.sin(angle + s_angle)),
            border +
              h / 2 -
              radius *
                (Math.abs(Math.cos(angle + s_angle)) *
                  Math.cos(angle + s_angle) -
                  Math.abs(Math.sin(angle + s_angle)) *
                    Math.sin(angle + s_angle))
          )
        );
      }
      break;
  }
}

function createDatasetLines(s, n){
  if (n >= w - 2*border - 4){
    return
  }
  s.pushAddedLC(new LinesCollection());
  for (let i = 0; i < n; i++) {
    a = Math.floor(Math.random() * (w - border)) + border-1
    b = Math.floor(Math.random() * (h - border)) + border-1
    c = Math.floor(Math.random() *(w - border)) + border-1
    while (a == c){
      c = Math.floor(Math.random() *( w - border)) + border-1
    }
    d = Math.floor(Math.random() * (h + border)) + border-1
    s.getAddedLC()[s.getAddedLC().length - 1].push(
      new Point(a, b), new Point(c, d))
  }
  arr = s.getAddedLC()[s.getAddedLC().length - 1].getArray()
  xs = []
  for (let i = 0; i < n; i++){
    while (xs.includes(s.getAddedLC()[s.getAddedLC().length - 1].getArray()[i].p1.x)){
      s.getAddedLC()[s.getAddedLC().length - 1].getArray()[i].p1.x = Math.floor(Math.random() * (w - border)) + border-1
    }
    xs.push(s.getAddedLC()[s.getAddedLC().length - 1].getArray()[i].p1.x)
  }

}
