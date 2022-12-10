sort_mouse_effect_active = 0;
function sort_mouse_effect(s) {
  sort_mouse_effect_active = 1;
  PC = s.getPC()[0];
  LC = s.getLC()[0];

  stroke("rgb(0,0,0)");

  scalingF = 1;
  m_point = new Point(
    (mouseX - w / 2) * scalingF + w / 2,
    (mouseY - w / 2) * scalingF + w / 2
  );
  sorted_array = quickSort(PC.getArray(), 0, PC.getArray().length - 1, m_point);

  PC.pushArray(sorted_array);
  PC.draw(2);
  LC.pushArray(points_to_lines(PC.getArray()));
  strokeWeight(20);
  stroke("rgb(0,0,0)");
  LC.draw(1);
}
function create_points() {
  let PC = new PointsCollection();
  // for (let i = 0; i < 200; i++) {
  //   PC.push(new Point(border + Math.random() * w, border + Math.random() * h));
  // }
  n = 50;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      PC.push(
        new Point(
          border + w / (n + 1) / 2 + (i * w) / n,
          border + h / (n + 1) / 2 + (j * h) / n
        )
      );
    }
  }
  return PC;
}