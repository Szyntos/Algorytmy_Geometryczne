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
    mianownik_a = 0.001
  }
  a = (l1.p2.y - l1.p1.y) / mianownik_a
  b = l1.p2.y - a * l1.p2.x
  mianownik_c = (l2.p2.x - l2.p1.x)
  if (mianownik_c == 0) {
    mianownik_c = 0.001
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
  Intersections = []
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
    mianownik_a = 0.001
  }
  a = (l1.p2.y - l1.p1.y) / mianownik_a
  b = l1.p2.y - a * l1.p2.x
  return a * x.x + b
}

function showProgress() {
  if (step==4){
    asasdasdad = 21
  }
  l = new Line(new Point(currentEventPoint.x, 10000), new Point(currentEventPoint.x, -10000))
  l.draw(2)
  currentEventLines = currentEvent.lines
  ll = currentEventLines.length
  for (let i = 0; i < ll; i++){
    l = new Line(new Point(currentEventLines[i].p1.x, currentEventLines[i].p1.y), new Point(currentEventLines[i].p2.x, currentEventLines[i].p2.y))
    stroke("rgba(0, 0, 120, 0.7)")
    strokeWeight(8)
    l.draw(8)
    strokeWeight(default_stroke_weight)
    stroke(default_stroke)
  }

  if (ll == 1){
    l = new Line(new Point(currentEventLines[0].p1.x, currentEventLines[0].p1.y), new Point(currentEventLines[0].p2.x, currentEventLines[0].p2.y))
    
    payload = new newContainer_T(l)
    // T.insert(payload, payload, currentEventPoint)
    upperNeighbour = T.next(T.find(payload, currentEventPoint))
    lowerNeighbour = T.prev(T.find(payload, currentEventPoint))
    // T.remove(payload, currentEventPoint)
    if (upperNeighbour != null){
      stroke("rgba(0, 0, 120, 0.7)")
      strokeWeight(8)
      upperNeighbour.key.line.draw(8)
      strokeWeight(default_stroke_weight)
      stroke(default_stroke)
    }
    if (lowerNeighbour != null){
      stroke("rgba(0, 120, 0, 1)")
      strokeWeight(20)
      lowerNeighbour.key.line.draw(8)
      strokeWeight(default_stroke_weight)
      stroke(default_stroke)
    }
  }
  for (let i = 0; i < ll; i++){
    l = new Line(new Point(currentEventLines[i].p1.x, currentEventLines[i].p1.y), new Point(currentEventLines[i].p2.x, currentEventLines[i].p2.y))
    stroke("rgba(0, 0, 120, 0.7)")
    strokeWeight(8)
    l.draw(8)
    strokeWeight(default_stroke_weight)
    stroke(default_stroke)
  }
  
  
  currentEvent.lines[0].draw(4)

  text(currentEventType, currentEventPoint.x, 400);
  // console.log("\n\n==========poczontek========")
  dl = T.getsize()
  // console.log(T)
  // console.log(dl)
  
  for (let i = 0; i < dl; i++) {
    payload = T.pop(currentEventPoint)
    stroke("rgba(120, 0, 0, 0.3)")
                strokeWeight(8)
                payload.data.line.draw()
                strokeWeight(default_stroke_weight)
                stroke(default_stroke)
    
    // console.log(payload)
    // upperNeighbour = T.upperBound(payload, false, currentEventPoint)
    // lowerNeighbour = T.lowerBound(payload, false, currentEventPoint)
    // console.log("upper", upperNeighbour)
    // console.log("lower", lowerNeighbour)
    // T.remove(payload, currentEventPoint)
  }
  // console.log("koniec")
}

function printT(T){
  dl = T.count()
  // console.log(T)
  // console.log(dl)
  
  for (let i = 0; i < dl; i++) {
    payload = T.min()._value
    console.log(payload.line.p1.x, payload.line.p1.y)
    // upperNeighbour = T.upperBound(payload, false, currentEventPoint)
    // lowerNeighbour = T.lowerBound(payload, false, currentEventPoint)
    // console.log("upper", upperNeighbour)
    // console.log("lower", lowerNeighbour)
    T.remove(payload, currentEventPoint)
  }
}

