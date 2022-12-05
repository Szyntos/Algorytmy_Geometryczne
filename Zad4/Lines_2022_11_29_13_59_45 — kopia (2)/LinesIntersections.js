// const { PriorityQueue } = require("datastructures-js")

function LineIntersection(l1, l2) {
  // l1.draw()
  // l2.draw()
  mianownik_a = (l1.p2.x - l1.p1.x)
  if (mianownik_a == 0) {
    mianownik_a = 0.00001
  }
  a = (l1.p2.y - l1.p1.y) / mianownik_a
  b = l1.p2.y - a * l1.p2.x
  mianownik_c = (l2.p2.x - l2.p1.x)
  if (mianownik_c == 0) {
    mianownik_c = 0.00001
  }
  c = (l2.p2.y - l2.p1.y) / mianownik_c
  d = l2.p2.y - c * l2.p2.x
  x = (d - b) / (a - c)
  y = a * x + b
  p = new Point(x, y)
  l1_xs = [min(l1.p1.x, l1.p2.x), max(l1.p1.x, l1.p2.x)]
  l2_xs = [min(l2.p1.x, l2.p2.x), max(l2.p1.x, l2.p2.x)]
  intersection = [max(l1_xs[0], l2_xs[0]), min(l1_xs[1], l2_xs[1])]
  if (p.x <= intersection[1] && p.x >= intersection[0]) {
    p.type = "correct"
    p.draw()
  }
}

function LineIntersectionCheck(l1, l2) {
  // l1.draw()
  // l2.draw()
  mianownik_a = (l1.p2.x - l1.p1.x)
  if (mianownik_a == 0) {
    mianownik_a = 0.00001
  }
  a = (l1.p2.y - l1.p1.y) / mianownik_a
  b = l1.p2.y - a * l1.p2.x
  mianownik_c = (l2.p2.x - l2.p1.x)
  if (mianownik_c == 0) {
    mianownik_c = 0.00001
  }
  c = (l2.p2.y - l2.p1.y) / mianownik_c
  d = l2.p2.y - c * l2.p2.x
  x = (d - b) / (a - c)
  y = a * x + b
  p = new Point(x, y)
  l1_xs = [min(l1.p1.x, l1.p2.x), max(l1.p1.x, l1.p2.x)]
  l2_xs = [min(l2.p1.x, l2.p2.x), max(l2.p1.x, l2.p2.x)]
  intersection = [max(l1_xs[0], l2_xs[0]), min(l1_xs[1], l2_xs[1])]
  if (p.x <= intersection[1] && p.x >= intersection[0]) {
    return [1, p]
  } else {
    return [0, p]
  }
}

