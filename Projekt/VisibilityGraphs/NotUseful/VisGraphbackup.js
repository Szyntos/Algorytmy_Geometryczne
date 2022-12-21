function distance(p1, p2){
    return (p1.x - p2.x)**2 + (p1.y - p2.y)**2
}

function isTheSameLine(l1, l2){
    if (l1 == l2){
        return true
    }
    if (l1.p1.x == l2.p1.x && l1.p1.y == l2.p1.y && l1.p2.x == l2.p2.x && l1.p2.y == l2.p2.y){
        return true
    }
    if (l1.p1.x == l2.p2.x && l1.p1.y == l2.p2.y && l1.p2.x == l2.p1.x && l1.p2.y == l2.p1.y){
        return true
    }
    return false
}
function hasAtLeastOneSamePoint(l1, l2){
    if (isTheSameLine(l1, l2)){
        return true
    }
    if (l1.p1.x == l2.p1.x && l1.p1.y == l2.p1.y){
        return true
    }
    if (l1.p2.x == l2.p2.x && l1.p2.y == l2.p2.y){
        return true
    }
    if (l1.p1.x == l2.p2.x && l1.p1.y == l2.p2.y){
        return true
    }
    if (l1.p2.x == l2.p1.x && l1.p2.y == l2.p1.y){
        return true
    }
    return false
}

