
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
    for (var i = 0; i < obstaclesA.length; i++) {
        if (cat.checkIntersection(obstaclesA[i]))
            return true;
    }
    return false;
}