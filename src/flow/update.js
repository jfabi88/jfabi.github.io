
var flag = true;
var countSpawn = 4;

function setFlag(bool) {
    flag = bool;
}

function setSpawn(num) {
    countSpawn = num;
}

function addRoom(memory, lastObj, wallsA, decorationA, spawn) {
    const toRet = [];
    var elem;
    var light;
    var conPoiA;
    var wall;

    for (var i = 0; i < lastObj.length; i++) {
        conPoiA = lastObj[i].getConnectionPoints();
        for (var j = 0; j < conPoiA.length; j++) {
            wall = takeElement(memory, "Room");
            wall.available = false;
            elem = wall.populate(countSpawn, spawn, (4 - spawn) * 2);
            if (countSpawn == spawn)
                countSpawn = 1;
            else
                countSpawn++;
            wall.obj.visible = true;
            wall.connect(conPoiA[j]);
            wallsA.push(wall);
            toRet.push(wall);
            if (elem[0]) {
                light = takeElement(memory, "CeilingLight");
                if (light) {
                    light.available = false;
                    light.obj.position.x = wall.obj.position.x;
                    light.obj.position.z = wall.obj.position.z;
                    decorationA.push(light);
                }
            }
        }
    }
    return (toRet);
}

function addTransitionRoom(mainScene, memory, elementsArray) {

    const toRet = [];

    const tRoom = createTransitionRoom(memory);
    tRoom.available = false;
    tRoom.connect(mainScene.lastObj[0].getConnectionPoints()[0]);

    if (tRoom.type != "TB")
        tRoom.enabled = true;

    tRoom.obj.visible = true;
    //mainScene.scene.add(tRoom.obj);
    elementsArray.push(tRoom);

    toRet.push(tRoom);

    return(toRet);
}

 function updateScene(mainScene, memory, delta) {
    var toMove = [];
    mainScene.wallsA.forEach(function (elem) {
        elem.obj.position.addScaledVector(new THREE.Vector3(0, 0, 1), mainScene.ambientSpeed * delta);
        if (elem.obj.position.z > 120) {
            for (var i = 0; i < mainScene.lastObj.length; i++) {
                if (mainScene.lastObj[i] == elem) {
                    mainScene.lastObj.splice(i, 1);
                    i--;
                }
            }
            toMove.push(elem);
            if (flag)
                mainScene.distance += 1;
        }
    })
    mainScene.elementsA.forEach(function (elem) {
        elem.obj.position.addScaledVector(new THREE.Vector3(0, 0, 1), mainScene.ambientSpeed * delta);
        if (elem.obj.position.z > 120) {
            removeFromArray(elem, mainScene.elementsA);
            elem.obj.visible = false;
            elem.available = true;
            flag = true;
        }
    });
    mainScene.decorationA.forEach(function (elem) {
        elem.obj.position.addScaledVector(new THREE.Vector3(0, 0, 1), mainScene.ambientSpeed * delta);
        if (elem.obj.position.z > 120) {
            removeFromArray(elem, mainScene.decorationA);
            elem.obj.position.z = -400;
            elem.obj.position.x = -200;
            elem.available = true;
        }
    });
    toMove.forEach(function (elem) {
        elem.empty();
        removeFromArray(elem, mainScene.wallsA);
        elem.obj.visible = false;
        elem.available = true;
        if (mainScene.wallsA.length <= (6 * mainScene.lastObj.length)) {
            mainScene.lastObj = addRoom(memory, mainScene.lastObj, mainScene.wallsA, mainScene.decorationA, mainScene.spawn);
        }
    });
    if (mainScene.distance > mainScene.limitDistance) {
        mainScene.lastObj = addTransitionRoom(mainScene, memory, mainScene.elementsA);
        flag = false;
        mainScene.distance = 0;
        if (mainScene.ambientSpeed < 250)
            mainScene.ambientSpeed += 5;
        countSpawn = 0;
        if ((mainScene.spawn != 2) && (mainScene.score > (5 - mainScene.spawn) * 200))
        {
            countSpawn = 1;
            mainScene.spawn--;
        }
    }
}