function sortByAngle(points, fromPoint){
    quadrant1 = []
    quadrant2 = []
    quadrant3 = []
    quadrant4 = []
    for (let i = 0; i < points.length; i++){
        if (points[i].x > fromPoint.x && points[i].y >= fromPoint.y){
            quadrant1.push(points[i])
        }else if (points[i].x <= fromPoint.x && points[i].y > fromPoint.y){
            quadrant2.push(points[i])
        } else if (points[i].x < fromPoint.x && points[i].y <= fromPoint.y){
            quadrant3.push(points[i])
        } else if (points[i].x >= fromPoint.x && points[i].y < fromPoint.y){
            quadrant4.push(points[i])
        }
    }
    quadrant1sorted = quickSort_angle(quadrant1, 0, quadrant1.length-1, fromPoint)
    for (let i = 0; i < quadrant1sorted.length; i++){
        quadrant1sorted[i].setIndex(i)
    }
    quadrant2sorted = quickSort_angle(quadrant2, 0, quadrant2.length-1, fromPoint)
    for (let i = 0; i < quadrant2sorted.length; i++){
        quadrant2sorted[i].setIndex(i)
    }
    quadrant3sorted = quickSort_angle(quadrant3, 0, quadrant3.length-1, fromPoint)
    for (let i = 0; i < quadrant3sorted.length; i++){
        quadrant3sorted[i].setIndex(i)
    }
    quadrant4sorted = quickSort_angle(quadrant4, 0, quadrant4.length-1, fromPoint)
    for (let i = 0; i < quadrant4sorted.length; i++){
        quadrant4sorted[i].setIndex(i)
    }

    quadrant1firstpoint = null
    if (quadrant1sorted.length){
        quadrant1firstpoint = quadrant1sorted[0]
    }
    for (let i = 0; i < quadrant1sorted.length; i++){
        if (det(fromPoint, quadrant1firstpoint, quadrant1sorted[i]) == 1){
            quadrant1firstpoint = quadrant1sorted[i]
        }
        if (det(fromPoint, quadrant1firstpoint, quadrant1sorted[i]) == 0){
            if (distance(fromPoint, quadrant1sorted[i]) < distance(fromPoint, quadrant1firstpoint)){
                quadrant1firstpoint = quadrant1sorted[i]
            }
        }
    }

    quadrant2firstpoint = null
    if (quadrant2sorted.length){
        quadrant2firstpoint = quadrant2sorted[0]
    }
    for (let i = 0; i < quadrant2sorted.length; i++){
        if (det(fromPoint, quadrant2firstpoint, quadrant2sorted[i]) == 1){
            quadrant2firstpoint = quadrant2sorted[i]
        }
        if (det(fromPoint, quadrant2firstpoint, quadrant2sorted[i]) == 0){
            if (distance(fromPoint, quadrant2sorted[i]) < distance(fromPoint, quadrant2firstpoint)){
                quadrant2firstpoint = quadrant2sorted[i]
            }
        }
    }

    quadrant3firstpoint = null
    if (quadrant3sorted.length){
        quadrant3firstpoint = quadrant3sorted[0]
    }
    for (let i = 0; i < quadrant3sorted.length; i++){
        if (det(fromPoint, quadrant3firstpoint, quadrant3sorted[i]) == 1){
            quadrant3firstpoint = quadrant3sorted[i]
        }
        if (det(fromPoint, quadrant3firstpoint, quadrant3sorted[i]) == 0){
            if (distance(fromPoint, quadrant3sorted[i]) < distance(fromPoint, quadrant3firstpoint)){
                quadrant3firstpoint = quadrant3sorted[i]
            }
        }
    }

    quadrant4firstpoint = null
    if (quadrant4sorted.length){
        quadrant4firstpoint = quadrant4sorted[0]
    }
    for (let i = 0; i < quadrant4sorted.length; i++){
        if (det(fromPoint, quadrant4firstpoint, quadrant4sorted[i]) == 1){
            quadrant4firstpoint = quadrant4sorted[i]
        }
        if (det(fromPoint, quadrant4firstpoint, quadrant4sorted[i]) == 0){
            if (distance(fromPoint, quadrant4sorted[i]) < distance(fromPoint, quadrant4firstpoint)){
                quadrant4firstpoint = quadrant4sorted[i]
            }
        }
    }
    quadrant1reindex = []
    quadrant2reindex = []
    quadrant3reindex = []
    quadrant4reindex = []
    if (quadrant1firstpoint != null){
        quadrant1fpindex = quadrant1firstpoint.getPayload()[2]
        quadrant1reindex = quadrant1sorted.slice(quadrant1fpindex).concat(quadrant1sorted.slice(0, quadrant1fpindex))
    }
    if (quadrant2firstpoint != null){
        quadrant2fpindex = quadrant2firstpoint.getPayload()[2]
        quadrant2reindex = quadrant2sorted.slice(quadrant2fpindex).concat(quadrant2sorted.slice(0, quadrant2fpindex))
    }
    if (quadrant3firstpoint != null){
        quadrant3fpindex = quadrant3firstpoint.getPayload()[2]
        quadrant3reindex = quadrant3sorted.slice(quadrant3fpindex).concat(quadrant3sorted.slice(0, quadrant3fpindex))
    }
    if (quadrant4firstpoint != null){
        quadrant4fpindex = quadrant4firstpoint.getPayload()[2] 
        quadrant4reindex = quadrant4sorted.slice(quadrant4fpindex).concat(quadrant4sorted.slice(0, quadrant4fpindex))
    }


    sortedPoints = quadrant1reindex.concat(quadrant4reindex).concat(quadrant3reindex).concat(quadrant2reindex)

    for (let i = 0; i < sortedPoints.length; i++){
        sortedPoints[i].setIndex(i)
    }
    return sortedPoints
}


function LineIntersectionThatOutputsPoint(l1, l2){
    licznik_a = (l1.p2.y - l1.p1.y)
    licznik_c = (l2.p2.y - l2.p1.y)
    mianownik_a = (l1.p2.x - l1.p1.x)
    mianownik_c = (l2.p2.x - l2.p1.x)
    if (mianownik_a == 0 && mianownik_c == 0){
        if (l1.p1.x == l2.p2.x){
            return new Point(l1.p1.x, l1.p1.y)
        }
        return new Point(0, 0)
    }
    if (mianownik_a == 0){
        c = licznik_c / mianownik_c
        d = l2.p2.y - c * l2.p2.x
        p = new Point(l1.p1.x, c * l1.p1.x + d)
        return p
    }
    if (mianownik_c == 0){
        a = licznik_a / mianownik_a
        b = l1.p2.y - a * l1.p2.x
        p = new Point(l2.p1.x, a * l2.p1.x + b)
        return p
    }
    a = licznik_a / mianownik_a
    b = l1.p2.y - a * l1.p2.x
    c = licznik_c / mianownik_c
    d = l2.p2.y - c * l2.p2.x
    if (a == c){
        return new Point(0, 0)
    }
    x = (d - b) / (a - c)
    y = a * x + b
    p = new Point(x, y)
    return p
}

