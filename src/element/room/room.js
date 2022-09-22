
 var roomTexture;

var widthWall = 80;
var heightWall = 80;
var depthWall = 120;
var widthWindow = 25;
var heightWindow = 50;
var depthWindow = 2;
var shiftWindow = 1.5;

/*MESH MATRIX
    0 Right Wall
    1 Left Wall
    2 Floor
    3 Ceil
*/
const geometryM = [];
const materialM = [];

 class Room extends Element {
    enabled =  false;
    obstacles = [];
    elements = [];
    interface;
    connectionPoints = [5, 6, 7];
    orientationPoints =  [8, 9, 10];
    constructor (obj, w, h, d, a) {
        super(obj, w, h, d);
        this.type = "Room";
        this.interface = a;
    };
    getConnectionPoints () {
        return getConnectionPoints(this.obj, this.connectionPoints);
    };
    getOrientationPoints () {
        return getConnectionPoints(this.obj, this.orientationPoints)[0];
    };
    connect (obj) {
        connect(this.obj, obj, this.getOrientationPoints(), this.depth);
    };
    isIn (cat) {
        //const backC = cat.obj.position.z + cat.depth / 2;
        const frontC = cat.obj.position.z - cat.depth / 2;
        const backR = this.obj.position.z + this.depth / 2;
        const frontR = this.obj.position.z - this.depth / 2;

        if (backR > frontC && frontR < frontC)
            return true;
        return false;
    };
    populate (memory, countSpawn, spawn) {
        var flagLightFlag = getRandomInt(3);
        var obstacleFlag = getRandomInt(7);

        if (countSpawn == spawn) {
            console.log("Siamo qua dentro!");
            if ((obstacleFlag == 2 || obstacleFlag == 3 || obstacleFlag == 5)) {
                this.obj.children[11].visible = true;
                this.obstacles.push(this.interface[0]);
                if (obstacleFlag == 3) {
                    this.obj.children[15].visible = true;
                    this.obstacles.push(this.interface[2]);
                }
                if (obstacleFlag == 5) {
                    this.obj.children[12].visible = true;
                    this.obstacles.push(this.interface[1]);
                }
                return [Math.floor(flagLightFlag / 2), obstacleFlag];
            }
            else if (obstacleFlag == 4) {
                this.obj.children[13].visible = true;
                this.obj.children[14].visible = true;
                this.obstacles.push(this.interface[3]);
                this.obstacles.push(this.interface[4]);
                return [Math.floor(flagLightFlag / 2), obstacleFlag];
            }
        }
        return [flagLightFlag, 0];
    };
    rePopulate (memory) {
        this.empty();
        this.populate(memory);
    };
    empty () {
        for (var i = 0; i < this.toDispose.length; i++) {
            removeElement(this.toDispose[i]);
            this.obj.remove(this.toDispose[i].obj);
        }
        this.obj.children[11].visible = false;
        this.obj.children[12].visible = false;
        if (this.interface[3].enabled) {
            this.interface[3].rotation1.rotation.y = 0;
            this.interface[3].rotation2.rotation.y = 0;
        }
        else {
            this.interface[4].rotation1.rotation.y = 0;
            this.interface[4].rotation2.rotation.y = 0;
        }
        this.obj.children[13].visible = false;
        this.obj.children[14].visible = false;
        this.obj.children[15].visible = false;
        this.toDispose = [];
        this.elements = [];
        this.obstacles = [];
    };
}

 function loadRoomTexture(loader) {

    const texture2 = loader.load("src/element/texture/wallTexture4.png");
    const texture3 = loader.load("src/element/texture/wallTextureNormal3.png");
    const texture4 = loader.load("src/element/texture/floorTexture.png");
    const texture5 = loader.load("src/element/texture/floorNormal.png");
    roomTexture = [
        texture2,
        texture3,
        texture4,
        texture5,
    ];
}

function createWallWindowDx(width, height) {
    const mesh = createObjectWallWindows();
    placeObj(mesh, [width / 2, height / 2, 0], [0, - Math.PI / 2, 0]);
    return mesh;
}

function createWallDx(width, height, geometry, material) {
    const mesh = new THREE.Mesh(geometry, material);
    placeObj(mesh, [width / 2, height / 2, 0], [0, - Math.PI / 2, 0]);
    return mesh;
}

function createWallSx(width, height, geometry, material) {
    const mesh = new THREE.Mesh(geometry, material);
    placeObj(mesh, [-(width / 2), height / 2, 0], [0, - Math.PI / 2, 0]);
    mesh.scale.z = -1;
    return mesh;
}

function createFloor(geometry, material) {
    const mesh = new THREE.Mesh(geometry, material);
    placeObj(mesh, [0, 0, 0], [- Math.PI / 2, 0, 0]);
    return mesh;
}

