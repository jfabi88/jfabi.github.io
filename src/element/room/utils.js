import {Vector3} from 'three';

import {takeNormal, dot, vectProd} from '../../utils/mathUtils.js';

function createConnectRooms(mainScene, obj) {
    mainScene.pause = true;
    var room1;
    var room2;

    room1 = createRoom(mainScene.widthRoom, mainScene.heightRoom, mainScene.depthRoom);
    room1.populate(mainScene.scene);
    room1.connect(obj);
    mainScene.wallsA.push(room1);
    mainScene.scene.add(room1.obj);

    for (var i = 0; i < 5; i++) {   //da capire perche con un numero maggiore di 4 impazzisce
       room2 = createRoom(mainScene.widthRoom, mainScene.heightRoom, mainScene.depthRoom);
       room2.populate(mainScene.scene)
       room2.connect(room1);
       mainScene.wallsA.push(room2);
       mainScene.scene.add(room2.obj);
       room1 = room2;
    }
    mainScene.pause = false;
}

export function connect(obj, array, orientation, depth) {

    var normal1 = takeNormal(array[0].toArray(), array[1].toArray(), array[2].toArray());
    var normal2 = takeNormal(orientation[0].toArray(), orientation[1].toArray(), orientation[2].toArray());

    var angle = dot(normal1, normal2);
    if (angle == Math.PI / 2) {
        const ay = vectProd(normal2, normal1);
        if (ay[1] < 0)
            angle *= -1;
    }

    const a = takeAxis(normal1);
    const a2 = (a == 0) ? 2 : 0; //prendo l'altro asse
    obj.position.setComponent(a, array[1].getComponent(a) + ((depth / 2) * normal1[a])); //in normal[a] c'è il segno
    obj.position.setComponent(a2, array[1].getComponent(a2));

    obj.rotateY(angle - Math.PI);
}

export function getConnectionPoints(obj, points) {
    const ret = [];
    for (var i = 0; i < points.length; i += 3) {
        const array = [];

        const p1 = new Vector3();
        obj.children[points[i]].getWorldPosition(p1);
        const p2 = new Vector3();
        obj.children[points[i + 1]].getWorldPosition(p2);
        const p3 = new Vector3();
        obj.children[points[i + 2]].getWorldPosition(p3);
    
        array.push(p1);
        array.push(p2);
        array.push(p3);

        ret.push(array);
    }

    return ret;
}

function takeAxis(axis)
{
    if (Math.round(axis[0]) == 1 || Math.round(axis[0]) == -1)
        return 0;
    //if (axis[1] == 1)
    //    return 1;
    else if (Math.round(axis[2]) == 1 || Math.round(axis[2]) == -1)
        return 2;
}