
class TransitionRoom extends Block {
    intersectionMesh = [];
    obstacles = [this];
    constructor(obj, w, h, d, type) {
        super(obj, w, h, d, type);
        this.orientationPoints = [6, 7, 8];
        this.connectionPoints = [9, 10, 11];
        this.type = type;
    };
    canRotate (cat) {
        const backC = cat.obj.position.z + cat.depth / 2;
        const frontC = cat.obj.position.z - cat.depth / 2;
        const backR = this.obj.position.z + this.depth / 2;
        const frontR = this.obj.position.z - this.depth / 2;

        if (backR - 20 > backC && frontR + 20 < frontC)
            return true;
        return false;
    };
}


/*
    BACK
    LEFT-RIGHT
    CEIL-FLOOR
    DOOR
*/
const geometryTR = [];

/*
    BACK-LEFT-RIGHT
    CEIL
    FLOOR
    DOOR-FRONT
    DOOR-LEFT-RIGHT
*/
const materialTR = [];

var widthTR;
var heightTR;
var depthTR;
var depthWallTR;

function createAnimationTransitionRoomTween(array, maincat, group, angle) {
    var tween;
    var newP;

    array.forEach(element => {
        if (element.obj.position.z - 70 < maincat.obj.position.z) {
            tween = new TWEEN.Tween(element.obj, group);
            newP = rotateOnPoint(element.obj, new THREE.Vector3(0, 0, -10), new THREE.Vector3(0, 1, 0), angle);
            console.log("Il newP:", newP[0], newP[1]);
            tween.to({position: newP[0], quaternion: newP[1]}, 100).start();
        }
    });
}