function isLineThere(x, line){
  if (x._value != null){
    if (x._value.line.p1.x == line.p1.x && x._value.line.p1.y == line.p1.y && x._value.line.p2.x == line.p2.x && x._value.line.p2.y == line.p2.y){
      // console.log("JEST", x._value)
      // return 1
      toDelete = x._value
      return 1
    }else{
      // console.log("tonieto", x)
      return 0
      

    }
  }
  console.log("asd")
  return 0
}

function setParentNull(x, l){
  x = x.setParent(null)
}

function szukamy797582(l){
  if (l.p1.x == 797 && l.p1.y == 582){
    console.log("TUTAJ")
  }
}

function isInQueue(point){
  for (let i = 0; i < AddedIntersections.length; i++){
    if (AddedIntersections[i].x == point.x && AddedIntersections[i].y == point.y){
      return true
    }
  }
  return false
}

function checker(x, l){

}

function linesToKey(l1, l2){
  if (l1.p1.x > l2.p1.x){
    lll1 = l1
    lll2 = l2
  }else if (l1.p1.x == l2.p1.x){
    if (l1.p1.y > l2.p1.y){
      lll1 = l1
      lll2 = l2
    }else{
      lll1 = l2
      lll2 = l1
    }
  }else{
    lll1 = l2
    lll2 = l1
  }
  aaaa = lll1.p1.x
  bbbb = lll1.p1.y
  cccc = lll1.p2.x
  dddd = lll1.p2.y
  eeee = lll2.p1.x
  ffff = lll2.p1.y
  gggg = lll2.p2.x
  hhhh = lll2.p2.y
  return str(aaaa) + str(bbbb) + str(cccc) + str(dddd) + str(eeee) + str(ffff) + str(gggg) + str(hhhh)
}


