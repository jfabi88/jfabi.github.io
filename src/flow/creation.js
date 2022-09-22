
 function createAllObject(mainScene, roomA, obstacleA, decorationA) {
    const width = mainScene.widthRoom;
    const height = mainScene.heightRoom;
    const depth = mainScene.depthRoom;

    createGeoMatRoom(80, 80, 120, 25, 50, 2, 1.5);

    var elem;
    for (var i = 0; i < 20; i++) {
        elem = createObjectRoom();
        roomA.push(elem);
        mainScene.scene.add(elem.obj);
        elem.obj.visible = false;
    }
    elem = createTransitionRoomBack(width, height, depth);
    roomA.push(elem); //dafare in modo che non richiami queste ma quella generica
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

    /*for (var i = 0; i < 6; i++) {
        obstacleA.push(obstaclesCreate("Table"));
    }

    for (var i = 0; i < 3; i++) {
        obstacleA.push(obstaclesCreate("Turnstile"));
    }*/

    for (var i = 0; i < 6; i++) {
        elem = createCeilingLampOptimized(5, 2, 5, 0.5);
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

 function createWay(mainScene, memory) {
    
    var room;

    for (var i = 0; i < 6; i++) {
        room = takeElement(memory, "Room");
        room.available = false;
        //if (i > 2)
        //    room.populate(memory);
        room.obj.position.z = mainScene.depthRoom / 2 - (mainScene.depthRoom * i);
        mainScene.wallsA.push(room);
        room.obj.visible = true;
        //mainScene.scene.add(room.obj);
    }

    mainScene.lastObj = [mainScene.wallsA[5]];

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
