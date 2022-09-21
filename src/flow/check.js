
 function checkIn(cat, tRoomA, wallsA) {
    for (var i = 0; i < tRoomA.length; i++) {
        const room = tRoomA[i];
        if (room.isIn(cat)) {
          return room;
        }
    }
    for (var j = 0; j < wallsA.length; j++) {
        const room = wallsA[j];
        if (room.obj.position.x < 10 && room.obj.position.x > -10 && room.isIn(cat)) {
          return room;
        }
    }
    return null;
}

 function checkAnimation(obstaclesA, cat, group) {
    for (var i = 0; i < obstaclesA.length; i++) {
        if (obstaclesA[i].type == "Turnstile" && obstaclesA[i].enabled) {
            if (obstaclesA[i].checkToAnimate(cat)) {
                obstaclesA[i].activateAnimation(group);
            }
        }
    }
}

 function checkIntersection(obstaclesA, cat) {
    const frontC = cat.obj.position.z - cat.depth / 2;
    const backC = cat.obj.position.z + cat.depth / 2;
    const posO = new THREE.Vector3();
    for (var i = 0; i < obstaclesA.length; i++) {
        obstaclesA[i].obj.getWorldPosition(posO);
        var frontO = posO.z - obstaclesA[i].depth / 2;
        var backO = posO.z + obstaclesA[i].depth / 2;
        if ((frontC > frontO && frontC < backO) || (backC > frontO && backC < backO)) {
            if (obstaclesA[i].checkIntersection(cat)) {
                return true;
            }
        }
    }
    return false;
}