function CheckIntersectionsSweep_nw(LC, currentStep) {
  stepByStep = 1
  step = 0
  toDelete = null;
  delta = 0.000001
  // currentStep = 54
  Q = new PriorityQueue(comparatorQueue);
  AddedIntersections = []
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
    // console.log(currentEventPoint)
    // console.log(currentEvent.lines)
    // szukamy797582(currentEventLine)
    // console.log(T)
    // console.log(step)
    // T.traverseInOrder(setParentNull, -1)
    if (step == 52){
      s222 = 20
      // T.traverseInOrder(setParentNull, -1)
      // saveJSON(T, "T.json");
      
    }

    
    // console.log(T)
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

        intersectionPossibility = LineIntersectionCheck(currentEventLine, upperNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(12)
            if (!isInQueue(intersectionPossibility[1])){
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, upperNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
            }
            
          }
        }

      }
      if (lowerNeighbour != null) {

        lowerNeighbour = lowerNeighbour._value

        intersectionPossibility = LineIntersectionCheck(currentEventLine, lowerNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(10)
            if (!isInQueue(intersectionPossibility[1])){
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, lowerNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
            }
            
          }
        }

      }
      step++
      if (currentStep < step && stepByStep) {
        showProgress()
        return
      }

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
            if (!isInQueue(intersectionPossibility[1])){
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, upperNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
            }
            
          }
        }

      }
      if (lowerNeighbour != null) {
        lowerNeighbour = lowerNeighbour._value
        intersectionPossibility = LineIntersectionCheck(currentEventLine, lowerNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(10)
            if (!isInQueue(intersectionPossibility[1])){
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, lowerNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
              
            }
           
          }
        }
      }
      // console.log("Mamy usunanan", payload.line)
      T.traverseInOrder(isLineThere, payload.line)
      T.remove(toDelete, "value")
      // if (!T.remove(payload, currentEventPoint)) {
      //   toDelete = T.upperBound(payload, true, currentEventPoint)
      //   if (toDelete != null) {
      //     T.remove(toDelete._value, currentEventPoint)
      //   }

      // }
      step++
      if (currentStep < step && stepByStep) {
        showProgress()
        return
      }
      
    } else if (currentEventType == "intersection") {
      // Zamiana

      currentEventLines = currentEvent.lines

      currentEventPointToTheLeft = new Point(currentEventPoint.x - delta, currentEventPoint.y)
      currentEventPointToTheRight = new Point(currentEventPoint.x + delta, currentEventPoint.y)
      currentBroomIntersection1 = BroomIntersection(currentEventLines[0], currentEventPointToTheLeft)
      currentBroomIntersection2 = BroomIntersection(currentEventLines[1], currentEventPointToTheLeft)

      payload1 = new Container_T(currentBroomIntersection1, currentEventLines[0])
      payload2 = new Container_T(currentBroomIntersection2, currentEventLines[1])
      // console.log("zamiana", currentEventLines)
      T.traverseInOrder(isLineThere, payload2.line)
      if (!T.remove(toDelete, "value")){
        console.log(false)
      }
      // if (T.remove(payload2, currentEventPointToTheLeft) == false){
      //   console.log("NIEMOZEUSUNONNSN", payload2)
      //   T.traverseInOrder(isLineThere, payload2.line)


      // }
      // if (payload1.line.p1.x == 200 && payload1.line.p1.y == 924){
      //   console.log(T)
      // }
      // T.traverseInOrder(checker, 1)
      T.traverseInOrder(isLineThere, payload1.line)
      // T.traverseInOrder(checker, 1)
      // console.log("asdasdasd")
      // console.log(payload1)
      // console.log(toDelete)
      if (!T.remove(toDelete, "value")){
        console.log(false)
      }
      // if (T.remove(payload1, currentEventPointToTheLeft) == false){
      //   // console.log("NIEMOZEUSUNONNSN")
      //   T.traverseInOrder(isLineThere, payload1.line)


      // }

      currentBroomIntersection1 = BroomIntersection(currentEventLines[0], currentEventPointToTheRight)
      currentBroomIntersection2 = BroomIntersection(currentEventLines[1], currentEventPointToTheRight)
      payload1 = new Container_T(currentBroomIntersection1, currentEventLines[0])
      payload2 = new Container_T(currentBroomIntersection2, currentEventLines[1])
      T.insert(payload1, currentEventPointToTheRight)
      T.insert(payload2, currentEventPointToTheRight)
      T.traverseInOrder(isLineThere, payload1.line)

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
              if (!isInQueue(intersectionPossibility[1])){
                Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[0], upperNeighbour.line], "intersection"))
                AddedIntersections.push(intersectionPossibility[1])
              }
              
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
              if (!isInQueue(intersectionPossibility[1])){
                Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[0], lowerNeighbour.line], "intersection"))
                AddedIntersections.push(intersectionPossibility[1])
              }
              
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
              if (!isInQueue(intersectionPossibility[1])){
                Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[1], lowerNeighbour.line], "intersection"))
                AddedIntersections.push(intersectionPossibility[1])
              }
              
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
              if (!isInQueue(intersectionPossibility[1])){
                Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[1], upperNeighbour.line], "intersection"))
                AddedIntersections.push(intersectionPossibility[1])
              }
              
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
  // console.log(maxCount)
}


function newComparatorT(a, b, x = -1) {
  if (x != -1) {
    // console.log("comparator line", a)
    aaa = BroomIntersection(a.line, x)
    bbb = BroomIntersection(b.line, x)
    if (a.line == b.line) return 0;
    if (aaa == bbb) return "oba";
    return aaa > bbb ? 1 : -1;
  }
  if (a === b) return 0;
  return a.value > b.value ? 1 : -1;
}


class newContainer_T{
  constructor(line) {
    this.line = line;
  }
}

