import * as THREE from 'three';
import { createGeometryCube, createMesh } from '../../utils/utils.js';

import { Element } from '../element.js';

var turnstileTexture = [];

class Turnstile extends Element {
    rotation1 = null;
    rotation2 = null;
    enabled = false;
    constructor (obj, width, height, depth, r1, r2) {
        super(obj, width, height, depth);
        this.rotation1 = r1;
        this.rotation2 = r2;
        this.type = "Turnstile";
    };
    checkIntersection (cat) {
        const pT = new THREE.Vector3();
        const pCC = new THREE.Vector3();

        this.obj.getWorldPosition(pT);
        cat.center.getWorldPosition(pCC);

        const frontC = pCC.z - (cat.depth / 2);
        const backC = pCC.z + (cat.depth / 2);
        
        if (frontC <= pT.z && backC >= pT.z) {
            const leftC = pCC.x - (cat.width / 2);
            const rightC = pCC.x + (cat.width / 2);
            if (this.enabled) {
                return false;
            }
            else {
                if(leftC <= pT.x + (this.width / 2) && leftC >= pT.x - (this.width / 2))
                    return true;
                if (rightC <= pT.x + (this.width / 2) && rightC >= pT.x - (this.width / 2))
                    return true;
                return false;
            }
        }
    };
    dispose () {
        objDispose(this.obj);
    };
    activateAnimation(mainGroup) {
        if (this.enabled) {
            const group = new TWEEN.Group();
            var tween;

            tween = new TWEEN.Tween(this.rotation1.rotation, group);
            tween.to({y: -Math.PI / 2}, 100).start();
            tween = new TWEEN.Tween(this.rotation2.rotation, group);
            tween.to({y: -Math.PI / 2}, 100).start();
        
            mainGroup.push(group);
        }
    }
    checkToAnimate(cat) {
        if (this.enabled) {
            const pT = new THREE.Vector3();
            const pCC = new THREE.Vector3();
    
            this.obj.getWorldPosition(pT);
            cat.center.getWorldPosition(pCC);
    
            if (pCC.z - (cat.depth / 2) <= pT.z + 50) {
                return true;
            }
        }
        return false;
    }
}

export function loadTurnStileTexture(loader) {
    const texture1 = loader.load("element/texture/redTurn.png");
    const texture2 = loader.load("element/texture/greenTurn.png");

    turnstileTexture = [texture1, texture2];
}

function createHalfTurnstileOptimazed(texture, light) {
    const obj = new THREE.Object3D();

    const cW = 2;
    const cH = 6;
    const cD = 1;

    const tW = 3;
    const tH = 2;
    const tD = 1;

    const bW = 3;
    const bH = 6;
    const bD = 1;

    const gW = 6;
    const gH = 8;
    const gD = 0.5;

    const geometryBottom = createGeometryCube([1, 1, 0, 0, 1, 0]);
    const materialBottom = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const meshBottom = createMesh(geometryBottom, materialBottom, (bW * 2) / cW, (bH * 2) / cH, (bD * 2) / cD);

    meshBottom.position.x = ((bW - cW)/ 2) / (cW / 2);
    meshBottom.position.y = (-((cH / 2) + (bH / 2))) / (cH / 2);

    const geometryCube = createGeometryCube([1, 1, 0, 0, 0, 0]);
    const materialCube = new THREE.MeshPhongMaterial( {color: 0x000000} );
    const cube = createMesh(geometryCube, materialCube, cW, cH, cD);

    cube.add(meshBottom);   //0

    const geometryCylinder = new THREE.CylinderGeometry( 0.5, 0.5, 6, 6 );
    const materialCylinder = new THREE.MeshPhongMaterial( {color: 0x9c9c9c} );
    const cylinder = new THREE.Mesh( geometryCylinder, materialCylinder );

    cylinder.scale.set(2 / cW, 2 / cH, 2 / cD);
    const geometryGlass = createGeometryCube([1, 1, 1, 1, 1, 1]);
    const materialGlass = new THREE.MeshPhysicalMaterial( {
        color: "white",
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide} );
    const glass = createMesh(geometryGlass, materialGlass, gW, gH, gD);

    glass.position.x = 3.9 / (cW / 2);
    glass.position.y = -1 / (cH / 2);

    cylinder.add(glass);
    //cylinder.rotateY(Math.PI / 6);
    cylinder.position.x = 1.5 / (cW / 2);
    cube.add( cylinder );  //1

    const geometryTop = createGeometryCube([1, 1, 0, 0, 1, 0]);
    if (!light)
        var materialTop = new THREE.MeshPhongMaterial( {map: texture, } );
    else
        var materialTop = new THREE.MeshPhongMaterial( {
            map: texture,
            emissiveIntensity: 0.1,
            emissive: new THREE.Color(50, 205, 50),
            emissiveMap: texture,
        } );
    const top = createMesh(geometryTop, materialTop, (tW * 2) / cW, (tH * 2) / cH, (tD * 2) / cD);

    top.position.x = 0.5 / (cW / 2);
    top.position.y = 4 / (cH / 2);

    cube.add(top);    //2

    obj.add(cube);

    obj.position.y = 2;
    obj.position.x = 0.5;

    return obj;
}

