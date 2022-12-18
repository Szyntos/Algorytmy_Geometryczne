function create_border(width_of_border, setup) {
  if (setup == 1) {
    resizeCanvas(width + 2 * width_of_border, height + 2 * width_of_border);
  }

  background(100);
  fill(255);

  rect(
    width_of_border,
    width_of_border,
    width - width_of_border * 2,
    height - width_of_border * 2
  );
}

function points_to_lines(array, loop=0) {
  lines = [];
  i = 0;
  while (i < array.length - 1) {
    lines.push(new Line(array[i], array[i + 1]));
    i++;
  }
  if (loop == 1){
    lines.push(new Line(array[0], array[array.length - 1]));
  }
  return lines;
}

function det(a, b, c, zeros = 0) {
  eps = 0.000000001;
  det_v = (a.x - c.x) * (b.y - c.y) - (b.x - c.x) * (a.y - c.y);
  if (0 - eps < det_v && det_v < 0 + eps) {
    if (zeros == 1) {
      return 0;
    }
    return (
      (a.x - c.x) ** 2 +
      (a.y - c.y) ** 2 -
      ((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
    );
  } else if (det_v < 0) {
    return -1;
  }
  return 1;
}

function quickSort_angle(items, left, right, m_point) {
  function swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
  function partition(items, left, right, m_point) {
    var pivot = items[Math.floor((right + left) / 2)],
      i = left,
      j = right;
    while (i <= j) {
      while (det(m_point, items[i], pivot) < 0) {
        i++;
      }
      while (det(m_point, items[j], pivot) > 0) {
        j--;
      }
      if (i <= j) {
        swap(items, i, j);
        i++;
        j--;
      }
    }
    return i;
  }
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, m_point);
    if (left < index - 1) {
      quickSort_angle(items, left, index - 1, m_point);
    }
    if (index < right) {
      quickSort_angle(items, index, right, m_point);
    }
  }
  return items;
}


function quickSort_y_indices(items, indices, left, right) {
  function swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
  function partition(items,indices, left, right) {
    var pivot = items[indices[Math.floor((right + left) / 2)]],
      i = left,
      j = right;
    while (i <= j) {
      while (items[indices[i]].y < pivot.y) {
        i++;
      }
      while (items[indices[j]].y > pivot.y) {
        j--;
      }
      if (i <= j) {
        swap(indices, i, j);
        i++;
        j--;
      }
    }
    return i;
  }
  var index;
  if (items.length > 1) {
    index = partition(items,indices, left, right);
    if (left < index - 1) {
      quickSort_y_indices(items,indices, left, index - 1);
    }
    if (index < right) {
      quickSort_y_indices(items,indices, index, right);
    }
  }
  return indices;
}