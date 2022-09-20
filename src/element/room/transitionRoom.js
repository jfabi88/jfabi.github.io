import * as THREE from 'three';

import {Room} from "./room.js";
import {createWall} from "./wallWindow.js";
import {placeObj, getRandomInt} from "../../utils/utils.js";
import {roomTexture} from "./room.js";

class TransitionRoom extends Room {
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

        if (backR > backC && frontR < frontC)
            return true;
        return false;
    };
    addRooms (mainScene) {
        createConnectRooms(mainScene, this);
    };
}

function createDoorWall(width, height, depth)
{
    //const ret = new THREE.Object3D();

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
    const material = new THREE.MeshPhongMaterial({
        color: 0x252850,
    });
    const wall = new THREE.Mesh(geometry, material);

    wall.position.z = -depth / 2;

    //ret.add(wall);

    return wall;
}

export function createTransitionRoomLeftRight(width, height, depth) {
    const obj = new THREE.Object3D();
    const depthWall = 4;

    const frontWall = createDoorWall(width, height, depthWall);

    const backWall = createWall(new THREE.MeshPhongMaterial({
        color: "rgb(108, 108, 108)",
    }),
    width,
    height);

    const leftWall = createDoorWall(depth, height, depthWall);
    const rightWall = createDoorWall(depth, height, depthWall);

    const ceil = createWall(new THREE.MeshPhongMaterial({
        color: "rgb(255, 255, 255)"
    }),
    width,
    depth);

    const floor = createWall(new THREE.MeshPhongMaterial({
        map: roomTexture[2],
        normalMap: roomTexture[3],
    }),
    width,
    depth);

    floor.scale.z = -1

    placeObj(frontWall, [0, height / 2, (depth / 2) - (depthWall / 2)]);
    placeObj(backWall, [0, height / 2, -(depth / 2)]);
    placeObj(leftWall, [-(width / 2) - (depthWall / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [(width / 2) - (depthWall / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, height, 0], [Math.PI / 2, 0, 0]);
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

    cPoint1.position.set(-(width / 2), 0, 15);
    cPoint2.position.set(-(width / 2), 0, 0);
    cPoint3.position.set(-(width / 2), height, 0);

    obj.add(cPoint1);           //9
    obj.add(cPoint2);           //10
    obj.add(cPoint3);           //11

    const cPoint12 = new THREE.Object3D();
    const cPoint22 = new THREE.Object3D();
    const cPoint32 = new THREE.Object3D();

    cPoint12.position.set((width / 2), 0, -15);
    cPoint22.position.set((width / 2), 0, 0);
    cPoint32.position.set((width / 2), height, 0);

    obj.add(cPoint12);           //12
    obj.add(cPoint22);           //13
    obj.add(cPoint32);           //14

    const ret = new TransitionRoom(obj, width, height, depth, "TRL");
    ret.enabled = true;
    ret.connectionPoints = [9, 10, 11, 12, 13, 14];

    return ret;
}

export function createTransitionRoomLeft(width, height, depth)
{
    const obj = new THREE.Object3D();
    const depthWall = 4;

    const frontWall = createDoorWall(width, height, depthWall);

    const backWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(108, 108, 108)",
        }),
        width,
        height);

    const leftWall = createDoorWall(depth, height, depthWall);

    const rightWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(108, 108, 108)",
        }),
        depth,
        height);
    rightWall.scale.z = -1;

    const ceil = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 255, 255)",
        }),
        width,
        depth);
    
    const floor = createWall(new THREE.MeshPhongMaterial({
            map: roomTexture[2],
            normalMap: roomTexture[3],
        }),
        width,
        depth);

    floor.scale.z = -1;

    placeObj(frontWall, [0, height / 2, (depth / 2) - (depthWall / 2)]);
    placeObj(backWall, [0, height / 2, -(depth / 2)]);
    placeObj(leftWall, [-(width / 2) - (depthWall / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [(width / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, height, 0], [Math.PI / 2, 0, 0]);
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

    cPoint1.position.set(-(width / 2), 0, 15);
    cPoint2.position.set(-(width / 2), 0, 0);
    cPoint3.position.set(-(width / 2), height, 0);

    obj.add(cPoint1);           //9
    obj.add(cPoint2);           //10
    obj.add(cPoint3);           //11
    
    const ret = new TransitionRoom(obj, width, height, depth, "TL");
    ret.enabled = true;
    
    return ret;
}

export function createTransitionRoomRight(width, height, depth)
{
    const obj = new THREE.Object3D();
    const depthWall = 4;

    const frontWall = createDoorWall(width, height, depthWall);

    const backWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(108, 108, 108)",
        }),
        width,
        height);

    const leftWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(108, 108, 108)",
        }),
        depth,
        height);

    const rightWall = createDoorWall(depth, height, depthWall);

    const ceil = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 255, 255)",
        }),
        width,
        depth);
    
    const floor = createWall(new THREE.MeshPhongMaterial({
            map: roomTexture[2],
            normalMap: roomTexture[3],
        }),
        width,
        depth);

    floor.scale.z = -1;

    placeObj(frontWall, [0, height / 2, (depth / 2) - (depthWall / 2)]);
    placeObj(backWall, [0, height / 2, -(depth / 2)]);
    placeObj(leftWall, [-(width / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [(width / 2) - (depthWall / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, height, 0], [Math.PI / 2, 0, 0]);
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

    cPoint1.position.set(width / 2, 0, -15);
    cPoint2.position.set(width / 2, 0, 0);
    cPoint3.position.set(width / 2, height, 0);

    obj.add(cPoint1);           //9
    obj.add(cPoint2);           //10
    obj.add(cPoint3);           //11

    const ret = new TransitionRoom(obj, width, height, depth, "TR");
    ret.enabled = true;
    
    return ret;
}

export function createTransitionRoomBack(width, height, depth)
{
    const obj = new THREE.Object3D();

    const depthWall = 4;

    const frontWall = createDoorWall(width, height, depthWall);
    const backWall = createDoorWall(width, height, depthWall);

    const leftWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(108, 108, 108)",
        }),
        depth,
        height
        );

    const rightWall = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(108, 108, 108)",
        }),
        depth,
        height
    );

    rightWall.scale.z = -1;

    const ceil = createWall(new THREE.MeshPhongMaterial({
            color: "rgb(255, 255, 255)",
        }),
        width,
        depth);

    const floor = createWall(new THREE.MeshPhongMaterial({
            map: roomTexture[2],
            normalMap: roomTexture[3],
        }),
        width,
        depth);

    floor.scale.z = -1;

    placeObj(frontWall, [0, height / 2, (depth / 2) - (depthWall / 2)]);
    placeObj(backWall, [0, height / 2, -(depth / 2) + (depthWall / 2)]);
    placeObj(leftWall, [-(height / 2), height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(rightWall, [width / 2, height / 2, 0], [0, Math.PI / 2, 0]);
    placeObj(ceil, [0, height, 0], [Math.PI / 2, 0, 0]);
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

    cPoint1.position.set(-width / 2, 0, -depth / 2);
    cPoint2.position.set(0, 0, -depth / 2);
    cPoint3.position.set(0, height, -depth / 2);

    obj.add(cPoint1);       //9
    obj.add(cPoint2);       //10
    obj.add(cPoint3);       //11

    const ret = new TransitionRoom(obj, width, height, depth, "TB");

    return ret;
}

export function createTransitionRoom(memory)
{
    const randomInt = getRandomInt(4);
    var ret;

    if (randomInt == 0)
        ret = takeElement(memory, "TB");
    else if (randomInt == 1)
        ret = takeElement(memory, "TR");
    else if (randomInt == 2)
        ret = takeElement(memory, "TL");
    else if (randomInt == 3)
        ret = takeElement(memory, "TLR");

    return ret;
}