function CheckIntersectionsSweep_nw_2(LC, currentStep) {
  stepByStep = 0
  step = 0
  delta = 1
  Q = new PriorityQueue(comparatorQueue)
  AddedIntersections = []

  // Pushing endpoints to Queue
  for (i = 0; i < LC.getArray().length; i++) {
    if (LC.getArray()[i].p1.x < LC.getArray()[i].p2.x) {
      Q.push(new Container_Q(LC.getArray()[i].p1, [LC.getArray()[i]], "start"))
      Q.push(new Container_Q(LC.getArray()[i].p2, [LC.getArray()[i]], "end"))
    } else {
      Q.push(new Container_Q(LC.getArray()[i].p1, [LC.getArray()[i]], "end"))
      Q.push(new Container_Q(LC.getArray()[i].p2, [LC.getArray()[i]], "start"))
    }
  }

  T = new AvlTree(newComparatorT)

  while (!Q.isEmpty()){
    currentEvent = Q.pop();
    currentEventPoint = currentEvent.point
    currentEventLine = currentEvent.lines[0]
    currentEventType = currentEvent.type

    if (step == 12){
      ss = 2
    }

    step++
      if (currentStep < step && stepByStep) {
        showProgress()
        return
      }

    if (currentEventType == "start"){
      currentBroomIntersection = BroomIntersection(currentEventLine, currentEventPoint)
      payload = new newContainer_T(currentEventLine)
      T.insert(payload, currentEventPoint)
      // T.insert(payload, currentEventPoint)

      upperNeighbour = T.upperBound(payload, false, currentEventPoint)
      lowerNeighbour = T.lowerBound(payload, false, currentEventPoint)

      if (upperNeighbour != null){
        upperNeighbour = upperNeighbour._value
        intersectionPossibility = LineIntersectionCheck(currentEventLine, upperNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(12)
            if (!isInQueue(intersectionPossibility[1])){
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, upperNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
            }
            
          }
        }

      }
      if (lowerNeighbour != null){
        lowerNeighbour = lowerNeighbour._value
        intersectionPossibility = LineIntersectionCheck(currentEventLine, lowerNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(12)
            if (!isInQueue(intersectionPossibility[1])){
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, lowerNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
            }
            
          }
        }

      }
      step++
      if (currentStep < step && stepByStep) {
        showProgress()
        return
      }


    }else if (currentEventType == "end"){
      currentBroomIntersection = BroomIntersection(currentEventLine, currentEventPoint)
      payload = new newContainer_T(currentEventLine)


      upperNeighbour = T.upperBound(payload, false, currentEventPoint)
      lowerNeighbour = T.lowerBound(payload, false, currentEventPoint)

      if (upperNeighbour != null){
        upperNeighbour = upperNeighbour._value
        intersectionPossibility = LineIntersectionCheck(currentEventLine, upperNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(12)
            if (!isInQueue(intersectionPossibility[1])){
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, upperNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
            }
            
          }
        }

      }
      if (lowerNeighbour != null){
        lowerNeighbour = lowerNeighbour._value
        intersectionPossibility = LineIntersectionCheck(currentEventLine, lowerNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            intersectionPossibility[1].draw(12)
            if (!isInQueue(intersectionPossibility[1])){
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, lowerNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
            }
            
          }
        }

      }

      console.log("chcemy usus", payload)
      T.remove(payload, currentEventPoint)
      step++
      if (currentStep < step && stepByStep) {
        showProgress()
        return
      }
    }else if (currentEventType == "intersection"){
      currentEventLines = currentEvent.lines
      currentEventPointToTheLeft = new Point(currentEventPoint.x - delta, currentEventPoint.y)
      currentEventPointToTheRight = new Point(currentEventPoint.x + delta, currentEventPoint.y)
      currentBroomIntersection1 = BroomIntersection(currentEventLines[0], currentEventPointToTheLeft)
      currentBroomIntersection2 = BroomIntersection(currentEventLines[1], currentEventPointToTheLeft)

      payload1 = new newContainer_T(currentEventLines[0])
      payload2 = new newContainer_T(currentEventLines[1])
      // printT(T)
      p1 = T.removeTraversing(payload1, currentEventPoint)
      p2 = T.removeTraversing(payload2, currentEventPoint)
      console.log(p1, p2)
      T.insert(payload1, currentEventPointToTheRight)
      T.insert(payload2, currentEventPointToTheRight)

      upperNeighbour = T.upperBound(payload1, false, currentEventPointToTheRight)
      lowerNeighbour = T.lowerBound(payload1, false, currentEventPointToTheRight)
      if (currentBroomIntersection1 > currentBroomIntersection2) {
        if (upperNeighbour != null) {
          upperNeighbour = upperNeighbour._value
          intersectionPossibility = LineIntersectionCheck(currentEventLines[0], upperNeighbour.line)
          if (intersectionPossibility[0]) {
            if (intersectionPossibility[1].x > currentEventPointToTheRight.x) {
              intersectionPossibility[1].draw(10)
              if (!isInQueue(intersectionPossibility[1])){
                Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[0], upperNeighbour.line], "intersection"))
                AddedIntersections.push(intersectionPossibility[1])
              }
              
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
              if (!isInQueue(intersectionPossibility[1])){
                Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[0], lowerNeighbour.line], "intersection"))
                AddedIntersections.push(intersectionPossibility[1])
              }
              
            }
          }
        }
      }
      upperNeighbour = T.upperBound(payload2, false, currentEventPointToTheRight)
      lowerNeighbour = T.lowerBound(payload2, false, currentEventPointToTheRight)
      if (currentBroomIntersection1 > currentBroomIntersection2) {
        if (lowerNeighbour != null) {
          lowerNeighbour = lowerNeighbour._value
          intersectionPossibility = LineIntersectionCheck(currentEventLines[1], lowerNeighbour.line)
          if (intersectionPossibility[0]) {
            if (intersectionPossibility[1].x > currentEventPointToTheRight.x) {
              intersectionPossibility[1].draw(10)
              if (!isInQueue(intersectionPossibility[1])){
                Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[1], lowerNeighbour.line], "intersection"))
                AddedIntersections.push(intersectionPossibility[1])
              }
              
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
              if (!isInQueue(intersectionPossibility[1])){
                Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[1], upperNeighbour.line], "intersection"))
                AddedIntersections.push(intersectionPossibility[1])
              }
              
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
  console.log("popo")
  // printT(T)
}







