
/*
    ELEMENT MEMORY

    0-19 Room
    20 Transition Room Back
    21 Transition Room Right
    22 Transition Room Left
    23 Transition Room LeftRight

*/

function takeElement(elementMemory, type) {
    if (type == "Room") {
        for (var i = 0; i < 20 - 1; i++) {
            if (elementMemory.roomA[i].available == true) {
                return elementMemory.roomA[i];
            }
        };
    }
    else if (type == "TB")
        return elementMemory.roomA[20];
    else if (type == "TR")
        return elementMemory.roomA[21];
    else if (type == "TL")
        return elementMemory.roomA[22];
    else if (type == "TLR")
        return elementMemory.roomA[23];
    else if (type == "CeilingLight") {
        for (var i = 0; i < 6; i++) {
            if (elementMemory.decorationA[i].available)
                return elementMemory.decorationA[i];
        }
    }
    return null;
}

 function createAllObject(mainScene, roomA, obstacleA, decorationA) {
    const width = mainScene.widthRoom;
    const height = mainScene.heightRoom;
    const depth = mainScene.depthRoom;

    createGeoMatRoom(80, 80, 120, 25, 50, 2, 1.5);
    createGeoMatTransitionRoom(width, height, depth, 4);
    createGeoMatTable();
    createGeoMatBar();
    createGeoMatTurnstile();
    createGeoMatCeilingLamp(5, 2, 5, 0.5);

    var elem;
    for (var i = 0; i < 20; i++) {
        elem = createObjectRoom();
        roomA.push(elem);
        mainScene.scene.add(elem.obj);
        elem.obj.visible = false;
    }
    elem = createTransitionRoomBack(width, height, depth);
    roomA.push(elem);
    mainScene.scene.add(elem.obj);
    elem.obj.visible = false;
    elem = createTransitionRoomRight(width, height, depth);
    roomA.push(elem);
    mainScene.scene.add(elem.obj);
    elem.obj.visible = false;
    elem = createTransitionRoomLeft(width, height, depth);
    roomA.push(elem);
    mainScene.scene.add(elem.obj);
    elem.obj.visible = false;
    elem = createTransitionRoomLeftRight(width, height, depth);
    roomA.push(elem);
    mainScene.scene.add(elem.obj);
    elem.obj.visible = false;


    for (var i = 0; i < 6; i++) {
        elem = createCeilingLampOptimized();
        elem.frustumCulled = false;
        elem.obj.position.y = mainScene.heightRoom - elem.height / 2;
        elem.obj.position.z = -400;
        elem.obj.position.x = -200;
        decorationA.push(elem);
        mainScene.scene.add(elem.obj);
    }
}

 function reset(mainScene, memory) {
    const room = memory.roomA[19];
    const conPoint = room.getConnectionPoints()[0];
    for (var i = 0; i < 19; i++) {
        memory.roomA[i].empty();
        memory.roomA[i].available = true;
        memory.roomA[i].obj.visible = false;
        memory.roomA[i].connect(conPoint);
    }
    for (var i = 20; i < 24; i++) {
        memory.roomA[i].available = true;
        memory.roomA[i].obj.visible = false;
    }
    for (var i = 0; i < 6; i++) {
        memory.decorationA[i].obj.position.x = -200;
        memory.decorationA[i].obj.position.z = -400;
        memory.decorationA[i].available = true;
    }
    mainScene.pause = true;
    mainScene.cat.obj.position.x = 0;
    mainScene.cat.stopAnimation("slip");
    mainScene.cat.stopAnimation("jump");
    mainScene.room = null;
    mainScene.lastObj = [];
    mainScene.wallsA = [];
    mainScene.elementsA = [];
    mainScene.decorationA = [];
    mainScene.distance = 0;
    mainScene.ambientSpeed = 100;
    mainScene.score = 0;
    mainScene.died = false;

    const elem = document.getElementById("pressStart");
    elem.style.visibility = "visible";

    setFlag(true);
    setSpawn(1);
    mainScene.spawn = 4;
}

function createLimit(mainScene) {

    var gardenGeometry = new THREE.PlaneGeometry(1000, 1000);
    const gardenMaterial = new THREE.MeshPhongMaterial( {color: 0x228B22, side: THREE.DoubleSide} );
    const garden = new THREE.Mesh( gardenGeometry, gardenMaterial );
    garden.position.set(500 + 80, 0, -500);
    garden.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    mainScene.scene.add( garden );

    var wallFront = createWall(
        new THREE.MeshPhongMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
        }),
        mainScene.widthRoom,
        mainScene.heightRoom);
    wallFront.position.y = mainScene.heightRoom / 2;
    wallFront.position.z = -250;
    mainScene.scene.add(wallFront);
}

function createWay(mainScene, memory) {
    
    var room;

    for (var i = 0; i < 6; i++) {
        room = takeElement(memory, "Room");
        room.available = false;
        room.obj.position.z = mainScene.depthRoom / 2 - (mainScene.depthRoom * i);
        mainScene.wallsA.push(room);
        room.obj.visible = true;
    }

    mainScene.lastObj = [mainScene.wallsA[5]];
}
