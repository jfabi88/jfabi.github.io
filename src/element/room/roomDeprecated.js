import * as THREE from 'three';

import { createWall, createWallWindows } from "./wallWindow.js";
import {getRandomInt} from "../../utils/utils.js";
import { placeObj } from '../../utils/utils.js';
import {Element} from "../element.js";
import { getConnectionPoints, connect } from './utils.js';

export var roomTexture;

export class Room extends Element {
    enabled =  false;
    obstacles = [];
    elements = [];
    connectionPoints = [4, 5, 6];
    orientationPoints =  [7, 8, 9];
    constructor (obj, w, h, d) {
        super(obj, w, h, d);
        this.type = "Room";
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
    populate (memory) {
        var flagLightFlag = getRandomInt(3);
        var obsatcleFlag = getRandomInt(6);
        var cLight;
        var obstacle;

        if (flagLightFlag == 2) {
            cLight = takeElement(memory, "CeilingLight");
            if (cLight) {  
                cLight.obj.position.y = 78.5;
                //cLight.obj.rotation.x = Math.PI / 2;
                cLight.available = false;
                this.obj.add(cLight.obj);
                this.toDispose.push(cLight);
            }
        }
        if (obsatcleFlag == 2 || obsatcleFlag == 3) {
            obstacle = takeElement(memory, "Table");
            if (obstacle) {
                obstacle.available = false;
                this.obj.add(obstacle.obj);
                this.toDispose.push(obstacle);
                this.obstacles.push(obstacle);
            }
        }
        if (obsatcleFlag == 4) {
            obstacle = takeElement(memory, "Turnstile");
            if (obstacle) {
                obstacle[0].available = false;
                this.obj.add(obstacle[0].obj);
                this.obj.add(obstacle[1].obj);
                this.toDispose.push(obstacle[0]);
                this.obstacles.push(obstacle[0]);
                this.toDispose.push(obstacle[1]);
                this.obstacles.push(obstacle[1]);
            }
        }
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
        this.toDispose = [];
        this.elements = [];
        this.obstacles = [];
    };
}

export function loadRoomTexture(loader) {
    //const texture1 = loader.load("element/texture/woodTexture.jpeg");
    //texture1.wrapS = THREE.RepeatWrapping;
    //texture1.wrapT = THREE.RepeatWrapping;
    //texture1.repeat.set(4, 6);
    //texture1.offset.x = 0.6;
    //texture1.repeat = new THREE.Vector2(20, 30);

    const texture2 = loader.load("element/texture/wallTexture4.png");
    const texture3 = loader.load("element/texture/wallTextureNormal3.png");
    const texture4 = loader.load("element/texture/floorTexture.png");
    const texture5 = loader.load("element/texture/floorNormal.png");
    //const texture6 = loader.load("element/texture/wallTexture2.png");
    //const texture7 = loader.load("element/texture/wallTextureNormal2.png");
    roomTexture = [
        //texture1,
        texture2,
        texture3,
        texture4,
        texture5,
        //texture6,
        //texture7,
    ];
}

function createWallDx(width, height, depth, window) {
    if (window)
        var wallDx = createWallWindows();
    else
        var wallDx = createWall(
            new THREE.MeshPhongMaterial({
                color: 'white',
                side: THREE.DoubleSide,
            }),
          depth,
          height);
    //wallDx.name = "wallDx";
    placeObj(wallDx, [width / 2, height / 2, 0], [0, - Math.PI / 2, 0]);

    return wallDx;
}

function createWallSx(width, height, depth) {
    const wallSx = createWall(
        new THREE.MeshPhongMaterial({
            map: roomTexture[0],
            //color: 'white',
            normalMap: roomTexture[1],
        }),
        depth,
        height);
    //wallSx.name = "wallSx";
    placeObj(wallSx, [-(width / 2), height / 2, 0], [0, - Math.PI / 2, 0]);

    wallSx.scale.z = -1;
    return wallSx;
}

function createFloor(width, depth) {
    const floor = createWall(new THREE.MeshPhongMaterial({
            map: roomTexture[2],
            normalMap: roomTexture[3],
        }),
        width,
        depth);
    //floor.name = "floor";
    placeObj(floor, [0, 0, 0], [- Math.PI / 2, 0, 0]);

    return floor;
}

function createCeil(width, height, depth) {
    const ceil = createWall(new THREE.MeshPhongMaterial({
            //map: roomTexture[0],
            color: 'white',
        }),
        width,
        depth);
    //ceil.name = "ceil";
    ceil.scale.z = -1;
    placeObj(ceil, [0, height, 0], [- Math.PI / 2, 0, 0]);

    return ceil;
}

export function createRoom(width, height, depth)
{
    const obj = new THREE.Object3D();

    const flagWindow = getRandomInt(2);

    obj.add(createWallDx(width, height, depth, flagWindow));    //0 //penso che non venga eliminata
    obj.add(createWallSx(width, height, depth));                //1
    obj.add(createCeil(width, height, depth));                  //2
    obj.add(createFloor(width, depth));                         //3

    const cPoint1 = new THREE.Object3D();
    const cPoint2 = new THREE.Object3D();
    const cPoint3 = new THREE.Object3D();

    cPoint1.position.set(-width / 2, 0, -depth / 2);
    cPoint2.position.set(0, 0, -depth / 2);
    cPoint3.position.set(0, height, -depth / 2);

    obj.add(cPoint1);                   //4
    obj.add(cPoint2);                   //5
    obj.add(cPoint3);                   //6

    const oPoint1 = new THREE.Object3D();
    const oPoint2 = new THREE.Object3D();
    const oPoint3 = new THREE.Object3D();

    oPoint1.position.set(1, 0, 0);
    oPoint2.position.set(0, 0, 0);
    oPoint3.position.set(0, 1, 0);

    obj.add(oPoint1);                   //7
    obj.add(oPoint2);                   //8
    obj.add(oPoint3);                   //9

    const ret = new Room(obj, width, height, depth);
    return ret;
}