// ==================================================================================================================================



function CheckIntersectionsSweep(LC, currentStep, stepbystep=1) {
  stepByStep = stepbystep;
  step = 0
  delta = 0.0000001
  Q = new PriorityQueue(comparatorQueue)
  AddedIntersections = []
  IntersectingLines = []
  LinesMap = new Map();
  
  // Pushing endpoints to Queue
  for (i = 0; i < LC.getArray().length; i++) {
    if (LC.getArray()[i].p1.x < LC.getArray()[i].p2.x) {
      Q.push(new Container_Q(LC.getArray()[i].p1, [LC.getArray()[i]], "start"))
      Q.push(new Container_Q(LC.getArray()[i].p2, [LC.getArray()[i]], "end"))
    } else {
      Q.push(new Container_Q(LC.getArray()[i].p1, [LC.getArray()[i]], "end"))
      Q.push(new Container_Q(LC.getArray()[i].p2, [LC.getArray()[i]], "start"))
    }
  }

  T = new AVLTree(newComparatorT)

  while (!Q.isEmpty()){
    // console.log(T.toString())
    currentEvent = Q.pop();
    currentEventPoint = currentEvent.point
    currentEventLine = currentEvent.lines[0]
    currentEventType = currentEvent.type

    if (step == 10){
      ss = 2
    }

    step++
    if (currentStep < step && stepByStep) {
      showProgress()
      PC = new PointsCollection()
      PC.pushArray(AddedIntersections)
      
      return [PC, IntersectingLines]
    }

    if (currentEventType == "start"){
      currentBroomIntersection = BroomIntersection(currentEventLine, currentEventPoint)
      payload = new newContainer_T(currentEventLine)
      T.insert(payload, payload, currentEventPoint)
      // console.log(T.toString())
      // T.insert(payload, currentEventPoint)

      upperNeighbour = T.next(T.find(payload, currentEventPoint))
      lowerNeighbour = T.prev(T.find(payload, currentEventPoint))

      if (upperNeighbour != null){
        upperNeighbour = upperNeighbour.data
        intersectionPossibility = LineIntersectionCheck(currentEventLine, upperNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            // intersectionPossibility[1].draw(12)
            if (!LinesMap.has(linesToKey(currentEventLine, upperNeighbour.line))){
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, upperNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
              IntersectingLines.push([currentEventLine, upperNeighbour.line])
              LinesMap.set(linesToKey(currentEventLine, upperNeighbour.line), linesToKey(currentEventLine, upperNeighbour.line))
            }
            
          }
        }

      }
      if (lowerNeighbour != null){
        lowerNeighbour = lowerNeighbour.data
        intersectionPossibility = LineIntersectionCheck(currentEventLine, lowerNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            // intersectionPossibility[1].draw(12)
            if (!LinesMap.has(linesToKey(currentEventLine, lowerNeighbour.line))){
              Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, lowerNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
              IntersectingLines.push([currentEventLine, lowerNeighbour.line])
              LinesMap.set(linesToKey(currentEventLine, lowerNeighbour.line), linesToKey(currentEventLine, lowerNeighbour.line))
            }
            
          }
        }

      }
      // step++
      // if (currentStep < step && stepByStep) {
      //   showProgress()
      //   returnisInQueue
      // }


    }else if (currentEventType == "end"){
      // console.log(T.toString())
      currentBroomIntersection = BroomIntersection(currentEventLine, currentEventPoint)
      payload = new newContainer_T(currentEventLine)


      upperNeighbour = T.next(T.find(payload, currentEventPoint))
      lowerNeighbour = T.prev(T.find(payload, currentEventPoint))
      if (upperNeighbour != null && lowerNeighbour != null){
        upperNeighbour = upperNeighbour.data
        lowerNeighbour = lowerNeighbour.data
        intersectionPossibility = LineIntersectionCheck(lowerNeighbour.line, upperNeighbour.line)
        if (intersectionPossibility[0]) {
          if (intersectionPossibility[1].x > currentEventPoint.x) {
            // intersectionPossibility[1].draw(12)
            if (!LinesMap.has(linesToKey(lowerNeighbour.line, upperNeighbour.line))){
              Q.push(new Container_Q(intersectionPossibility[1], [lowerNeighbour.line, upperNeighbour.line], "intersection"))
              AddedIntersections.push(intersectionPossibility[1])
              IntersectingLines.push([lowerNeighbour.line, upperNeighbour.line])
              LinesMap.set(linesToKey(lowerNeighbour.line, upperNeighbour.line), linesToKey(lowerNeighbour.line, upperNeighbour.line))
            }
            
          }
        }
      }

      // if (upperNeighbour != null){
      //   upperNeighbour = upperNeighbour.data
      //   intersectionPossibility = LineIntersectionCheck(currentEventLine, upperNeighbour.line)
      //   if (intersectionPossibility[0]) {
      //     if (intersectionPossibility[1].x > currentEventPoint.x) {
      //       // intersectionPossibility[1].draw(12)
      //       if (!isInQueue(intersectionPossibility[1])){
      //         Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, upperNeighbour.line], "intersection"))
      //         AddedIntersections.push(intersectionPossibility[1])
      //       }
            
      //     }
      //   }

      // }
      // if (lowerNeighbour != null){
      //   lowerNeighbour = lowerNeighbour.data
      //   intersectionPossibility = LineIntersectionCheck(currentEventLine, lowerNeighbour.line)
      //   if (intersectionPossibility[0]) {
      //     if (intersectionPossibility[1].x > currentEventPoint.x) {
      //       // intersectionPossibility[1].draw(12)
      //       if (!isInQueue(intersectionPossibility[1])){
      //         Q.push(new Container_Q(intersectionPossibility[1], [currentEventLine, lowerNeighbour.line], "intersection"))
      //         AddedIntersections.push(intersectionPossibility[1])
      //       }
            
      //     }
      //   }

      // }

      // console.log("chcemy usus", payload)
      // console.log(T.toString())
      T.remove(payload, currentEventPoint)
      T.remove(payload, currentEventPoint)
      T.remove(payload, currentEventPoint)
      // console.log(T.toString())
      // step++
      // if (currentStep < step && stepByStep) {
      //   showProgress()
      //   return
      // }
    }else if (currentEventType == "intersection"){
      currentEventLines = currentEvent.lines
      currentEventPointToTheLeft = new Point(currentEventPoint.x - delta, currentEventPoint.y)
      currentEventPointToTheRight = new Point(currentEventPoint.x + delta, currentEventPoint.y)
      currentBroomIntersection1 = BroomIntersection(currentEventLines[0], currentEventPointToTheLeft)
      currentBroomIntersection2 = BroomIntersection(currentEventLines[1], currentEventPointToTheLeft)

      payload1 = new newContainer_T(currentEventLines[0])
      payload2 = new newContainer_T(currentEventLines[1])
      // printT(T)
      // console.log(T.toString())
      p1 = T.remove(payload1, currentEventPoint)
      p2 = T.remove(payload2, currentEventPoint)
      p1 = T.remove(payload1, currentEventPoint)
      p2 = T.remove(payload2, currentEventPoint)
      p1 = T.remove(payload1, currentEventPoint)
      p2 = T.remove(payload2, currentEventPoint)
      // console.log(T.toString())
      // console.log(p1, p2)
      T.insert(payload1, payload1, currentEventPointToTheRight)
      T.insert(payload2, payload2, currentEventPointToTheRight)
      // console.log(T.toString())
      upperNeighbour = T.next(T.find(payload1, currentEventPointToTheRight))
      lowerNeighbour = T.prev(T.find(payload1, currentEventPointToTheRight))
      // if (currentBroomIntersection1 < currentBroomIntersection2) {
      if (upperNeighbour != null) {
        upperNeighbour = upperNeighbour.data
        if (upperNeighbour.line != payload1.line && upperNeighbour.line != payload1.line &&
          upperNeighbour.line != payload2.line && upperNeighbour.line != payload2.line){
          intersectionPossibility = LineIntersectionCheck(currentEventLines[0], upperNeighbour.line)
          if (intersectionPossibility[0]) {
            if (intersectionPossibility[1].x > currentEventPointToTheRight.x) {
              // intersectionPossibility[1].draw(10)
              if (!LinesMap.has(linesToKey(currentEventLines[0], upperNeighbour.line))){
                Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[0], upperNeighbour.line], "intersection"))
                AddedIntersections.push(intersectionPossibility[1])
                IntersectingLines.push([currentEventLines[0], upperNeighbour.line])
                LinesMap.set(linesToKey(currentEventLines[0], upperNeighbour.line), linesToKey(currentEventLines[0], upperNeighbour.line))
              }
              
            }
          }
        }
      }
        
      // } else {
      if (lowerNeighbour != null) {
        lowerNeighbour = lowerNeighbour.data
        if (lowerNeighbour.line != payload1.line && lowerNeighbour.line != payload1.line &&
          lowerNeighbour.line != payload2.line && lowerNeighbour.line != payload2.line){
          intersectionPossibility = LineIntersectionCheck(currentEventLines[0], lowerNeighbour.line)
          if (intersectionPossibility[0]) {
            if (intersectionPossibility[1].x > currentEventPointToTheRight.x) {
              // intersectionPossibility[1].draw(10)
              if (!LinesMap.has(linesToKey(currentEventLines[0], lowerNeighbour.line))){
                Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[0], lowerNeighbour.line], "intersection"))
                AddedIntersections.push(intersectionPossibility[1])
                IntersectingLines.push([currentEventLines[0], lowerNeighbour.line])
                LinesMap.set(linesToKey(currentEventLines[0], lowerNeighbour.line), linesToKey(currentEventLines[0], lowerNeighbour.line))
              }
              
            }
          }
        }
      }
      // }


      
      upperNeighbour = T.next(T.find(payload2, currentEventPointToTheRight))
      lowerNeighbour = T.prev(T.find(payload2, currentEventPointToTheRight))
      // if (currentBroomIntersection1 < currentBroomIntersection2) {
      if (lowerNeighbour != null) {
        lowerNeighbour = lowerNeighbour.data
        if (lowerNeighbour.line != payload1.line && lowerNeighbour.line != payload1.line &&
          lowerNeighbour.line != payload2.line && lowerNeighbour.line != payload2.line){
            intersectionPossibility = LineIntersectionCheck(currentEventLines[1], lowerNeighbour.line)
            if (intersectionPossibility[0]) {
              if (intersectionPossibility[1].x > currentEventPointToTheRight.x) {
                // intersectionPossibility[1].draw(10)
                if (!LinesMap.has(linesToKey(currentEventLines[1], lowerNeighbour.line))){
                  Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[1], lowerNeighbour.line], "intersection"))
                  AddedIntersections.push(intersectionPossibility[1])
                  IntersectingLines.push([currentEventLines[1], lowerNeighbour.line])
                  LinesMap.set(linesToKey(currentEventLines[1], lowerNeighbour.line), linesToKey(currentEventLines[1], lowerNeighbour.line))
                }
                
              }
            }
          }
        
      }
      // } else {
      if (upperNeighbour != null) {
        upperNeighbour = upperNeighbour.data
        if (upperNeighbour.line != payload1.line && upperNeighbour.line != payload1.line &&
          upperNeighbour.line != payload2.line && upperNeighbour.line != payload2.line){
            intersectionPossibility = LineIntersectionCheck(currentEventLines[1], upperNeighbour.line)
            if (intersectionPossibility[0]) {
              if (intersectionPossibility[1].x > currentEventPointToTheRight.x) {
                // intersectionPossibility[1].draw(10)
                if (!LinesMap.has(linesToKey(currentEventLines[1], upperNeighbour.line))){
                  Q.push(new Container_Q(intersectionPossibility[1], [currentEventLines[1], upperNeighbour.line], "intersection"))
                  AddedIntersections.push(intersectionPossibility[1])
                  IntersectingLines.push([currentEventLines[1], upperNeighbour.line])
                  LinesMap.set(linesToKey(currentEventLines[1], upperNeighbour.line), linesToKey(currentEventLines[1], upperNeighbour.line))
                }
                
              }
            }
          }
        

      }
      // }

      // step++
      // if (currentStep < step && stepByStep) {
      //   showProgress()
      //   return
      // }



    }
    step++
    if (currentStep < step && stepByStep) {
      showProgress()
      PC = new PointsCollection()
      PC.pushArray(AddedIntersections)
      
      return [PC, IntersectingLines]
    }
  }
  PC = new PointsCollection()
  PC.pushArray(AddedIntersections)
  return [PC, IntersectingLines]
}



