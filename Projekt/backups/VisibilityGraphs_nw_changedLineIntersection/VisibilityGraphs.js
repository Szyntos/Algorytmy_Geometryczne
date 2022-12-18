function distance(p1, p2){
    return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p1.y)**2)
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

function LineIntersection_nw(l1, l2, boundaries=1) {
    if ((l1.p1.x == l2.p1.x && l1.p1.y == l2.p1.y) ||(l1.p1.x == l2.p2.x && l1.p1.y == l2.p2.y) ||
    (l1.p2.x == l2.p1.x && l1.p2.y == l2.p1.y) || (l1.p2.x == l2.p2.x && l1.p2.y == l2.p2.y)){
        if (boundaries == 1){
            return [0, new Point(0, 0)]
        }
        
    }
    licznik_a = (l1.p2.y - l1.p1.y)
    licznik_c = (l2.p2.y - l2.p1.y)
    mianownik_a = (l1.p2.x - l1.p1.x)
    mianownik_c = (l2.p2.x - l2.p1.x)
    if (mianownik_a == 0){
        if (mianownik_c == 0){
            return [0, new Point(0, 0)]
        }
        c = licznik_c / mianownik_c
        d = l2.p2.y - c * l2.p2.x
        p = new Point(l1.p1.x, c * l1.p1.x + d)
        mi = min(l2.p1.x, l2.p2.x)
        ma = max(l2.p1.x, l2.p2.x)
        if (l1.p1.x >= mi && l1.p1.x <= ma){
            return [1, p]
        }
        return [0, p]
    }
    if (mianownik_c == 0){
        a = licznik_a / mianownik_a
        b = l1.p2.y - a * l1.p2.x
        p = new Point(l2.p1.x, a * l2.p1.x + b)
        mi = min(l1.p1.x, l1.p2.x)
        ma = max(l1.p1.x, l1.p2.x)
        if (l2.p1.x >= mi && l2.p1.x <= ma){
            return [0, p]
        }
        return [1, p]
    }
    a = licznik_a / mianownik_a
    b = l1.p2.y - a * l1.p2.x
    c = licznik_c / mianownik_c
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
        if (boundaries == 1){
            return [0, p]
        }
        return [1, p]
    }
}

function LineIntersection(l1, l2, boundaries=1){
    if (isTheSameLine(l1, l2)){
        return [0, new Point(0, 0)]
    }
    if (hasAtLeastOneSamePoint(l1, l2)){
        if (boundaries == 1){
            return [0, new Point(0, 0)]
        }
    }
    licznik_a = (l1.p2.y - l1.p1.y)
    licznik_c = (l2.p2.y - l2.p1.y)
    mianownik_a = (l1.p2.x - l1.p1.x)
    mianownik_c = (l2.p2.x - l2.p1.x)
    if (mianownik_a == 0 && mianownik_c == 0){
        return [0, new Point(0, 0)]
    }
    if (mianownik_a == 0){
        c = licznik_c / mianownik_c
        d = l2.p2.y - c * l2.p2.x
        p = new Point(l1.p1.x, c * l1.p1.x + d)
        if (boundaries == 0){
            return [1, p]
        }
        minimum1X = min(l1.p1.x, l1.p2.x)
        maximum1X = max(l1.p1.x, l1.p2.x)
        minimum1Y = min(l1.p1.y, l1.p2.y)
        maximum1Y = max(l1.p1.y, l1.p2.y)
        minimum2X = min(l2.p1.x, l2.p2.x)
        maximum2X = max(l2.p1.x, l2.p2.x)
        minimum2Y = min(l2.p1.y, l2.p2.y)
        maximum2Y = max(l2.p1.y, l2.p2.y)
        if (p.x <= maximum1X && p.x >= minimum1X &&
            p.y <= maximum1Y && p.y >= minimum1Y){
            if (boundaries == 2){
                return [1, p]
            }
            if (p.x <= maximum1X && p.x >= minimum1X &&
                p.y <= maximum1Y && p.y >= minimum1Y){
                if (boundaries == 1){
                    return [1, p]
                }
            }
            return [0, p]

        }

    }
    if (mianownik_c == 0){
        a = licznik_a / mianownik_a
        b = l1.p2.y - a * l1.p2.x
        p = new Point(l2.p1.x, a * l2.p1.x + b)
        if (boundaries == 0){
            return [1, p]
        }
        minimum1X = min(l1.p1.x, l1.p2.x)
        maximum1X = max(l1.p1.x, l1.p2.x)
        minimum1Y = min(l1.p1.y, l1.p2.y)
        maximum1Y = max(l1.p1.y, l1.p2.y)
        minimum2X = min(l2.p1.x, l2.p2.x)
        maximum2X = max(l2.p1.x, l2.p2.x)
        minimum2Y = min(l2.p1.y, l2.p2.y)
        maximum2Y = max(l2.p1.y, l2.p2.y)
        if (p.x <= maximum1X && p.x >= minimum1X &&
            p.y <= maximum1Y && p.y >= minimum1Y){
            if (boundaries == 2){
                return [1, p]
            }
            if (p.x <= maximum1X && p.x >= minimum1X &&
                p.y <= maximum1Y && p.y >= minimum1Y){
                if (boundaries == 1){
                    return [1, p]
                }
            }
            return [0, p]

        }

    }
    a = licznik_a / mianownik_a
    b = l1.p2.y - a * l1.p2.x
    c = licznik_c / mianownik_c
    d = l2.p2.y - c * l2.p2.x
    x = (d - b) / (a - c)
    y = a * x + b
    p = new Point(x, y)
    if (boundaries == 0){
        return [1, p]
    }
    minimum1X = min(l1.p1.x, l1.p2.x)
    maximum1X = max(l1.p1.x, l1.p2.x)
    minimum1Y = min(l1.p1.y, l1.p2.y)
    maximum1Y = max(l1.p1.y, l1.p2.y)
    minimum2X = min(l2.p1.x, l2.p2.x)
    maximum2X = max(l2.p1.x, l2.p2.x)
    minimum2Y = min(l2.p1.y, l2.p2.y)
    maximum2Y = max(l2.p1.y, l2.p2.y)
    if (p.x <= maximum1X && p.x >= minimum1X &&
        p.y <= maximum1Y && p.y >= minimum1Y){
        if (boundaries == 2){
            return [1, p]
        }
        if (p.x <= maximum1X && p.x >= minimum1X &&
            p.y <= maximum1Y && p.y >= minimum1Y){
            if (boundaries == 1){
                return [1, p]
            }
        }
        return [0, p]

    }
    return [0, p]
}

