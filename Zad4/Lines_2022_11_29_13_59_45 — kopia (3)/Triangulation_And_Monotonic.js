function classify_verticies(PC) {
  for (let i = 0; i < PC.getArray().length; i++) {
    a = PC.getArray()[i % PC.getArray().length];
    b = PC.getArray()[(i + 1) % PC.getArray().length];
    c = PC.getArray()[(i + 2) % PC.getArray().length];
    if (det(a, b, c) == 1) {
      if (a.y < b.y && c.y < b.y) {
        b.type = "ko";
      } else if (a.y > b.y && c.y > b.y) {
        b.type = "po";
      } else {
        b.type = "pr";
      }
    } else if (det(a, b, c) == -1) {
      if (a.y < b.y && c.y < b.y) {
        b.type = "la";
      } else if (a.y > b.y && c.y > b.y) {
        b.type = "dz";
      } else {
        b.type = "pr";
      }
    } else {
      b.type = "pr";
    }
  }
}

function is_y_monotonic(PC) {
  for (let i = 0; i < PC.getArray().length; i++) {
    if (PC.getArray()[i].type == "la" || PC.getArray()[i].type == "dz") {
      PC.setType("not_monotonic");
      return false;
    }
  }
  // if (PC.getArray().length > 2) {
  //   a = PC.getArray()[PC.getArray().length - 1];
  //   b = PC.getArray()[0];
  //   for (let i = 0; i < PC.getArray().length; i++) {
  //     if (det(a, b, PC.getArray()[i]) < 0) {
  //       if (
  //         (a.y < PC.getArray()[i].y && b.y > PC.getArray()[i].y) ||
  //         (a.y > PC.getArray()[i].y && b.y < PC.getArray()[i].y)
  //       ) {
  //         PC.setType("not_monotonic");
  //         return false;
  //       }
  //     }
  //   }
  // }

  PC.setType("monotonic");

  return true;
}

function what_chain(i) {
  if (right.includes(i)) {
    if (left.includes(i)) {
      return "b";
    }
    return "r";
  }
  return "l";
}