function createCeil(height, geometry, material) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.z = -1;
    placeObj(mesh, [0, height, 0], [- Math.PI / 2, 0, 0]);
    return mesh;
}

 function createObjRoomInstance(count) {
    const instanceWallWindowDx = createObjectWallWindows(count);
    const instanceWallDx = new THREE.InstancedMesh(geometryM[0], materialM[0], count);
    const instanceWallSx = new THREE.InstancedMesh(geometryM[0], materialM[1], count);
    const instanceFloor = new THREE.InstancedMesh(geometryM[1], materialM[2], count);
    const instanceCeil = new THREE.InstancedMesh(geometryM[1], materialM[3], count);

    const matrix = new THREE.Matrix4();
    const matrix2 = new THREE.Matrix4();
    const vector = new THREE.Vector3();

    for (var i = 0; i < count; i++) {
        matrix.makeRotationY(-Math.PI / 2);
        matrix.setPosition(widthWall / 2, heightWall /2, 0);
        instanceWallWindowDx[2].setMatrixAt(i, matrix);  
    }

    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < count * 4; i++) {
            matrix.makeRotationY(-Math.PI / 2);
            instanceWallWindowDx[j].getMatrixAt(i, matrix2);
            vector.setFromMatrixPosition(matrix2);
            matrix.setPosition(widthWall / 2 - vector.z, heightWall /2 + vector.y, 0 - vector.x);
            instanceWallWindowDx[j].setMatrixAt(i, matrix);
        }
    }

    for (var i = 0; i < count; i++) {
        matrix.makeRotationY(-Math.PI / 2);
        matrix.setPosition(widthWall / 2, heightWall / 2, 0);
        instanceWallDx.setMatrixAt(i, matrix);
    }
    for (var i = 0; i < count; i++) {
        matrix.identity();
        matrix.makeRotationY(Math.PI / 2);
        matrix.setPosition(-(widthWall / 2), heightWall / 2, 0);
        instanceWallSx.setMatrixAt(i, matrix);       
    }
    for (var i = 0; i < count; i++) {
        matrix.identity();
        matrix.makeRotationX(- Math.PI / 2);
        instanceFloor.setMatrixAt(i, matrix);          
    }
    for (var i = 0; i < count; i++) {
        matrix.identity();
        matrix.makeRotationX(Math.PI / 2);
        //matrix.elements[10] = -1;
        matrix.setPosition(0, heightWall, 0);
        instanceCeil.setMatrixAt(i, matrix);
    }

    return ([instanceWallWindowDx[0], instanceWallWindowDx[1], instanceWallWindowDx[2], instanceWallDx, instanceWallSx, instanceFloor, instanceCeil]);
}

 function createObjectRoom() {
    const obj = new THREE.Object3D();

    const flag = getRandomInt(2);

    obj.add(createWallWindowDx(widthWall, heightWall));
    obj.add(createWallDx(widthWall, heightWall, geometryM[0], materialM[0]));
    obj.add(createWallSx(widthWall, heightWall, geometryM[0], materialM[1]));
    obj.add(createFloor(geometryM[1], materialM[2]));
    obj.add(createCeil(heightWall, geometryM[1], materialM[3]));

    if (flag == 0)
        obj.children[0].visible = false;
    else
        obj.children[1].visible = false;

    const cPoint1 = new THREE.Object3D();
    const cPoint2 = new THREE.Object3D();
    const cPoint3 = new THREE.Object3D();

    cPoint1.position.set(-widthWall / 2, 0, -depthWall / 2);
    cPoint2.position.set(0, 0, -depthWall / 2);
    cPoint3.position.set(0, heightWall, -depthWall / 2);

    obj.add(cPoint1);                   //5
    obj.add(cPoint2);                   //6
    obj.add(cPoint3);                   //7

    const oPoint1 = new THREE.Object3D();
    const oPoint2 = new THREE.Object3D();
    const oPoint3 = new THREE.Object3D();

    oPoint1.position.set(1, 0, 0);
    oPoint2.position.set(0, 0, 0);
    oPoint3.position.set(0, 1, 0);

    obj.add(oPoint1);                   //8
    obj.add(oPoint2);                   //9
    obj.add(oPoint3);                   //10

    const table = obstaclesCreate("Table");
    obj.add(table.obj);                 //11
    table.obj.visible = false;

    const bar = obstaclesCreate("Bar");
    obj.add(bar.obj);                   //12
    bar.obj.position = table.obj.position;
    bar.obj.position.y += table.height / 2;
    bar.obj.visible = false;

    const turnstile = obstaclesCreate("Turnstile");
    obj.add(turnstile[0].obj);          //13
    obj.add(turnstile[1].obj);          //14
    turnstile[0].obj.visible = false;
    turnstile[1].obj.visible = false;

    const computer = obstaclesCreate("Computer");
    obj.add(computer.obj);              //15
    computer.obj.position.y = table.obj.position.y + table.height / 2 + computer.height / 2;
    computer.obj.position.z = computer.depth / 2;
    computer.obj.visible = false;

    const ret = new Room(obj, widthWall, heightWall, depthWall, [table, bar, computer, turnstile[0], turnstile[1]]);
    return ret;
}

 function createGeoMatRoom(wW = widthWall, hW = heightWall, dW = depthWall, wWind = widthWindow, hWind = heightWindow, dWind = depthWindow, s = shiftWindow) {

    widthWall = wW;
    heightWall = hW;
    depthWall = dW;
    widthWindow = wWind;
    heightWindow = hWind;
    depthWindow = dWind;
    shiftWindow = s;

    const geometryWallRL = new THREE.PlaneGeometry(dW, hW);
    const geometryWallUpDown = new THREE.PlaneGeometry(wW, dW);

    geometryM.length = 0;
    geometryM.push(geometryWallRL);
    geometryM.push(geometryWallUpDown);

    if (materialM.length == 0) {
        const materialWallR = new THREE.MeshPhongMaterial({
            color: 'white',
            side: THREE.DoubleSide,
        });
        const materialWallL = new THREE.MeshPhongMaterial({
            map: roomTexture[0],
            normalMap: roomTexture[1],
        });
        const materialWallF = new THREE.MeshPhongMaterial({
            map: roomTexture[2],
            normalMap: roomTexture[3],
        });
        const materialWallC = new THREE.MeshPhongMaterial({
            color: 'white',
        });

        materialM.push(materialWallR);
        materialM.push(materialWallL);
        materialM.push(materialWallF);
        materialM.push(materialWallC);
    }

    createGeoMatWallWindows(wWind, hWind, dWind, s);
}
