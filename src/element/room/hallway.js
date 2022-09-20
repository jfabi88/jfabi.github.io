import * as THREE from 'three';

import { createGeoMatRoom, createObjectRoom, createObjRoomInstance } from './room.js';
import { Element } from '../element.js';

var widthWall = 80;
var heightWall = 80;
var depthWall = 120;
var widthWindow = 25;
var heightWindow = 50;
var depthWindow = 2;
var shiftWindow = 1.5;

const matrixRoom = [];

export function createObjectHallWay() {

    const count = 6;
    const obj = new THREE.Object3D();
//    var room;
    const instance = createObjRoomInstance(count);
    const matrix = new THREE.Matrix4();
    const old = new THREE.Vector3();
    const newP = new THREE.Vector3();

    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < count * 4; i++) {
            newP.set(0, 0, - depthWall * (Math.floor(i / 4)));
            console.log("Il valore di newP: ", newP.z);
            instance[j].getMatrixAt(i, matrix);
            old.setFromMatrixPosition(matrix);
            matrix.setPosition(old.x + newP.x, old.y + newP.y, old.z + newP.z);
            instance[j].setMatrixAt(i, matrix);
        }
        instance[j].instanceMatrix.needsUpdate = true;
        obj.add(instance[j]);  
    }
    for (var j = 2; j < 7; j++) {
        for (var i = 0; i < count; i++) {
            newP.set(0, 0, - depthWall * i);
            instance[j].getMatrixAt(i, matrix);
            old.setFromMatrixPosition(matrix);
            matrix.setPosition(old.x + newP.x, old.y + newP.y, old.z + newP.z);
            instance[j].setMatrixAt(i, matrix);
        }
        instance[j].instanceMatrix.needsUpdate = true;
        obj.add(instance[j]);
    }

    return new Element(obj, widthWall, heightWall, depthWall * 6);
}

export function createGeoMatHallWay(wW = widthWall, hW = heightWall, dW = depthWall, wWind = widthWindow, hWind = heightWindow, dWind = depthWindow, s = shiftWindow) {
    createGeoMatRoom(wW, hW, dW, wWind, hWind, dWind, s);
}