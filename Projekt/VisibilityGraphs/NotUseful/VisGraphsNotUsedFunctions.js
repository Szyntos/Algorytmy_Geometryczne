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
// SPRAWDZARKA
    // prawidlowy = visibleVerticesSPRAWDZARKA(s.getShapes(), fromPoint)
    // prawidlowy[0].draw("blue")
    // prawidlowy[1].draw("greenalpha")
    // prawidlowyResult = prawidlowy[0].getArray()
    // sprawdzany = visibleVertices(s.getShapes(), fromPoint)
    // sprawdzanyResult = sprawdzany[0].getArray()

    // if (sprawdzanyResult.length > prawidlowyResult.length){
    //   console.log("Wykrywa za duzo o  " + (sprawdzanyResult.length - prawidlowyResult.length))
    // }
    // if (sprawdzanyResult.length < prawidlowyResult.length){
    //   console.log("Wykrywa za malo o  " + (-(sprawdzanyResult.length - prawidlowyResult.length)))
    // }
    // var flag = 0;
    // for (let i = 0; i < prawidlowyResult.length; i++){
    //   flag = 0
    //   for (let j = 0; j < sprawdzanyResult.length; j++){
    //     if (sprawdzanyResult[j] == prawidlowyResult[i]){
    //       flag = 1
    //     }
    //   }
    //   if (flag == 0){
    //     console.log("nie wykrywa")
    //     prawidlowyResult[i].setType("test")
    //     // sprawdzanyResult[i].draw(20)
    //   }
    // }
    // var flag = 0;
    // for (let i = 0; i < sprawdzanyResult.length; i++){
    //   var flag = 0
    //   for (let j = 0; j < prawidlowyResult.length; j++){
    //     if (sprawdzanyResult[i] == prawidlowyResult[j]){
    //       flag = 1
    //     }
    //   }
    //   if (flag == 0){
    //     console.log("WYKRYWA " + sprawdzanyResult[i].x + " " + sprawdzanyResult[i].y)
    //     sprawdzanyResult[i].draw(20)
    //     console.log(fromPoint.x)
    //     console.log(fromPoint.y)
    //   }
    // }

    // SPRAWDZARKA