function CheckIntersectionsSweep_CheckOnly(LC) {
  delta = 0.0000001
  Q = new PriorityQueue(comparatorQueue)
  AddedIntersections = []


  // Pushing endpoints to Queue
  for (i = 0; i < LC.getArray().length; i++) {
    if (LC.getArray()[i].p1.x < LC.getArray()[i].p2.x) {
      Q.push(new Container_Q(LC.getArray()[i].p1, [LC.getArray()[i]], "start"))
      Q.push(new Container_Q(LC.getArray()[i].p2, [LC.getArray()[i]], "end"))
    } else {
      Q.push(new Container_Q(LC.getArray()[i].p1, [LC.getArray()[i]], "end"))
      Q.push(new Container_Q(LC.getArray()[i].p2, [LC.getArray()[i]], "start"))
    }
  }

  T = new AVLTree(newComparatorT)

  while (!Q.isEmpty()){
    currentEvent = Q.pop();
    currentEventPoint = currentEvent.point
    currentEventLine = currentEvent.lines[0]
    currentEventType = currentEvent.type

    if (currentEventType == "start"){
      currentBroomIntersection = BroomIntersection(currentEventLine, currentEventPoint)
      payload = new newContainer_T(currentEventLine)
      T.insert(payload, payload, currentEventPoint)

      upperNeighbour = T.next(T.find(payload, currentEventPoint))
      lowerNeighbour = T.prev(T.find(payload, currentEventPoint))

      if (upperNeighbour != null){
        upperNeighbour = upperNeighbour.data
        intersectionPossibility = LineIntersectionCheck(currentEventLine, upperNeighbour.line)
        if (intersectionPossibility[0]) {
          return true
        }

      }
      if (lowerNeighbour != null){
        lowerNeighbour = lowerNeighbour.data
        intersectionPossibility = LineIntersectionCheck(currentEventLine, lowerNeighbour.line)
        if (intersectionPossibility[0]) {
          return true
        }

      }

    }else if (currentEventType == "end"){

      currentBroomIntersection = BroomIntersection(currentEventLine, currentEventPoint)
      payload = new newContainer_T(currentEventLine)

      upperNeighbour = T.next(T.find(payload, currentEventPoint))
      lowerNeighbour = T.prev(T.find(payload, currentEventPoint))
      if (upperNeighbour != null && lowerNeighbour != null){
        upperNeighbour = upperNeighbour.data
        lowerNeighbour = lowerNeighbour.data
        intersectionPossibility = LineIntersectionCheck(lowerNeighbour.line, upperNeighbour.line)
        if (intersectionPossibility[0]) {
          return true
        }
      }
      T.remove(payload, currentEventPoint)
      T.remove(payload, currentEventPoint)
      T.remove(payload, currentEventPoint)
    }else if (currentEventType == "intersection"){
      return true
    }
  }
  return false
}