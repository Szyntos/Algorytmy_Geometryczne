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