function createHalfLine(l1){
    licznik_a = (l1.p2.y - l1.p1.y)
    mianownik_a = (l1.p2.x - l1.p1.x)
    if (mianownik_a == 0){
        if (l1.p1.y > l1.p2.y){
            return new Line(l1.p1, new Point(l1.p2.x, l1.p2.y - 10000))
        }else{
            return new Line(l1.p1, new Point(l1.p2.x, l1.p2.y + 10000))
        }
    }
    a = licznik_a / mianownik_a
    b = l1.p2.y - a * l1.p2.x
    if (l1.p1.x > l1.p2.x){
        y = a * (-10000) + b
        return new Line(l1.p1, new Point(-10000, y))
    }else{
        y = a * (10000) + b
        return new Line(l1.p1, new Point(10000, y))
    }
}
function isPointOnLine(p, l1){
    if (p.x == l1.p1.x && p.y == l1.p1.y){
        return true
    }
    if (p.x == l1.p2.x && p.y == l1.p2.y){
        return true
    }
    return false
}

function LineIntersection(l1, l2, type = "checkBoundaries"){
    // type = "checkBoundaries" / "noBoundaries" / "infiniteBroom"
    eps = 0.0000000001
    p = LineIntersectionThatOutputsPoint(l1, l2)
    if (isTheSameLine(l1, l2)){
        return [0, p]
    }
    if (hasAtLeastOneSamePoint(l1, l2)){
        if (type == "infiniteBroom"){
            return [0, p]
        }
        if (type == "checkBoundaries"){
            return [0, p]
        }
        if (type == "noBoundaries"){
            return [1, p]
        }
    }
    minimum1X = min(l1.p1.x, l1.p2.x) - eps
    maximum1X = max(l1.p1.x, l1.p2.x) + eps
    minimum1Y = min(l1.p1.y, l1.p2.y) - eps
    maximum1Y = max(l1.p1.y, l1.p2.y) + eps
    minimum2X = min(l2.p1.x, l2.p2.x) - eps
    maximum2X = max(l2.p1.x, l2.p2.x) + eps
    minimum2Y = min(l2.p1.y, l2.p2.y) - eps
    maximum2Y = max(l2.p1.y, l2.p2.y) + eps


    if (type == "infiniteBroom"){
        newBroomin = createHalfLine(l2)
        minimum2X = min(newBroomin.p1.x, newBroomin.p2.x)
        maximum2X = max(newBroomin.p1.x, newBroomin.p2.x)
        minimum2Y = min(newBroomin.p1.y, newBroomin.p2.y)
        maximum2Y = max(newBroomin.p1.y, newBroomin.p2.y)
        if (p.x <= maximum1X && p.x <= maximum2X &&
            p.x >= minimum1X && p.x >= minimum2X &&
            p.y <= maximum1Y && p.y <= maximum2Y &&
            p.y >= minimum1Y && p.y >= minimum2Y){
                return [1, p]
            }
        return [0, p]
    }
    if (type == "checkBoundaries"){
        if (p.x <= maximum1X && p.x <= maximum2X &&
            p.x >= minimum1X && p.x >= minimum2X &&
            p.y <= maximum1Y && p.y <= maximum2Y &&
            p.y >= minimum1Y && p.y >= minimum2Y){
                if (isPointOnLine(p, l1) || isPointOnLine(p, l2)){
                    return [0, p]
                }
                return [1, p]
            }
        return [0, p]
    }
    if (type == "noBoundaries"){
        return [1, p]
    }
    return [1, p]
}


function BroomIntersection(l1, broom) {
    return LineIntersection(l1, broom, "infiniteBroom")
}



function comparatorT(a, b, x = -1) {
    // x = broom
    if (x != -1) {
        pointA = LineIntersection(a, x, "noBoundaries")
        pointB = LineIntersection(b, x, "noBoundaries")

        pointA = pointA[1]
        pointB = pointB[1]

        dstA = distance(x.p1, pointA)
        dstB = distance(x.p1, pointB)

        if (dstA == dstB || a == b) return 0;
        return dstA > dstB ? 1 : -1;
    }
    else{
        console.log("nie podano x[origin, broom]")
        return 0
    }
}