function CheckIntersectionsStupidWay(LC) {
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

class Container_T {
  constructor(value, line) {
    this.value = value;
    this.line = line;
  }
}
class Container_Q {
  constructor(point, lines, type) {
    this.point = point;
    this.lines = lines
    this.type = type;
  }
}

function comparatorQueue(a, b) {
  if (a === b) return 0;
  return a.point.x > b.point.x ? 1 : -1;
}

function comparatorT(a, b, x = -1) {
  if (x == "value"){
    if (a.value == b.value) return 0;
  return a.value > b.value ? 1 : -1;
  }
  if (x != -1) {
    // console.log("comparator line", a)
    aaa = BroomIntersection(a.line, x)
    bbb = BroomIntersection(b.line, x)
    if (a.line == b.line) return 0;
    return aaa > bbb ? 1 : -1;
  }
  if (a === b) return 0;
  return a.value > b.value ? 1 : -1;
}

function BroomIntersection(l1, x) {
  // console.log(l1, x)
  mianownik_a = (l1.p2.x - l1.p1.x)
  if (mianownik_a == 0) {
    mianownik_a = 0.00001
  }
  a = (l1.p2.y - l1.p1.y) / mianownik_a
  b = l1.p2.y - a * l1.p2.x
  return a * x.x + b
}

function showProgress() {
  l = new Line(new Point(currentEventPoint.x, 10000), new Point(currentEventPoint.x, -10000))
  l.draw(2)
  text(currentEventType, currentEventPoint.x, 400);
  // console.log("\n\n==========poczontek========")
  dl = T.count()
  console.log(T)
  console.log(dl)
  
  for (let i = 0; i < dl; i++) {
    payload = T.min()._value
    // console.log(payload)
    // upperNeighbour = T.upperBound(payload, false, currentEventPoint)
    // lowerNeighbour = T.lowerBound(payload, false, currentEventPoint)
    // console.log("upper", upperNeighbour)
    // console.log("lower", lowerNeighbour)
    T.remove(payload, currentEventPoint)
  }
  // console.log("koniec")
}

function isLineThere(x, line){
  x = x._value
  if (x == null){
    return
  }
  if (x.line.p1.x == line.p1.x && x.line.p1.y == line.p1.y && x.line.p2.x == line.p2.x && x.line.p2.y == line.p2.y){
    console.log("JEST", x)
    toDelete = x
  }else{
    console.log("tonieto", x)
  }
}

function CheckIntersectionsSweep(LC, currentStep) {
  stepByStep = 0
  step = 0
  toDelete = null;
  delta = 0.0001
  currentStep = 20
  Q = new PriorityQueue(comparatorQueue);
  for (i = 0; i < LC.getArray().length; i++) {
    if (LC.getArray()[i].p1.x < LC.getArray()[i].p2.x) {
      Q.push(new Container_Q(LC.getArray()[i].p1, [LC.getArray()[i]], "start"))
      Q.push(new Container_Q(LC.getArray()[i].p2, [LC.getArray()[i]], "end"))
    } else {
      Q.push(new Container_Q(LC.getArray()[i].p1, [LC.getArray()[i]], "end"))
      Q.push(new Container_Q(LC.getArray()[i].p2, [LC.getArray()[i]], "start"))
    }
  }

  // INITIAL QUEUE

  // l = Q.size()
  // for (i = 0; i < l; i++){
  //   console.log(Q.pop())
  // }
  // console.log(Q)

  T = new AvlTree(comparatorT);

  // MAIN LOOP
  maxCount = 0;
  while (!Q.isEmpty()) {
    maxCount = max(maxCount, T.count())
    currentEvent = Q.pop();
    currentEventPoint = currentEvent.point
    currentEventPointToTheRight = new Point(currentEventPoint.x - 10, currentEventPoint.y)
    currentEventLine = currentEvent.lines[0]
    currentEventType = currentEvent.type
    
    // console.log(T)
    if (step == 20){
      s222 = 20
    }
    step++
    if (currentStep < step && stepByStep) {
      showProgress()
      return
    }


    if (currentEventType == "start") {
      currentBroomIntersection = BroomIntersection(currentEventLine, currentEventPoint)
      payload = new Container_T(currentBroomIntersection, currentEventLine)
      T.insert(payload, currentEventPoint)
      upperNeighbour = T.upperBound(payload, false, currentEventPoint)
      lowerNeighbour = T.lowerBound(payload, false, currentEventPoint)
      if (upperNeighbour != null) {

        upperNeighbour = upperNeighbour._value
        // console.log("upperNeighbour", upperNeighbour)
        intersectionPossibility = LineIntersectionCheck(currentEventLine, upperNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(12)
            Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, upperNeighbour.line], "intersection"))
          }
        }

      }
      if (lowerNeighbour != null) {

        lowerNeighbour = lowerNeighbour._value
        // console.log("lowerNeighbour", lowerNeighbour)
        intersectionPossibility = LineIntersectionCheck(currentEventLine, lowerNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(10)
            Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, lowerNeighbour.line], "intersection"))
          }
        }

      }
      step++
      if (currentStep < step && stepByStep) {
        showProgress()
        return
      }
      // console.log(upperNeighbour, lowerNeighbour)
      // T.upperBound()
    } else if (currentEventType == "end") {
      currentBroomIntersection = BroomIntersection(currentEventLine, currentEventPoint)
      payload = new Container_T(currentBroomIntersection, currentEventLine)
      upperNeighbour = T.upperBound(payload, false, currentEventPoint)
      lowerNeighbour = T.lowerBound(payload, false, currentEventPoint)
      if (upperNeighbour != null) {
        upperNeighbour = upperNeighbour._value
        intersectionPossibility = LineIntersectionCheck(currentEventLine, upperNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(10)
            Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, upperNeighbour.line], "intersection"))
          }
        }

      }
      if (lowerNeighbour != null) {
        lowerNeighbour = lowerNeighbour._value
        intersectionPossibility = LineIntersectionCheck(currentEventLine, lowerNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(10)
            Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, lowerNeighbour.line], "intersection"))
          }
        }
      }
      // console.log("dlluuuul", T.count())

      console.log("before Removal", T.count())
      console.log("usuwamy", payload)
      if (!T.remove(payload, currentEventPoint)) {
        toDelete = T.upperBound(payload, true, currentEventPoint)
        if (toDelete != null) {
          T.remove(toDelete._value, currentEventPoint)
        }

      }
      console.log("After Removal",  T.count())
      step++
      if (currentStep < step && stepByStep) {
        showProgress()
        return
      }
    } else if (currentEventType == "intersection") {
      // Zamiana
      console.log("Zamiana", currentEvent.lines)
      currentEventLines = currentEvent.lines
      // console.log("LINES", currentEventLines)
      currentEventPointToTheLeft = new Point(currentEventPoint.x - delta, currentEventPoint.y)
      currentEventPointToTheRight = new Point(currentEventPoint.x + delta, currentEventPoint.y)
      currentBroomIntersection1 = BroomIntersection(currentEventLines[0], currentEventPointToTheLeft)
      currentBroomIntersection2 = BroomIntersection(currentEventLines[1], currentEventPointToTheLeft)
      // console.log("currentBroomIntersections", currentBroomIntersection1, currentBroomIntersection2)
      payload1 = new Container_T(currentBroomIntersection1, currentEventLines[0])
      payload2 = new Container_T(currentBroomIntersection2, currentEventLines[1])
      console.log("before", T.count())
      console.log(T)
      console.log(payload1)
      console.log(payload2)
      if (T.remove(payload2, currentEventPointToTheLeft) == false){
        console.log("NIEMOZEUSUNONNSN", payload2)
        T.traverseInOrder(isLineThere, payload2.line)
        console.log("todelete", toDelete)
        // T.remove(toDelete.value, "value")
        console.log()

      }

      if (T.remove(payload1, currentEventPointToTheLeft) == false){
        console.log("NIEMOZEUSUNONNSN")
        T.traverseInOrder(isLineThere, payload1.line)
        console.log()

      }
      // console.log(T.remove(payload2, currentEventPointToTheLeft))
      console.log("removed 2", T.count())
      currentBroomIntersection1 = BroomIntersection(currentEventLines[0], currentEventPointToTheRight)
      currentBroomIntersection2 = BroomIntersection(currentEventLines[1], currentEventPointToTheRight)
      payload1 = new Container_T(currentBroomIntersection1, currentEventLines[0])
      payload2 = new Container_T(currentBroomIntersection2, currentEventLines[1])
      T.insert(payload1, currentEventPointToTheRight)
      T.insert(payload2, currentEventPointToTheRight)
      console.log("after", T.count())

      // dla 1
      upperNeighbour = T.upperBound(payload1, false, currentEventPointToTheRight)
      lowerNeighbour = T.lowerBound(payload1, false, currentEventPointToTheRight)
      if (currentBroomIntersection1 > currentBroomIntersection2) {
        if (upperNeighbour != null) {
          upperNeighbour = upperNeighbour._value
          intersectionPossibility = LineIntersectionCheck(currentEventLines[0], upperNeighbour.line)
          if (intersectionPossibility[0]) {
            if (intersectionPossibility[1].x > currentEventPointToTheRight.x) {
              intersectionPossibility[1].draw(10)
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[0], upperNeighbour.line], "intersection"))
            }
          }
        }
      } else {
        if (lowerNeighbour != null) {
          lowerNeighbour = lowerNeighbour._value
          intersectionPossibility = LineIntersectionCheck(currentEventLines[0], lowerNeighbour.line)
          if (intersectionPossibility[0]) {
            if (intersectionPossibility[1].x > currentEventPointToTheRight.x) {
              intersectionPossibility[1].draw(10)
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[0], lowerNeighbour.line], "intersection"))
            }
          }
        }
      }
      // dla 2 
      upperNeighbour = T.upperBound(payload2, false, currentEventPointToTheRight)
      lowerNeighbour = T.lowerBound(payload2, false, currentEventPointToTheRight)
      if (currentBroomIntersection1 > currentBroomIntersection2) {
        if (lowerNeighbour != null) {
          lowerNeighbour = lowerNeighbour._value
          intersectionPossibility = LineIntersectionCheck(currentEventLines[1], lowerNeighbour.line)
          if (intersectionPossibility[0]) {
            if (intersectionPossibility[1].x > currentEventPointToTheRight.x) {
              intersectionPossibility[1].draw(10)
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[1], lowerNeighbour.line], "intersection"))
            }
          }
        }
      } else {
        if (upperNeighbour != null) {
          upperNeighbour = upperNeighbour._value
          intersectionPossibility = LineIntersectionCheck(currentEventLines[1], upperNeighbour.line)
          if (intersectionPossibility[0]) {
            if (intersectionPossibility[1].x > currentEventPointToTheRight.x) {
              intersectionPossibility[1].draw(10)
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[1], upperNeighbour.line], "intersection"))
            }
          }

        }
      }
      step++
      if (currentStep < step && stepByStep) {
        showProgress()
        return
      }
    }
  }
  console.log(maxCount)
}