function BroomIntersectionWithoutBoundaries(l1, broom) {
    return LineIntersection(l1, broom, 2)
}
function BroomIntersectionInfiniteBroom(l1, broom) {
    return LineIntersection(l1, broom, 2)
}



function comparatorT(a, b, x = -1) {
    // x = broom
    if (x != -1) {
        pointA = BroomIntersectionWithoutBoundaries(a, x)
        pointB = BroomIntersectionWithoutBoundaries(b, x)

        // if (!pointA[0] || !pointB[0]){
        //     // console.log("nie znaleziono przeciecia comparator")
        //     return 0
        // }
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
    tmpBroom = new Line(p, new Point(-100, -100))
    cnt = 0;
    for (let i = 0; i < edges.length; i++){
        possibleIntersection = LineIntersection(edges[i], tmpBroom)
        if (possibleIntersection[0]){
            interEdges.push(edges[i])
            cnt++
        }
        // cnt += LineIntersection(edges[i], tmpBroom)[0]
        
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
                edges[i].p1.x == broom.p2.x && edges[i].p1.y == broom.p2.y && 
                edges[i].p2.x == broom.p1.x && edges[i].p2.y == broom.p1.y){
                    return false
                }
        }
        
        halfpoint = new Point((pivot.x+broom.p2.x)/2,
        (pivot.y + broom.p2.y)/2)

        return isPointInsidePolygon(pivot.payload[0], halfpoint)
    }
    return false
}

function visible(broom, checkedPoint, sortedPointsArray, tree, visiblePoints){
    pivot = broom.p1
    if (intersectsInterior(pivot, broom)){
        return false
    }else if (checkedPoint.payload[2] == 0 || 
        det(broom.p1, broom.p2, sortedPointsArray[checkedPoint.payload[2]-1]) != 0){
            edgesOnTree = tree.values()
            for (let i = 0; i < edgesOnTree.length; i++){
                if (LineIntersection(edgesOnTree[i], broom)[0]){
                    return false
                }
            }
            potentialEdge = tree.min()
            if (potentialEdge != null){
                if (LineIntersection(potentialEdge, broom)[0]){
                    return false
                }
                
            }
            return true
        }
    else if (!visiblePoints.has(sortedPointsArray[checkedPoint.payload[2]-1])){
        return false
    }else{
        edgeFromPreviousPoint = new Line(sortedPointsArray[checkedPoint.payload[2]-1], checkedPoint)
        edgesOnTree = tree.values()
        for (let i = 0; i < edgesOnTree.length; i++){
            if (LineIntersection(edgesOnTree[i], edgeFromPreviousPoint)[0]){
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
    pointNextToFromPoint = pointsFromPolygons[nextToIndex]
    sortedPointsArray = quickSort_angle(pointsFromPolygons, 0, pointsFromPolygons.length - 1, fromPoint);
    for (let i = 0; i < sortedPointsArray.length; i++){
        sortedPointsArray[i].setIndex(i)
    }
    // indexOffset = pointNextToFromPoint.getPayload()[2]

    // for (let i = 0; i < sortedPointsArray.length; i++){
    //     sortedPointsArray[i].setIndex((i - indexOffset+sortedPointsArray.length)%sortedPointsArray.length)
    // }
    // sortedPointsArray = sortedPointsArray.slice(indexOffset).concat(sortedPointsArray.slice(0, indexOffset))
    // b = a.slice(2).concat(a.slice(0, 2))
    for (let i = 0; i < sortedPointsArray.length; i++){
        text(i, sortedPointsArray[i].x, sortedPointsArray[i].y + 15);
    }


    T = new AVLTree(comparatorT)
    visiblePoints = new Set()
    broom = new Line(fromPoint, sortedPointsArray[0])

    for (let i = 0; i < edgesFromPolygons.length; i++){
        if (BroomIntersectionInfiniteBroom(edgesFromPolygons[i], broom)[0]){
            T.insert(edgesFromPolygons[i], edgesFromPolygons[i], broom)
        }
    }
    for (let i = 0; i < sortedPointsArray.length; i++){
        if (i == 27){
            ssssss = 2
        } 

        broom = new Line(fromPoint, sortedPointsArray[i])
        // T.insert()
        if (visible(broom, sortedPointsArray[i], sortedPointsArray, T, visiblePoints)){
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
            if (BroomIntersectionInfiniteBroom(edge1, newBroom)[0]){
                resIns1 = T.insert(edge1, edge1, newBroom)
            }
            
        }
        if (edge2Direction < 0){
            if (BroomIntersectionInfiniteBroom(edge2, newBroom)[0]){
                resIns2 = T.insert(edge2, edge2, newBroom)
            }
        }
        if (edge1Direction >= 0){
            resRem1 = T.remove(edge1, broom)
        }
        if (edge2Direction >= 0){
            resRem2 = T.remove(edge2, broom)
        }
        // console.log(T.toString())
        
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