// Payload = [polygon, edge, index]

function isPointInsidePolygon(polyIndex, p){
    poly = scene.getShapes()[polyIndex]
    interEdges = []
    edges = poly.getLC().getArray();
    tmpBroom = new Line(p, new Point(-1000, p.y+1))
    cnt = 0;
    for (let i = 0; i < edges.length; i++){
        possibleIntersection = BroomIntersection(edges[i], tmpBroom)
        if (possibleIntersection[0]){
            interEdges.push(edges[i])
            cnt++
        }        
    }
    if (cnt % 2 == 0){
        return false
    }
    return true
}

function intersectsInterior(pivot, broom){
    if (pivot.payload[0] == broom.p2.payload[0]){
        poly = scene.getShapes()[pivot.payload[0]]
        edges = poly.getLC().getArray();
        for (let i = 0; i < edges.length; i++){
            if ((edges[i].p1.x == broom.p1.x && edges[i].p1.y == broom.p1.y && 
                edges[i].p2.x == broom.p2.x && edges[i].p2.y == broom.p2.y) ||
                (edges[i].p1.x == broom.p2.x && edges[i].p1.y == broom.p2.y && 
                edges[i].p2.x == broom.p1.x && edges[i].p2.y == broom.p1.y)){
                    return false
                }
        }
        halfpoint = new Point((pivot.x+broom.p2.x)/2, (pivot.y + broom.p2.y)/2)
        return isPointInsidePolygon(pivot.payload[0], halfpoint)
    }
    return false
}

function visible(broom, checkedPoint, sortedPointsArray, tree, visiblePoints, SPRAWDZARKA = 0){
    pivot = broom.p1
    if (intersectsInterior(pivot, broom)){
        return false
    }else if (checkedPoint.payload[2] == 0 || 
        det(broom.p1, broom.p2, sortedPointsArray[checkedPoint.payload[2]-1], 1) != 0){
            edgesOnTree = tree.values()
            if (SPRAWDZARKA){
                for (let i = 0; i < edgesOnTree.length; i++){
                    if (LineIntersection(edgesOnTree[i], broom, "checkBoundaries")[0]){
                        // console.log(edgesOnTree[i])
                        if (SPRAWDZARKA){
                            return false
                        }
                        // 
                    }
                }
            }
            // pokazujemy minimalną krawędź i czy się przecina
            potentialEdge = tree.findMin(broom)
            if (potentialEdge != null){
                potentialEdge = potentialEdge.key
                if (LineIntersection(potentialEdge, broom, "checkBoundaries")[0]){
                    // jak jest przecięcie to pokazujemy punkt
                    return false
                }
            }
            potentialEdge = tree.min()
            if (potentialEdge != null){
                if (LineIntersection(potentialEdge, broom, "checkBoundaries")[0]){
                    return false
                }
            }
            return true
        }
    else if (!visiblePoints.has(sortedPointsArray[checkedPoint.payload[2]-1]) ||
    intersectsInterior(sortedPointsArray[checkedPoint.payload[2]-1], new Line(sortedPointsArray[checkedPoint.payload[2]-1], checkedPoint))){
        return false
    }else{
        edgeFromPreviousPoint = new Line(sortedPointsArray[checkedPoint.payload[2]-1], checkedPoint)
        edgesOnTree = tree.values()
        for (let i = 0; i < edgesOnTree.length; i++){
            if (LineIntersection(edgesOnTree[i], edgeFromPreviousPoint)[0]){
                // jeśli się przecina to linie i punkt
                return false
            }
        }
        return true
    }
}