function triangulate(PC, frame, animation = 1, step = 0) {
  // step = 0;
  time = fr;
  LC = new LinesCollection();
  LC.pushArray(points_to_lines(PC.getArray(), 1));
  points = PC.getArray();
  if (points.length < 3 || PC.type != "monotonic") {
    return;
  }
  min_point = points.reduce((acc, val) => {
    return acc.y > val.y ? acc : val;
  });
  max_point = points.reduce((acc, val) => {
    return acc.y < val.y ? acc : val;
  });
  start = 0;
  stop = 0;
  indices = [];
  for (let i = 0; i < points.length; i++) {
    if (min_point == points[i]) {
      start = i;
      break;
    }
  }
  for (let i = 0; i < points.length; i++) {
    indices.push(i);
    if (max_point == points[i]) {
      stop = i;
    }
  }
  right = [];
  left = [];
  flag = 0;
  for (let i = start; i < points.length + start; i++) {
    if (i % points.length == stop) {
      right.push(i % points.length);
      left.push(start);
      flag = 1;
    }
    if (flag == 0) {
      right.push(i % points.length);
    } else {
      left.push(i % points.length);
    }
  }
  quickSort_y_indices(points, indices, 0, indices.length - 1);
  stroke(0);
  strokeWeight(2);
  fill(255);
  for (let i = 0; i < indices.length; i++) {
    text(i, points[indices[i]].x, points[indices[i]].y + 15);
  }

  stack = [];
  stack.push(indices[0]);
  stack.push(indices[1]);
  for (let i = 2; i < indices.length; i++) {
    step++;
    if (frame - reset_frame < time * step && animation) {
      for (let k = 0; k < stack.length; k++) {
        tmp = points[stack[k]].type;
        points[stack[k]].type = "stack";
        points[stack[k]].draw();
        points[stack[k]].type = tmp;
      }
      LC.draw(2);
      return;
    }
    c = indices[i];
    if (
      ((what_chain(c) == "r" || what_chain(c) == "b") &&
        (what_chain(stack[stack.length - 1]) == "l" ||
          what_chain(stack[stack.length - 1]) == "b")) ||
      ((what_chain(c) == "l" || what_chain(c) == "b") &&
        (what_chain(stack[stack.length - 1]) == "r" ||
          what_chain(stack[stack.length - 1]) == "b"))
    ) {
      for (let j = 0; j < stack.length; j++) {
        if (!LC.contains(new Line(points[c], points[stack[j]]))) {
          LC.push(points[c], points[stack[j]]);
        }
        step++;
        if (frame - reset_frame < time * step && animation) {
          for (let k = 0; k < stack.length; k++) {
            tmp = points[stack[k]].type;
            points[stack[k]].type = "stack";
            points[stack[k]].draw();
            points[stack[k]].type = tmp;
          }
          tmp = points[c].type;
          points[c].type = "current";
          points[c].draw();
          points[c].type = tmp;
          tmp = points[stack[j]].type;
          points[stack[j]].type = "current";
          points[stack[j]].draw();
          points[stack[j]].type = tmp;
          LC.draw(2);
          return;
        }
      }
      stack = [indices[i - 1], c];
      
    } else {
      b = stack.pop();
      a = stack[stack.length-1]
      iterator = 0
      while (stack.length > 0 && (((what_chain(c) == "l" || what_chain(c) == "b") && det(points[a], points[b], points[c]) > 0))||((what_chain(c) == "r" || what_chain(c) == "b")&&det(points[a], points[b], points[c]) < 0)){
        iterator++
        if (iterator == 1000){
          print("Asd")
          return
        }
        if (what_chain(c) == "l" || what_chain(c) == "b"){
          if (det(points[a], points[b], points[c]) > 0) {
            if (!LC.contains(new Line(points[b], points[c]))) {
              LC.push(points[b], points[c]);
                          b = stack.pop()
              a = stack[stack.length-1]
            }
          }else{

            break;
          }
        }else{
          if (det(points[a], points[b], points[c]) < 0) {
            if (!LC.contains(new Line(points[b], points[c]))) {
              LC.push(points[b], points[c]);
            b = stack.pop()
              a = stack[stack.length-1]
            }
          }else{

            break;
          }
        }
       // console.log(stack)
      }
      
       stack.push(b)
      stack.push(c)

    }
    
/*
    } else {
      breaking_point = 0;
      while (stack.length >= 2) {
        if (breaking_point) {
          break;
        }
        b = stack.pop();
        a = stack.pop();
        if (stack.length == 0) {
          breaking_point = 1;
        }
        if (what_chain(c) == "l" || what_chain(c) == "b") {
          if (det(points[a], points[b], points[c]) > 0) {
            if (!LC.contains(new Line(points[a], points[c]))) {
              LC.push(points[a], points[c]);
            }
            stack.push(a);
            stack.push(c);
            if (stack.length > 2) {
              c = stack.pop();
            }

            step++;
            if (frame - reset_frame < time * step && animation) {
              for (let k = 0; k < stack.length; k++) {
                tmp = points[stack[k]].type;
                points[stack[k]].type = "stack";
                points[stack[k]].draw();
                points[stack[k]].type = tmp;
              }
              tmp = points[a].type;
              points[a].type = "current";
              points[a].draw();
              points[a].type = tmp;
              tmp = points[c].type;
              points[c].type = "current";
              points[c].draw();
              points[c].type = tmp;
              tmp = points[b].type;
              points[b].type = "current";
              points[b].draw();
              points[b].type = tmp;
              LC.draw(2);
              return;
            }
            if (stack.length == 2) {
              break;
            }
          } else {
            stack.push(a);
            stack.push(b);
            stack.push(c);
            break;
          }
        } else if (det(points[a], points[b], points[c]) < 0) {
          if (!LC.contains(new Line(points[a], points[c]))) {
            LC.push(points[a], points[c]);
          }
          stack.push(a);
          stack.push(c);
          if (stack.length > 2) {
            c = stack.pop();
          }
          step++;
          if (frame - reset_frame < time * step && animation) {
            for (let k = 0; k < stack.length; k++) {
              tmp = points[stack[k]].type;
              points[stack[k]].type = "stack";
              points[stack[k]].draw();
              points[stack[k]].type = tmp;
            }
            tmp = points[a].type;
            points[a].type = "current";
            points[a].draw();
            points[a].type = tmp;
            tmp = points[c].type;
            points[c].type = "current";
            points[c].draw();
            points[c].type = tmp;
            tmp = points[b].type;
            points[b].type = "current";
            points[b].draw();
            points[b].type = tmp;
            LC.draw(2);
            return;
          }
          if (stack.length == 2) {
            break;
          }
        } else {
          stack.push(a);
          stack.push(b);
          stack.push(c);
          break;
        }
      }
    }
*/
  }
  if (frame - reset_frame == time * step && animation) {
    console.log(LC);
  }
  // LC.draw(2);
  return LC;
}
