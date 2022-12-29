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
        if (det(fromPoint, quadrant1firstpoint, quadrant1sorted[i], 1) == 1){
            quadrant1firstpoint = quadrant1sorted[i]
        }
        if (det(fromPoint, quadrant1firstpoint, quadrant1sorted[i], 1) == 0){
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
        if (det(fromPoint, quadrant2firstpoint, quadrant2sorted[i], 1) == 1){
            quadrant2firstpoint = quadrant2sorted[i]
        }
        if (det(fromPoint, quadrant2firstpoint, quadrant2sorted[i], 1) == 0){
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
        if (det(fromPoint, quadrant3firstpoint, quadrant3sorted[i], 1) == 1){
            quadrant3firstpoint = quadrant3sorted[i]
        }
        if (det(fromPoint, quadrant3firstpoint, quadrant3sorted[i], 1) == 0){
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
        if (det(fromPoint, quadrant4firstpoint, quadrant4sorted[i], 1) == 1){
            quadrant4firstpoint = quadrant4sorted[i]
        }
        if (det(fromPoint, quadrant4firstpoint, quadrant4sorted[i], 1) == 0){
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


function orientationCheck(poly){
    points = poly.getPC().getArray()
    if (points.length < 3){
        return 0
    }
    firstIndex = 0
    firstPoint = points[0]
    for (let i = 0; i < points.length; i++){
        tmp = points[i].getPayload()
        if (tmp.length < 4){
            tmp.push([i, null])
            points[i].setPayload(tmp)
        }else{
            tmp[3] = [i, tmp[3][1]]
            points[i].setPayload(tmp)
        }
        
        if (points[i].y < firstPoint.y){
            firstPoint = points[i]
            firstIndex = i
        }
    }
    secondPoint = new Point(firstPoint.x-100, firstPoint.y)
    secondIndex = 0
    i = 0
    for (let i = 0; i < points.length; i++){
        determinant = det(firstPoint, secondPoint, points[i], 1)
        if ((determinant < 0 && !(points[i].x == firstPoint.x && points[i].y == firstPoint.y)) ||
        (determinant == 0 && !(points[i].x == firstPoint.x && points[i].y == firstPoint.y) && 
            distance(secondPoint, firstPoint) < distance(points[i], firstPoint))){
            if (!(points[i].x == firstPoint.x && points[i].y == firstPoint.y)){
                secondPoint = points[i]
                secondIndex = i
            }
        }
    }
    a = secondPoint
    thirdIndex = 0
    thirdPoint = firstPoint
    for (let i = 0; i < points.length; i++){
        determinant = det(secondPoint, thirdPoint, points[i], 1)
        if ((determinant < 0 && !(points[i].x == secondPoint.x && points[i].y == secondPoint.y)) ||
         (determinant == 0 && !(points[i].x == secondPoint.x && points[i].y == secondPoint.y) &&
         (distance(thirdPoint, secondPoint) < distance(points[i], secondPoint)))){
                thirdPoint = points[i]
                thirdIndex = i
             }
            
    }
    
    if ((firstIndex < secondIndex && secondIndex < thirdIndex) ||
         (thirdIndex < firstIndex && firstIndex < secondIndex) ||
         (secondIndex < thirdIndex && thirdIndex < firstIndex)){
            return 1
         }
    return -1

}






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

function intersectsInterior(pivot, broom, orientations){
    if (pivot.payload[0] == broom.p2.payload[0]){
        poly = scene.getShapes()[broom.p2.payload[0]]
        points = poly.getPC().getArray();
        if (points.length < 3 || scene.getShapes()[broom.p2.payload[0]].getPC().getArray().length < 3){
            return false
        }
        angle = 0
        if (orientations[pivot.payload[0]] == 0){
            return false
        }else if (orientations[pivot.payload[0]] == 1){
            // Clockwise
            edge1 = new Line(points[(broom.p2.payload[3][0]-1+points.length)% points.length], broom.p2)
            edge2 = new Line(broom.p2, points[(broom.p2.payload[3][0]+1)% points.length])
            if (isTheSameLine(edge1, broom) || isTheSameLine(edge2, broom)){
                return false
            }
            angle = det(edge1.p1, broom.p2, edge2.p2, 1)
            if (det(edge1.p1, edge1.p2, pivot, 1) == 1 && det(edge2.p1, edge2.p2, pivot, 1) == 1){
                return true
            }
            if (det(edge1.p1, edge1.p2, pivot, 1) == -1 && det(edge2.p1, edge2.p2, pivot, 1) == -1){
                return false
            }
            if (det(edge1.p1, edge1.p2, pivot, 1) * det(edge2.p1, edge2.p2, pivot, 1) == 0){
                delta = 0.000001
                p11 = new Point(pivot.x - delta, pivot.y - delta)
                p12 = new Point(pivot.x + delta, pivot.y - delta)
                p13 = new Point(pivot.x - delta, pivot.y + delta)
                p14 = new Point(pivot.x + delta, pivot.y + delta)
                p11.setPayload(pivot.payload)
                p12.setPayload(pivot.payload)
                p13.setPayload(pivot.payload)
                p14.setPayload(pivot.payload)
                broom1 = new Line(p11, broom.p2)
                broom2 = new Line(p12, broom.p2)
                broom3 = new Line(p13, broom.p2)
                broom4 = new Line(p14, broom.p2)
                det1 = det(broom.p1, broom.p2, p11, 1)
                det2 = det(broom.p1, broom.p2, p12, 1)
                det3 = det(broom.p1, broom.p2, p13, 1)
                det4 = det(broom.p1, broom.p2, p14, 1)
                res1 = null
                res2 = null
                res3 = null
                res4 = null
                ans = []
                if (det1 != 0){
                    res1 = intersectsInterior(p11, broom1, orientations)
                    ans.push(res1)
                }
                if (det2 != 0){
                    res2 = intersectsInterior(p12, broom2, orientations)
                    ans.push(res2)
                }
                if (det3 != 0){
                    res3 = intersectsInterior(p13, broom3, orientations)
                    ans.push(res3)
                }
                if (det4 != 0){
                    res4 = intersectsInterior(p14, broom4, orientations)
                    ans.push(res4)
                }
                if (ans[0] == ans[1]){
                    return ans[0]
                }
                return false
    
            }
            if (angle == 1){
                return false
            }
            if (angle == -1){
                return true
            }
        }else{
            // Counter
            edge1 = new Line(points[(broom.p2.payload[3][0]+1)% points.length], broom.p2)
            edge2 = new Line(broom.p2, points[(broom.p2.payload[3][0]-1+points.length)% points.length])
            if (isTheSameLine(edge1, broom) || isTheSameLine(edge2, broom)){
                return false
            }
            angle = -det(edge1.p1, broom.p2, edge2.p2, 1)
            if (det(edge1.p1, edge1.p2, pivot, 1) == 1 && det(edge2.p1, edge2.p2, pivot, 1) == 1){
                return true
            }
            if (det(edge1.p1, edge1.p2, pivot, 1) == -1 && det(edge2.p1, edge2.p2, pivot, 1) == -1){
                return false
            }
            if (det(edge1.p1, edge1.p2, pivot, 1) * det(edge2.p1, edge2.p2, pivot, 1) == 0){
                delta = 0.000001
                p11 = new Point(pivot.x - delta, pivot.y - delta)
                p12 = new Point(pivot.x + delta, pivot.y - delta)
                p13 = new Point(pivot.x - delta, pivot.y + delta)
                p14 = new Point(pivot.x + delta, pivot.y + delta)
                p11.setPayload(pivot.payload)
                p12.setPayload(pivot.payload)
                p13.setPayload(pivot.payload)
                p14.setPayload(pivot.payload)
                broom1 = new Line(p11, broom.p2)
                broom2 = new Line(p12, broom.p2)
                broom3 = new Line(p13, broom.p2)
                broom4 = new Line(p14, broom.p2)
                det1 = det(broom.p1, broom.p2, p11, 1)
                det2 = det(broom.p1, broom.p2, p12, 1)
                det3 = det(broom.p1, broom.p2, p13, 1)
                det4 = det(broom.p1, broom.p2, p14, 1)
                res1 = null
                res2 = null
                res3 = null
                res4 = null
                ans = []
                if (det1 != 0){
                    res1 = intersectsInterior(p11, broom1, orientations)
                    ans.push(res1)
                }
                if (det2 != 0){
                    res2 = intersectsInterior(p12, broom2, orientations)
                    ans.push(res2)
                }
                if (det3 != 0){
                    res3 = intersectsInterior(p13, broom3, orientations)
                    ans.push(res3)
                }
                if (det4 != 0){
                    res4 = intersectsInterior(p14, broom4, orientations)
                    ans.push(res4)
                }
                if (ans[0] == ans[1]){
                    return ans[0]
                }
                return false
            }
            if (angle == 1){
                return true
            }
            if (angle == -1){
                return false
            }
        }
        // if (det(edge1.p1, edge1.p2, pivot, 1) == 1 && det(edge2.p1, edge2.p2, pivot, 1) == 1){
        //     return true
        // }
        // if (det(edge1.p1, edge1.p2, pivot, 1) == -1 && det(edge2.p1, edge2.p2, pivot, 1) == -1){
        //     return false
        // }
        
        return false
    }
    return false





    // Stare
    // if (pivot.payload[0] == broom.p2.payload[0]){
    //     poly = scene.getShapes()[pivot.payload[0]]
    //     edges = poly.getLC().getArray();
    //     for (let i = 0; i < edges.length; i++){
    //         if ((edges[i].p1.x == broom.p1.x && edges[i].p1.y == broom.p1.y && 
    //             edges[i].p2.x == broom.p2.x && edges[i].p2.y == broom.p2.y) ||
    //             (edges[i].p1.x == broom.p2.x && edges[i].p1.y == broom.p2.y && 
    //             edges[i].p2.x == broom.p1.x && edges[i].p2.y == broom.p1.y)){
    //                 return false
    //             }
    //     }
    //     halfpoint = new Point((pivot.x+broom.p2.x)/2, (pivot.y + broom.p2.y)/2)
    //     return isPointInsidePolygon(pivot.payload[0], halfpoint)
    // }
    // return false
}

function visible(broom, checkedPoint, sortedPointsArray, tree, visiblePoints, orientations, animate=0, currentStep=0){
    pivot = broom.p1
    if (intersectsInterior(pivot, broom, orientations)){
        return false
    }else if (checkedPoint.payload[2] == 0 || 
        det(broom.p1, broom.p2, sortedPointsArray[checkedPoint.payload[2]-1], 1) != 0){
            // pokazujemy minimalną krawędź i czy się przecina
            // potentialEdge = tree.findMin(broom)
            // if (potentialEdge != null){
            //     potentialEdge = potentialEdge.key
            //     step ++
            //     if (currentStep < step && animate){
            //         potentialEdge.draw("minimalEdge")
            //         broom.draw("animation")
            //         array = Array.from(visiblePoints)
            //         PC = new PointsCollection()
            //         LC = new LinesCollection()
            //         for (let i = 0; i < array.length; i++){
            //             LC.push(fromPoint, array[i])
            //         }
            //         PC.pushArray(array)
            //         return ["return", PC, LC]
            //     }
            //     if (LineIntersection(potentialEdge, broom, "checkBoundaries")[0]){
            //         step ++
            //         if (currentStep < step && animate){
            //             LineIntersectionThatOutputsPoint(potentialEdge, broom).draw("intersection")
            //             potentialEdge.draw("minimalEdge")
            //             broom.draw("animation")
            //             array = Array.from(visiblePoints)
            //             PC = new PointsCollection()
            //             LC = new LinesCollection()
            //             for (let i = 0; i < array.length; i++){
            //                 LC.push(fromPoint, array[i])
            //             }
            //             PC.pushArray(array)
            //             return ["return", PC, LC]
            //         }
            //         // jak jest przecięcie to pokazujemy punkt
            //         return false
            //     }
            // }
            potentialEdge = tree.min()
            
            if (potentialEdge != null){
                step ++
                if (currentStep < step && animate){
                    edges = T.values()
                    for (let i = 0; i < edges.length; i++){
                        edges[i].draw("intersectingEdge")
                    }
                    potentialEdge.draw("minimalEdge")
                    broom.draw("animation")
                    array = Array.from(visiblePoints)
                    PC = new PointsCollection()
                    LC = new LinesCollection()
                    for (let i = 0; i < array.length; i++){
                        LC.push(fromPoint, array[i])
                    }
                    PC.pushArray(array)
                    return ["return", PC, LC]
                }
                if (LineIntersection(potentialEdge, broom, "checkBoundaries")[0]){
                    step ++
                    if (currentStep < step && animate){
                        edges = T.values()
                        for (let i = 0; i < edges.length; i++){
                            edges[i].draw("intersectingEdge")
                        }
                        LineIntersectionThatOutputsPoint(potentialEdge, broom).draw("intersection")
                        potentialEdge.draw("minimalEdge")
                        broom.draw("animation")
                        array = Array.from(visiblePoints)
                        PC = new PointsCollection()
                        LC = new LinesCollection()
                        for (let i = 0; i < array.length; i++){
                            LC.push(fromPoint, array[i])
                        }
                        PC.pushArray(array)
                        return ["return", PC, LC]
                    }
                    return false
                }
            }
            return true
        }
    else if (!visiblePoints.has(sortedPointsArray[checkedPoint.payload[2]-1]) ||
    intersectsInterior(sortedPointsArray[checkedPoint.payload[2]-1], new Line(sortedPointsArray[checkedPoint.payload[2]-1], checkedPoint), orientations)){
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

function visibleVertices(polygonsArray, fromPoint, animate = 0, currentStep = 0){

    step = 0

    polygonsOrientation = []

    pointsFromPolygons = []
    edgesFromPolygons = []
    for (let i = 0; i < polygonsArray.length; i++){

        polygon = polygonsArray[i]
        nextToIndex = 0
        if (polygon.getPC().getArray().length > 1){

            polygonsOrientation.push(orientationCheck(polygon))

            points = polygon.getPC().getArray()
            // if (polygonsOrientation[i] == 1){
            //     text("CLOCKWISE", points[0].x, points[0].y)
            // }else if (polygonsOrientation[i] == -1){
            //     text("COUNTERCLOCKWISE", points[0].x, points[0].y)
            // }else{
            //     console.log("ASSSSSSSSSS")
            //     text("tuturutuniewiadomo", points[0].x, points[0].y)
            // }
            // console.log()
            
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
        }else{
            polygonsOrientation.push(0)
        }
    }

    // for (let i = 0; i < pointsFromPolygons.length; i++){
    //     flag = 0
    //     for (let j = 0; j < pointsFromPolygons.length; j++){
    //         if (pointsFromPolygons[i].x == pointsFromPolygons[j].x && pointsFromPolygons[i].y == pointsFromPolygons[j].y){
    //             flag++
    //         }
    //     }
    //     if (flag > 1){
    //         console.log("ten sam punkt")
    //         console.log(pointsFromPolygons[i].x)
    //         console.log(pointsFromPolygons[i].y)
    //     }
    // }
    pointNextToFromPoint = pointsFromPolygons[nextToIndex]

    // pokazujemy wszystkie punkty wielokątów\
    step ++
    if (currentStep < step && animate){
        for (let i = 0; i < pointsFromPolygons.length; i++){
            pointsFromPolygons[i].draw("animation")
        }
        PC = new PointsCollection()
        LC = new LinesCollection()
        return [PC, LC]
    }
    
    // potem znikają
    step ++
    if (currentStep < step && animate){
        PC = new PointsCollection()
        LC = new LinesCollection()
        return [PC, LC]
    }
    // piszemy numerki przed posortowaniem
    step ++
    if (currentStep < step && animate){
        for (let i = 0; i < pointsFromPolygons.length; i++){
            text(i, pointsFromPolygons[i].x, pointsFromPolygons[i].y + 15);
        }
        PC = new PointsCollection()
        LC = new LinesCollection()
        return [PC, LC]
    }

    sortedPointsArray = sortByAngle(pointsFromPolygons, fromPoint)
    for (let i = 0; i < sortedPointsArray.length; i++){
        sortedPointsArray[i].setIndex(i)
    }
    

    
    
    // piszemy numerki po posortowaniu
    step ++
    if (currentStep < step && animate){
        for (let i = 0; i < sortedPointsArray.length; i++){
            text(i, sortedPointsArray[i].x, sortedPointsArray[i].y + 15);
        }
        PC = new PointsCollection()
        LC = new LinesCollection()
        return [PC, LC]
    }
    // numerki znikają 
    step ++
    if (currentStep < step && animate){
        PC = new PointsCollection()
        LC = new LinesCollection()
        return [PC, LC]
    }
    T = new AVLTree(comparatorT)
    visiblePoints = new Set()
    broom = new Line(fromPoint, sortedPointsArray[0])
    nextIndex = 0
    infiniteLoopCheck = 0
    newBroom = new Line(fromPoint, sortedPointsArray[(nextIndex)%sortedPointsArray.length])
    while (det(broom.p1, broom.p2, newBroom.p2, 1) == 0){
        if (infiniteLoopCheck > sortedPointsArray.length + 2){
            break
        }
        infiniteLoopCheck++
        nextIndex++
        newBroom = new Line(fromPoint, sortedPointsArray[(nextIndex)%sortedPointsArray.length])
    }
    
    // pokazujemy pierwszą miotłe
    step ++
    if (currentStep < step && animate){
        broom.draw("animation")
        PC = new PointsCollection()
        LC = new LinesCollection()
        return [PC, LC]
    }
    for (let i = 0; i < edgesFromPolygons.length; i++){
        if (BroomIntersection(edgesFromPolygons[i], broom)[0]){
            T.insert(edgesFromPolygons[i], edgesFromPolygons[i], newBroom)
        }
    }
    
    // pokazujemy rzeczy znalezione na miotle
    step ++
    if (currentStep < step && animate){
        edges = T.values()
        for (let i = 0; i < edges.length; i++){
            edges[i].draw("intersectingEdge")
        }
        broom.draw("animation")
        PC = new PointsCollection()
        LC = new LinesCollection()
        return [PC, LC]
    }
    for (let i = 0; i < sortedPointsArray.length; i++){
        // CAŁY CZAS STAN DRZEWA WYŚWIETLONY
        broom = new Line(fromPoint, sortedPointsArray[i])
        step ++
        if (currentStep < step && animate){
            edges = T.values()
            for (let i = 0; i < edges.length; i++){
                edges[i].draw("intersectingEdge")
            }
            broom.draw("animation")
            array = Array.from(visiblePoints)
            PC = new PointsCollection()
            LC = new LinesCollection()
            for (let i = 0; i < array.length; i++){
                LC.push(fromPoint, array[i])
            }
            PC.pushArray(array)
            return [PC, LC]
        }
        visibilityResult = visible(broom, sortedPointsArray[i], sortedPointsArray, T, visiblePoints, polygonsOrientation, animate, currentStep)
        if (visibilityResult[0] == "return"){
            return [visibilityResult[1], visibilityResult[2]]
        }
        if (visibilityResult){
            // pokazujemy że dodaliśmy 
            step ++
            if (currentStep < step && animate){
                edges = T.values()
                for (let i = 0; i < edges.length; i++){
                    edges[i].draw("intersectingEdge")
                }
                sortedPointsArray[i].draw("visible")
                array = Array.from(visiblePoints)
                PC = new PointsCollection()
                LC = new LinesCollection()
                for (let i = 0; i < array.length; i++){
                    LC.push(fromPoint, array[i])
                }
                PC.pushArray(array)
                return [PC, LC]
            }
            visiblePoints.add(sortedPointsArray[i])
        }
        nextIndex = i+1
        infiniteLoopCheck = 0
        newBroom = new Line(fromPoint, sortedPointsArray[(nextIndex)%sortedPointsArray.length])
        while (det(broom.p1, broom.p2, newBroom.p2, 1) == 0){
            if (infiniteLoopCheck > sortedPointsArray.length + 2){
                break
            }
            infiniteLoopCheck++
            nextIndex++
            newBroom = new Line(fromPoint, sortedPointsArray[(nextIndex)%sortedPointsArray.length])
        }


        prevIndex = i-1
        prevBroom = new Line(fromPoint, sortedPointsArray[(i-1+sortedPointsArray.length)%sortedPointsArray.length])
        while (det(broom.p1, broom.p2, prevBroom.p2, 1) == 0){
            if (infiniteLoopCheck > sortedPointsArray.length + 2){
                break
            }
            infiniteLoopCheck++
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


function visibilityGraph(polygonsArray, animate = 0, currentStep = 0){
    step = 0
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
        step ++
        if (currentStep < step && animate){
            return graphLC
        }
        fromPoint = allPointsFromShapesArray[i]
        resssLC = visibleVertices(polygonsArray, fromPoint)[1]
        graphLC.addLC(resssLC)
    }
    return graphLC
}

function visibilityGraphNaive(polygonsArray, animate = 0, currentStep = 0){
    step = 0
    allPointsFromShapesArray = []    
    edgesFromPolygons = []
    polygonsOrientation = []
    for (let i = 0; i < polygonsArray.length; i++){
        polygon = polygonsArray[i]
        if (polygon.getPC().getArray().length > 1){
            polygonsOrientation.push(orientationCheck(polygon))
            points = polygon.getPC().getArray()
            edges = polygon.getLC().getArray()
            for (let j = 0; j < points.length; j++){
              allPointsFromShapesArray.push(points[j])
            }
            for (let j = 0; j < edges.length; j++){
                edgesFromPolygons.push(edges[j])
            }
          }  
      }
    graphLC = new LinesCollection()
    for (let i = 0; i < allPointsFromShapesArray.length; i++){
        for (let j = 0; j < allPointsFromShapesArray.length; j++){
            if (i != j){
                flag = 0
                edgeIJ = new Line(allPointsFromShapesArray[i], allPointsFromShapesArray[j])
                for (let k = 0; k < edgesFromPolygons.length; k++){
                        
                    if (LineIntersection(edgesFromPolygons[k], edgeIJ, "checkBoundaries")[0] || intersectsInterior(edgeIJ.p1, edgeIJ, polygonsOrientation)){
                        flag = 1
                        break;
                    }
                    // dla i-tego wierzchołka sprawdzamy, czy odcinek i-j jest przecinany przez krawędź k, jeśli nie, to dodajemy krawedz
                    
                }
                if (flag == 0){
                    graphLC.push(edgeIJ.p1, edgeIJ.p2)
                }
            }
            
        }
    }
    return graphLC
}