function visibleVertices(polygonsArray, fromPoint){


    pointsFromPolygons = []
    edgesFromPolygons = []
    for (let i = 0; i < polygonsArray.length; i++){
        polygon = polygonsArray[i]
        nextToIndex = 0
        if (polygon.getPC().getArray().length > 1){
            points = polygon.getPC().getArray()
            edges = polygon.getLC().getArray()
            for (let j = 0; j < points.length; j++){
                if (points[j]!=fromPoint){
                    pointsFromPolygons.push(points[j])
                }else{
                    nextToIndex = pointsFromPolygons.length
                }
            }
            for (let j = 0; j < edges.length; j++){
                edgesFromPolygons.push(edges[j])
            }
        }
    }

    for (let i = 0; i < pointsFromPolygons.length; i++){
        flag = 0
        for (let j = 0; j < pointsFromPolygons.length; j++){
            if (pointsFromPolygons[i].x == pointsFromPolygons[j].x && pointsFromPolygons[i].y == pointsFromPolygons[j].y){
                flag++
            }
        }
        if (flag > 1){
            console.log("ten sam punkt")
            console.log(pointsFromPolygons[i].x)
            console.log(pointsFromPolygons[i].y)
        }
    }
    pointNextToFromPoint = pointsFromPolygons[nextToIndex]

// pokazujemy wszystkie punkty wielokątów
// potem znikają

    sortedPointsArray = sortByAngle(pointsFromPolygons, fromPoint)
    for (let i = 0; i < sortedPointsArray.length; i++){
        sortedPointsArray[i].setIndex(i)
    }

    // piszemy numerki przed posortowaniem
    // for (let i = 0; i < sortedPointsArray.length; i++){
        // text(i, sortedPointsArray[i].x, sortedPointsArray[i].y + 15);
    // }
    // piszemy numerki po posortowaniu
    // numerki znikają 
    T = new AVLTree(comparatorT)
    visiblePoints = new Set()
    broom = new Line(fromPoint, sortedPointsArray[0])
    // pokazujemy pierwszą miotłe
    for (let i = 0; i < edgesFromPolygons.length; i++){
        if (BroomIntersection(edgesFromPolygons[i], broom)[0]){
            T.insert(edgesFromPolygons[i], edgesFromPolygons[i], broom)
        }
    }
    // pokazujemy rzeczy znalezione na miotle
    for (let i = 0; i < sortedPointsArray.length; i++){
        // CAŁY CZAS STAN DRZEWA WYŚWIETLONY
        if (i == 11){
            sdasd = 2
        }

        broom = new Line(fromPoint, sortedPointsArray[i])
        if (visible(broom, sortedPointsArray[i], sortedPointsArray, T, visiblePoints)){
            // pokazujemy że dodaliśmy 
            visiblePoints.add(sortedPointsArray[i])
        }
        nextIndex = i+1
        newBroom = new Line(fromPoint, sortedPointsArray[(nextIndex)%sortedPointsArray.length])
        while (det(broom.p1, broom.p2, newBroom.p2, 1) == 0){
            nextIndex++
            newBroom = new Line(fromPoint, sortedPointsArray[(nextIndex)%sortedPointsArray.length])
        }


        prevIndex = i-1
        prevBroom = new Line(fromPoint, sortedPointsArray[(i-1+sortedPointsArray.length)%sortedPointsArray.length])
        while (det(broom.p1, broom.p2, prevBroom.p2, 1) == 0){
            prevIndex++
            prevBroom = new Line(fromPoint, sortedPointsArray[(prevIndex+sortedPointsArray.length)%sortedPointsArray.length])
        }


        edge1 = scene.getShapes()[sortedPointsArray[i].getPayload()[0]].getLC().getArray()[sortedPointsArray[i].getPayload()[1][0]]
        edge2 = scene.getShapes()[sortedPointsArray[i].getPayload()[0]].getLC().getArray()[sortedPointsArray[i].getPayload()[1][1]]
        
        a = fromPoint
        b = sortedPointsArray[i]
        if (edge1.p1.x == sortedPointsArray[i].x && edge1.p1.y == sortedPointsArray[i].y){
            c1 = edge1.p2
        }else{
            c1 = edge1.p1
        }
        if (edge2.p1.x == sortedPointsArray[i].x && edge2.p1.y == sortedPointsArray[i].y){
            c2 = edge2.p2
        }else{
            c2 = edge2.p1
        }
        edge1Direction = det(a, b, c1, 1)
        edge2Direction = det(a, b, c2, 1)
        if (edge1Direction >= 0){
            resRem1 = T.remove(edge1, broom)
            if (resRem1 == null){
                resRem1 = T.remove(edge1, newBroom)
                if (resRem1 == null){
                    resRem1 = T.remove(edge1, prevBroom)
                    sadsada = 2
                }
            }
        }
        if (edge2Direction >= 0){
            resRem2 = T.remove(edge2, broom)
            if (resRem2 == null){
                resRem2 = T.remove(edge2, newBroom)
                if (resRem2 == null){
                    resRem2 = T.remove(edge2, prevBroom)
                    sadsada = 2
                }
            }
        }
        if (edge1Direction < 0){
            if (BroomIntersection(edge1, newBroom)[0]){
                resIns1 = T.insert(edge1, edge1, newBroom)
            }
            
        }
        if (edge2Direction < 0){
            if (BroomIntersection(edge2, newBroom)[0]){
                resIns2 = T.insert(edge2, edge2, newBroom)
            }
        }
        if (edge1Direction >= 0){
            resRem1 = T.remove(edge1, broom)
            if (resRem1 == null){
                resRem1 = T.remove(edge1, newBroom)
                if (resRem1 == null){
                    resRem1 = T.remove(edge1, prevBroom)
                    sadsada = 2
                }
            }
        }
        if (edge2Direction >= 0){
            resRem2 = T.remove(edge2, broom)
            if (resRem2 == null){
                resRem2 = T.remove(edge2, newBroom)
                if (resRem2 == null){
                    resRem2 = T.remove(edge2, prevBroom)
                    sadsada = 2
                }
            }
        }
        
    }
    array = Array.from(visiblePoints)
    PC = new PointsCollection()
    LC = new LinesCollection()
    for (let i = 0; i < array.length; i++){
        LC.push(fromPoint, array[i])
    }
    PC.pushArray(array)
    return [PC, LC]
}