function createHalfTurnstile(texture, light) {
    const obj = new THREE.Object3D();

    const cW = 2;
    const cH = 6;
    const cD = 1;

    const tW = 3;
    const tH = 2;
    const tD = 1;

    const bW = 3;
    const bH = 6;
    const bD = 1;

    const base = new THREE.Shape()
    .moveTo(-1.5, -0.5)
    .lineTo(-1.5, 0.5)
    .lineTo(1.5, 0.5)
    .bezierCurveTo(2.0, 0.0, 1.5, -0.5, 1.5, -0.5)
    .lineTo(-1.5, -0.5)

    const extrudeSettings = {
        bevelEnabled: false,
        depth: 6,
    };

    const geometryBottom = new THREE.ExtrudeGeometry(base, extrudeSettings);
    const materialBottom = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
    });
    const meshBottom = new THREE.Mesh(geometryBottom, materialBottom);

    meshBottom.rotateX(Math.PI / 2);

    const geometryCube = new THREE.BoxGeometry( 2, 6, 1 );
    const materialCube = new THREE.MeshPhongMaterial( {color: 0x000000} );
    const cube = new THREE.Mesh( geometryCube, materialCube );

    cube.add(meshBottom);   //0
    meshBottom.position.x = 0.5;
    meshBottom.position.y = -3;

    const geometryCylinder = new THREE.CylinderGeometry( 0.5, 0.5, 6, 6 );
    const materialCylinder = new THREE.MeshPhongMaterial( {color: 0x9c9c9c} );
    const cylinder = new THREE.Mesh( geometryCylinder, materialCylinder );

    const geometryGlass = new THREE.BoxGeometry( 6, 8, 0.5 );
    const materialGlass = new THREE.MeshPhysicalMaterial( {
        roughness: 0,
        transmission: 0.4,
        thickness: 0.5,
        side: THREE.DoubleSide} );
    const glass = new THREE.Mesh( geometryGlass, materialGlass );

    glass.position.x = 3.9;
    glass.position.y = -1;

    cylinder.add(glass);
    //cylinder.rotateY(Math.PI / 6);
    cylinder.position.x = 1.5;
    cube.add( cylinder );  //1

    const geometryTop = new THREE.BoxGeometry( 3, 2, 1 );
    const materialTop = [
        new THREE.MeshPhongMaterial( {color: 0x000000, } ),
        new THREE.MeshPhongMaterial( {color: 0x000000, } ),
        new THREE.MeshPhongMaterial( {color: 0x000000, } ),
        new THREE.MeshPhongMaterial( {color: 0x000000, } ),
        !light ? new THREE.MeshPhongMaterial( {map: texture, } ) :
        new THREE.MeshPhongMaterial( {map: texture,
            emissiveIntensity: 0.5,
            emissive: new THREE.Color(50, 205, 50),
            emissiveMap: texture,
        } ),
        new THREE.MeshPhongMaterial( {color: 0x000000, } ),
    ];
    const top = new THREE.Mesh( geometryTop, materialTop );

    top.position.x = 0.5;
    top.position.y = 4;

    cube.add(top);    //2

    obj.add(cube);

    cube.position.y = 2;
    cube.position.x = -0.5;

    return obj;
}

export function createTurnstile(flag) {
    const obj = new THREE.Object3D();

    const leftTurn = createHalfTurnstileOptimazed(turnstileTexture[+flag], flag);
    const rightTurn = createHalfTurnstileOptimazed(turnstileTexture[+flag], flag);

    leftTurn.position.x = -9;

    rightTurn.position.x = 9;
    rightTurn.scale.x = -1;//(Math.PI);

    obj.add(leftTurn);
    obj.add(rightTurn);

    const r1 = leftTurn.children[0].children[1];
    const r2 = rightTurn.children[0].children[1];
    const ret = new Turnstile(obj, 21, 14, 1, r1, r2);
    ret.enabled = flag;
    return ret;
}