function createTransitionRoomLeftRight(width, height, depth) {
    
    const obj = new THREE.Object3D();

    const frontWall = new THREE.Mesh(geometryTR[3], materialTR[3]);
    frontWall.position.z = -depthWallTR / 2;
    const backWall = new THREE.Mesh(geometryTR[0], materialTR[0]);

    const leftWall = new THREE.Mesh(geometryTR[4], materialTR[3]);
    leftWall.position.z = -depthWallTR / 2;
    const rightWall = new THREE.Mesh(geometryTR[4], materialTR[3]);
    rightWall.position.z = -depthWallTR / 2;

    const ceil = new THREE.Mesh(geometryTR[2], materialTR[1]);
    const floor = new THREE.Mesh(geometryTR[2], materialTR[2]);
    floor.scale.z = -1

    placeObj(frontWall, [0, heightTR / 2, (depthTR / 2) - (depthWallTR / 2)]);
    placeObj(backWall, [0, heightTR / 2, -(depthTR / 2)]);
    placeObj(leftWall, [-(widthTR / 2) - (depthWallTR / 2), heightTR / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [(widthTR / 2) - (depthWallTR / 2), heightTR / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, heightTR, 0], [Math.PI / 2, 0, 0]);
    placeObj(floor, [0, 0, 0], [Math.PI / 2, 0, 0]);
    
    obj.add(frontWall);         //0
    obj.add(backWall);          //1
    obj.add(leftWall);          //2
    obj.add(rightWall);         //3
    obj.add(ceil);              //4
    obj.add(floor);             //5

    const oPoint1 = new THREE.Object3D();
    const oPoint2 = new THREE.Object3D();
    const oPoint3 = new THREE.Object3D();

    oPoint1.position.set(1, 0, 0);
    oPoint2.position.set(0, 0, 0);
    oPoint3.position.set(0, 1, 0);

    obj.add(oPoint1);           //6
    obj.add(oPoint2);           //7
    obj.add(oPoint3);           //8

    const cPoint1 = new THREE.Object3D();
    const cPoint2 = new THREE.Object3D();
    const cPoint3 = new THREE.Object3D();

    cPoint1.position.set(-(widthTR / 2), 0, 15);
    cPoint2.position.set(-(widthTR / 2), 0, 0);
    cPoint3.position.set(-(widthTR / 2), heightTR, 0);

    obj.add(cPoint1);           //9
    obj.add(cPoint2);           //10
    obj.add(cPoint3);           //11

    const cPoint12 = new THREE.Object3D();
    const cPoint22 = new THREE.Object3D();
    const cPoint32 = new THREE.Object3D();

    cPoint12.position.set((widthTR / 2), 0, -15);
    cPoint22.position.set((widthTR / 2), 0, 0);
    cPoint32.position.set((widthTR / 2), heightTR, 0);

    obj.add(cPoint12);           //12
    obj.add(cPoint22);           //13
    obj.add(cPoint32);           //14

    const ret = new TransitionRoom(obj, widthTR, heightTR, depthTR, "TRL");
    ret.enabled = true;
    ret.connectionPoints = [9, 10, 11, 12, 13, 14];
    ret.intersectionMesh = [[1]];
    return ret;
}

 function createTransitionRoomLeft()
{
    const obj = new THREE.Object3D();

    const frontWall = new THREE.Mesh(geometryTR[3], materialTR[3]);
    frontWall.position.z = - depthWallTR / 2;
    const backWall = new THREE.Mesh(geometryTR[0], materialTR[0]);

    const leftWall = new THREE.Mesh(geometryTR[4], materialTR[3]);
    leftWall.position.z = - depthWallTR / 2;
    const rightWall = new THREE.Mesh(geometryTR[1], materialTR[0]);
    rightWall.scale.z = -1;

    const ceil = new THREE.Mesh(geometryTR[2], materialTR[1]);
    const floor = new THREE.Mesh(geometryTR[2], materialTR[2]);
    floor.scale.z = -1;

    placeObj(frontWall, [0, heightTR / 2, (depthTR / 2) - (depthWallTR / 2)]);
    placeObj(backWall, [0, heightTR / 2, -(depthTR / 2)]);
    placeObj(leftWall, [-(widthTR / 2) - (depthWallTR / 2), heightTR / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [(widthTR / 2), heightTR / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, heightTR, 0], [Math.PI / 2, 0, 0]);
    placeObj(floor, [0, 0, 0], [Math.PI / 2, 0, 0]);
    
    obj.add(frontWall);         //0
    obj.add(backWall);          //1
    obj.add(leftWall);          //2
    obj.add(rightWall);         //3
    obj.add(ceil);              //4
    obj.add(floor);             //5

    const oPoint1 = new THREE.Object3D();
    const oPoint2 = new THREE.Object3D();
    const oPoint3 = new THREE.Object3D();

    oPoint1.position.set(1, 0, 0);
    oPoint2.position.set(0, 0, 0);
    oPoint3.position.set(0, 1, 0);

    obj.add(oPoint1);           //6
    obj.add(oPoint2);           //7
    obj.add(oPoint3);           //8

    const cPoint1 = new THREE.Object3D();
    const cPoint2 = new THREE.Object3D();
    const cPoint3 = new THREE.Object3D();

    cPoint1.position.set(-(widthTR / 2), 0, 15);
    cPoint2.position.set(-(widthTR / 2), 0, 0);
    cPoint3.position.set(-(widthTR / 2), heightTR, 0);

    obj.add(cPoint1);           //9
    obj.add(cPoint2);           //10
    obj.add(cPoint3);           //11
    
    const ret = new TransitionRoom(obj, widthTR, heightTR, depthTR, "TL");
    ret.enabled = true;
    ret.intersectionMesh = [[1], [3]];
    return ret;
}

 function createTransitionRoomRight()
{
    const obj = new THREE.Object3D();

    const frontWall = new THREE.Mesh(geometryTR[3], materialTR[3]);
    frontWall.position.z = -depthWallTR / 2;
    const backWall = new THREE.Mesh(geometryTR[0], materialTR[0]);

    const leftWall = new THREE.Mesh(geometryTR[1], materialTR[0]);
    const rightWall = new THREE.Mesh(geometryTR[4], materialTR[3]);
    rightWall.position.z = -depthWallTR / 2;

    const ceil = new THREE.Mesh(geometryTR[2], materialTR[1]);
    const floor = new THREE.Mesh(geometryTR[2], materialTR[2]);
    floor.scale.z = -1;

    placeObj(frontWall, [0, heightTR / 2, (depthTR / 2) - (depthWallTR / 2)]);
    placeObj(backWall, [0, heightTR / 2, -(depthTR / 2)]);
    placeObj(leftWall, [-(widthTR / 2), heightTR / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [(widthTR / 2) - (depthWallTR / 2), heightTR / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, heightTR, 0], [Math.PI / 2, 0, 0]);
    placeObj(floor, [0, 0, 0], [Math.PI / 2, 0, 0]);
    
    obj.add(frontWall);         //0
    obj.add(backWall);          //1
    obj.add(leftWall);          //2
    obj.add(rightWall);         //3
    obj.add(ceil);              //4
    obj.add(floor);             //5

    const oPoint1 = new THREE.Object3D();
    const oPoint2 = new THREE.Object3D();
    const oPoint3 = new THREE.Object3D();

    oPoint1.position.set(1, 0, 0);
    oPoint2.position.set(0, 0, 0);
    oPoint3.position.set(0, 1, 0);

    obj.add(oPoint1);           //6
    obj.add(oPoint2);           //7
    obj.add(oPoint3);           //8

    const cPoint1 = new THREE.Object3D();
    const cPoint2 = new THREE.Object3D();
    const cPoint3 = new THREE.Object3D();

    cPoint1.position.set(widthTR / 2, 0, -15);
    cPoint2.position.set(widthTR / 2, 0, 0);
    cPoint3.position.set(widthTR / 2, heightTR, 0);

    obj.add(cPoint1);           //9
    obj.add(cPoint2);           //10
    obj.add(cPoint3);           //11

    const ret = new TransitionRoom(obj, widthTR, heightTR, depthTR, "TR");
    ret.enabled = true;
    ret.intersectionMesh = [[1], [2]];
    return ret;
}

 function createTransitionRoomBack() {
    
    const obj = new THREE.Object3D();

    const frontWall = new THREE.Mesh(geometryTR[3], materialTR[3]);
    const backWall = new THREE.Mesh(geometryTR[3], materialTR[3]);
    frontWall.position.z = -depthWallTR / 2;
    backWall.position.z = -depthWallTR / 2;

    const leftWall = new THREE.Mesh(geometryTR[1], materialTR[0]);
    const rightWall = new THREE.Mesh(geometryTR[1], materialTR[0]);
    rightWall.scale.z = -1;

    const ceil = new THREE.Mesh(geometryTR[2], materialTR[1]);
    const floor = new THREE.Mesh(geometryTR[2], materialTR[2]);
    floor.scale.z = -1;

    placeObj(frontWall, [0, heightTR / 2, (depthTR / 2) - (depthWallTR / 2)]);
    placeObj(backWall, [0, heightTR / 2, -(depthTR / 2) + (depthWallTR / 2)]);
    placeObj(leftWall, [-(heightTR / 2), heightTR / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [widthTR / 2, heightTR / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, heightTR, 0], [Math.PI / 2, 0, 0]);
    placeObj(floor, [0, 0, 0], [Math.PI / 2, 0, 0]);

    obj.add(frontWall);     //0
    obj.add(backWall);      //1
    obj.add(leftWall);      //2
    obj.add(rightWall);     //3
    obj.add(ceil);          //4
    obj.add(floor);         //5

    const oPoint1 = new THREE.Object3D();
    const oPoint2 = new THREE.Object3D();
    const oPoint3 = new THREE.Object3D();

    oPoint1.position.set(1, 0, 0);
    oPoint2.position.set(0, 0, 0);
    oPoint3.position.set(0, 1, 0);

    obj.add(oPoint1);           //6
    obj.add(oPoint2);           //7
    obj.add(oPoint3);           //8

    const cPoint1 = new THREE.Object3D();
    const cPoint2 = new THREE.Object3D();
    const cPoint3 = new THREE.Object3D();

    cPoint1.position.set(-widthTR / 2, 0, -depthTR / 2);
    cPoint2.position.set(0, 0, -depthTR / 2);
    cPoint3.position.set(0, heightTR, -depthTR / 2);

    obj.add(cPoint1);       //9
    obj.add(cPoint2);       //10
    obj.add(cPoint3);       //11

    const ret = new TransitionRoom(obj, widthTR, heightTR, depthTR, "TB");

    return ret;
}

function createGeoMatTransitionRoom(width, height, depth, depthWall) {
    
    widthTR = width;
    heightTR = height;
    depthTR = depth;
    depthWallTR = depthWall;

    geometryTR.length = 0;

    const geometryBackWall = new THREE.PlaneGeometry(width, height);
    const geometryLeftRightWall = new THREE.PlaneGeometry(depth, height);
    const geometryFloorCeil = new THREE.PlaneGeometry(width, depth);
    const geometryDoorFrontWall = createDoorWallGeometry(width, height, depthWall);
    const geometryDoorLeftRightWall = createDoorWallGeometry(depth, height, depthWall);

    geometryTR.push(geometryBackWall, geometryLeftRightWall, geometryFloorCeil, geometryDoorFrontWall, geometryDoorLeftRightWall);

    if (materialTR.length == 0) {
        const materialBackLeftRightWall = new THREE.MeshPhongMaterial({color: "rgb(108, 108, 108)"});
        const materialCeil = new THREE.MeshPhongMaterial({ color: "rgb(255, 255, 255)"});
        const materialFloor = new THREE.MeshPhongMaterial({
            map: roomTexture[2],
            normalMap: roomTexture[3],
        });
        const materialDoorWall = new THREE.MeshPhongMaterial({ color: 0x252850 });

        materialTR.push(materialBackLeftRightWall, materialCeil, materialFloor, materialDoorWall);
    }
}

function createDoorWallGeometry(width, height, depth) {
    const wallShape = new THREE.Shape()
    .moveTo(-width / 2, -(height / 2), 0)
    .lineTo(-25, -(height / 2), 0)
    .lineTo(-25, 20, 0)
    .lineTo(25, 20, 0)
    .lineTo(25, -(height / 2), 0)
    .lineTo(width / 2, -(height / 2), 0)
    .lineTo(width / 2, height / 2, 0)
    .lineTo(-width / 2, height / 2, 0)

    const extrudeSettings = {
        depth: depth,
    };
  
    const geometry = new THREE.ExtrudeBufferGeometry(wallShape, extrudeSettings);

    return geometry;
}

function createTransitionRoom(memory)
{
    const randomInt = getRandomInt(5);
    var ret;


    if (randomInt == 0)
        ret = takeElement(memory, "TB");
    else if (randomInt == 1 || randomInt == 3)
        ret = takeElement(memory, "TR");
    else if (randomInt == 2 || randomInt == 4)
        ret = takeElement(memory, "TL");
    //else if (randomInt == 3)
    //    ret = takeElement(memory, "TLR");

    return ret;
}