function visibleVerticesSPRAWDZARKA(polygonsArray, fromPoint){
    pointsFromPolygons = []
    edgesFromPolygons = []
    for (let i = 0; i < polygonsArray.length; i++){
        polygon = polygonsArray[i]
        nextToIndex = 0
        if (polygon.getPC().getArray().length > 1){
            points = polygon.getPC().getArray()
            edges = polygon.getLC().getArray()
            for (let j = 0; j < points.length; j++){
                if (points[j]!=fromPoint){
                    pointsFromPolygons.push(points[j])
                }else{
                    nextToIndex = pointsFromPolygons.length
                }
            }
            for (let j = 0; j < edges.length; j++){
                edgesFromPolygons.push(edges[j])
            }
        }
    }
    pointNextToFromPoint = pointsFromPolygons[nextToIndex]

// pokazujemy wszystkie punkty wielokątów
// potem znikają

    sortedPointsArray = sortByAngle(pointsFromPolygons, fromPoint)
    for (let i = 0; i < sortedPointsArray.length; i++){
        sortedPointsArray[i].setIndex(i)
    }

    // piszemy numerki przed posortowaniem
    // for (let i = 0; i < sortedPointsArray.length; i++){
    //     text(i, sortedPointsArray[i].x, sortedPointsArray[i].y + 15);
    // }
    // piszemy numerki po posortowaniu
    // numerki znikają 
    T = new AVLTree(comparatorT)
    visiblePoints = new Set()
    broom = new Line(fromPoint, sortedPointsArray[0])
    // pokazujemy pierwszą miotłe
    for (let i = 0; i < edgesFromPolygons.length; i++){
        if (BroomIntersection(edgesFromPolygons[i], broom)[0]){
            T.insert(edgesFromPolygons[i], edgesFromPolygons[i], broom)
        }
    }
    // pokazujemy rzeczy znalezione na miotle
    for (let i = 0; i < sortedPointsArray.length; i++){


        broom = new Line(fromPoint, sortedPointsArray[i])
        if (visible(broom, sortedPointsArray[i], sortedPointsArray, T, visiblePoints, 1)){
            visiblePoints.add(sortedPointsArray[i])
        }
        newBroom = new Line(fromPoint, sortedPointsArray[(i+1)%sortedPointsArray.length])
        prevBroom = new Line(fromPoint, sortedPointsArray[(i-1)%sortedPointsArray.length])

        edge1 = scene.getShapes()[sortedPointsArray[i].getPayload()[0]].getLC().getArray()[sortedPointsArray[i].getPayload()[1][0]]
        edge2 = scene.getShapes()[sortedPointsArray[i].getPayload()[0]].getLC().getArray()[sortedPointsArray[i].getPayload()[1][1]]
        
        a = fromPoint
        b = sortedPointsArray[i]
        if (edge1.p1.x == sortedPointsArray[i].x && edge1.p1.y == sortedPointsArray[i].y){
            c1 = edge1.p2
        }else{
            c1 = edge1.p1
        }
        if (edge2.p1.x == sortedPointsArray[i].x && edge2.p1.y == sortedPointsArray[i].y){
            c2 = edge2.p2
        }else{
            c2 = edge2.p1
        }
        edge1Direction = det(a, b, c1, 1)
        edge2Direction = det(a, b, c2, 1)
        if (edge1Direction < 0){
            if (BroomIntersection(edge1, newBroom)[0]){
                resIns1 = T.insert(edge1, edge1, newBroom)
            }
            
        }
        if (edge2Direction < 0){
            if (BroomIntersection(edge2, newBroom)[0]){
                resIns2 = T.insert(edge2, edge2, newBroom)
            }
        }
        if (edge1Direction > 0){
            if (edge1.p1.x == 250 && edge1.p2.x == 300){
                safasf = 4
            }
            resRem1 = T.remove(edge1, broom)
            if (resRem1 == null){
                sadsada = 2
            }
        }
        if (edge2Direction > 0){
            resRem2 = T.remove(edge2, broom)
            if (resRem2 == null){
                sadsada = 2
            }
        }
        
    }
    array = Array.from(visiblePoints)
    PC = new PointsCollection()
    LC = new LinesCollection()
    for (let i = 0; i < array.length; i++){
        LC.push(fromPoint, array[i])
    }
    PC.pushArray(array)
    return [PC, LC]
}

