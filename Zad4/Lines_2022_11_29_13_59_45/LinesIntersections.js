// const { PriorityQueue } = require("datastructures-js")

function LineIntersection(l1, l2){
  // l1.draw()
  // l2.draw()
  mianownik_a = (l1.p2.x - l1.p1.x)
  if (mianownik_a == 0){
    mianownik_a = 0.00001
  }
  a = (l1.p2.y - l1.p1.y) / mianownik_a
  b = l1.p2.y - a * l1.p2.x
  mianownik_c = (l2.p2.x - l2.p1.x)
  if (mianownik_c == 0){
    mianownik_c = 0.00001
  }
  c = (l2.p2.y - l2.p1.y) / mianownik_c
  d = l2.p2.y - c * l2.p2.x
  x = (d - b)/(a - c)
  y = a*x + b
  p = new Point(x, y)
  l1_xs = [min(l1.p1.x, l1.p2.x), max(l1.p1.x, l1.p2.x)]
  l2_xs = [min(l2.p1.x, l2.p2.x), max(l2.p1.x, l2.p2.x)]
  intersection = [max(l1_xs[0], l2_xs[0]), min(l1_xs[1], l2_xs[1])]
  if (p.x <= intersection[1] && p.x >= intersection[0]){
      p.draw(12)
  }  
}

function CheckIntersectionsStupidWay(LC){
  for (let j = 0; j < LC.getArray().length; j++) {
    for (let k = 0; k < LC.getArray().length; k++) {
      if (k != j) {
        // console.log(LC[i].getArray());
        LineIntersection(
          LC.getArray()[j],
          LC.getArray()[k]
        );
      }
    }
  }
}

function comparator(a, b){
  return a > b;
}

function CheckIntersectionsSweep(LC){
  Q = new PriorityQueue(comparator);
}