function visibilityGraph(polygonsArray){
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
    graph = []
    graphLC = new LinesCollection()
    for (let i = 0; i < allPointsFromShapesArray.length; i++){
        fromPoint = allPointsFromShapesArray[i]
        resssLC = visibleVertices(polygonsArray, fromPoint)[1]
        graphLC.addLC(resssLC)





        prawidlowy = visibleVerticesSPRAWDZARKA(polygonsArray, fromPoint)
        // prawidlowy[0].draw("blue")
        // prawidlowy[1].draw("greenalpha")
        prawidlowyResult = prawidlowy[0].getArray()
        sprawdzany = visibleVertices(polygonsArray, fromPoint)
        sprawdzanyResult = sprawdzany[0].getArray()

        if (sprawdzanyResult.length > prawidlowyResult.length){
            console.log("Wykrywa za duzo o  " + (sprawdzanyResult.length - prawidlowyResult.length))
        }
        if (sprawdzanyResult.length < prawidlowyResult.length){
            console.log("Wykrywa za malo o  " + (-(sprawdzanyResult.length - prawidlowyResult.length)))
        }
        var flag = 0;
        for (let i = 0; i < prawidlowyResult.length; i++){
            flag = 0
            for (let j = 0; j < sprawdzanyResult.length; j++){
            if (sprawdzanyResult[j] == prawidlowyResult[i]){
                flag = 1
            }
            }
            if (flag == 0){
            console.log("nie wykrywa")
            prawidlowyResult[i].setType("test")
            // sprawdzanyResult[i].draw(20)
            }
        }
        var flag = 0;
        for (let i = 0; i < sprawdzanyResult.length; i++){
            var flag = 0
            for (let j = 0; j < prawidlowyResult.length; j++){
            if (sprawdzanyResult[i] == prawidlowyResult[j]){
                flag = 1
            }
            }
            if (flag == 0){
            console.log("WYKRYWA " + sprawdzanyResult[i].x + " " + sprawdzanyResult[i].y)
            sprawdzanyResult[i].draw(20)
            console.log(fromPoint.x)
            console.log(fromPoint.y)
            }
        }










    }
    return graphLC
}