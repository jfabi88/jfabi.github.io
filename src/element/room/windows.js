import * as THREE from 'three';

import { createGeometryPlane, createMesh, createPlane } from '../../utils/utils.js';

/* Window Matrix
    0 Edge
    1 Glass
*/

const geometryM = [];
const materialM = [];

var width = 25;
var height = 50;
var depth = 2;
var shift = 1.5;

export function createGeometryExternalWindow(w, h, d, s) {
    const vertices = [
        //face 1
        {pos: [-w/2, -h/2, d/2], norm: [0, 0, 1], uv: [0, 0]}, // 1             //0
        {pos: [-w/2 + s, -h/2 + s, d/2], norm: [0, 0, 1], uv: [1, 0]}, // 1     //1
        {pos: [w/2, -h/2, d/2], norm: [0, 0, 1], uv: [0, 1]}, // 2              //2
        {pos: [w/2 - s, -h/2 + s, d/2], norm: [0, 0, 1], uv: [1, 1]}, // 3      //3
        //face 2
        {pos: [w/2, -h/2, d/2], norm: [0, 0, 1], uv: [0, 1]}, // 2              //4
        {pos: [w/2 - s, -h/2 + s, d/2], norm: [0, 0, 1], uv: [1, 1]}, // 3      //5
        {pos: [w/2 - s, h/2 - s, d/2], norm: [0, 0, 1], uv: [0, 1]}, // 4       //6
        {pos: [w/2, h/2, d/2], norm: [0, 0, 1], uv: [0, 0]}, // 5               //7
        //face 3
        {pos: [w/2 - s, h/2 - s, d/2], norm: [0, 0, 1], uv: [0, 1]}, // 4       //8
        {pos: [w/2, h/2, d/2], norm: [0, 0, 1], uv: [0, 0]}, // 5               //9
        {pos: [-w/2, h/2, d/2], norm: [0, 0, 1], uv: [1, 0]}, // 6              //10
        {pos: [-w/2 + s, h/2 -s, d/2], norm: [0, 0, 1], uv: [1, 1]}, // 7       //11
        //face 4
        {pos: [-w/2, h/2, d/2], norm: [0, 0, 1], uv: [1, 0]}, // 6              //12
        {pos: [-w/2 + s, h/2 -s, d/2], norm: [0, 0, 1], uv: [1, 1]}, // 7       //13
        {pos: [-w/2, -h/2, d/2], norm: [0, 0, 1], uv: [0, 0]}, // 0             //14
        {pos: [-w/2 + s, -h/2 + s, d/2], norm: [0, 0, 1], uv: [0, 1]}, // 1     //15
        //face 5
        {pos: [w/2, -h/2, d/2], norm: [1, 0, 0], uv: [0, 1]}, // 2              //16
        {pos: [w/2, -h/2, -d/2], norm: [1, 0, 0], uv: [1, 1]}, // 8             //17
        {pos: [w/2, h/2, -d/2], norm: [1, 0, 0], uv: [1, 0]}, // 9              //18
        {pos: [w/2, h/2, d/2], norm: [1, 0, 0], uv: [0, 0]}, // 5               //19
        //face 6
        {pos: [w/2 - s, h/2 -s, -d/2], norm: [0, -1, 0], uv: [1, 0]}, // 14      //20
        {pos: [w/2 - s, h/2 - s, d/2], norm: [0, -1, 0], uv: [0, 0]}, // 4       //21
        {pos: [-w/2 + s, h/2 - s, -d/2], norm: [0, -1, 0], uv: [1, 1]}, // 13    //22
        {pos: [-w/2 + s, h/2 -s, d/2], norm: [0, -1, 0], uv: [0, 1]}, // 7       //23
        //face 7
        {pos: [w/2 - s, -h/2 + s, -d/2], norm: [0, 1, 0], uv: [1, 0]}, // 11     //24
        {pos: [-w/2 + s, -h/2 + s, -d/2], norm: [0, 1, 0], uv: [0, 0]}, // 12   //25
        {pos: [w/2 - s, -h/2 + s, d/2], norm: [0, 1, 0], uv: [1, 1]}, // 3      //26
        {pos: [-w/2 + s, -h/2 + s, d/2], norm: [0, 1, 0], uv: [0, 1]}, // 1     //27
        //face 8
        {pos: [-w/2 + s, -h/2 + s, d/2], norm: [1, 0, 0], uv: [0, 1]}, // 1     //28
        {pos: [-w/2 + s, -h/2 + s, -d/2], norm: [1, 0, 0], uv: [0, 0]}, // 12   //29
        {pos: [-w/2 + s, h/2 - s, -d/2], norm: [1, 0, 0], uv: [1, 0]}, // 13    //30
        {pos: [-w/2 + s, h/2 -s, d/2], norm: [1, 0, 0], uv: [1, 1]}, // 7       //31
    ];

    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
      positions.push(...vertex.pos);
      normals.push(...vertex.norm);
      uvs.push(...vertex.uv);
    }

    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

    geometry.setIndex([
        0, 2, 1, 1, 2, 3,
        4, 7, 5, 5, 7, 6,
        9, 10, 8, 8, 10, 11,
        13, 12, 15, 15, 12, 14,
        16, 17, 19, 19, 17, 18,
        21, 23, 22, 22, 20, 21,
        27, 26, 25, 25, 26, 24,
        28, 29, 31, 31, 29, 30
    ]);

    return geometry;
}

export function createObjWindowInstance(count) {
    const instancedEdge = new THREE.InstancedMesh(geometryM[0], materialM[0], count);
    const instancedGlass = new THREE.InstancedMesh(geometryM[1], materialM[1], count);

    const matrix = new THREE.Matrix4();
    matrix.setPosition(0, 0, -depth/2);
    for (var i = 0; i < count; i++) {
        instancedGlass.setMatrixAt(i, matrix);
    };
    return ([instancedEdge, instancedGlass]);
}

export function createObjectWindow() {
    const meshEdge = new THREE.Mesh(geometryM[0], materialM[0]);
    const meshGlass = new THREE.Mesh(geometryM[1], materialM[1]);

    meshGlass.position.z = -depth / 2;

    meshEdge.add(meshGlass);

    return meshEdge;
}

export function createGeoMatWindow(w = width, h = height, d = depth, s = shift) {
    width = w;
    height = h;
    depth = d;
    shift = s;

    geometryM.length = 0;

    const geometryEdge = createGeometryExternalWindow(w, h, d, s);
    const geometryGlass = createGeometryPlane(width - shift, height - shift);

    if (materialM.length == 0) {
        const materialEdge = new THREE.MeshPhongMaterial({
            color: 0x000000,
        });
        const materialGlass = new THREE.MeshPhysicalMaterial({
            color: "white",
            opacity: 0.5,
            transparent: true,
            side: THREE.DoubleSide,
        });
        materialM.push(materialEdge);
        materialM.push(materialGlass);
    }

    geometryM.push(geometryEdge);
    geometryM.push(geometryGlass);
}

export function createWindowOptimized(w, h, d, s = 0.5) {               //deprecated
    const externalGeometry = createGeometryExternalWindow(w, h, d, s);
    const planeGeometry = createGeometryPlane();
    
    const materialPlane = new THREE.MeshPhysicalMaterial({
        color: "white",
        opacity: 0.5,
        transparent: true,
        side: THREE.DoubleSide,
    });

    const materialWindow = new THREE.MeshPhongMaterial({
        color: 0x000000,
    });

    const meshWindow = new THREE.Mesh(externalGeometry, materialWindow);
    const meshPlane = createMesh(planeGeometry, materialPlane, (w - s), (h - s), 1);
    meshPlane.position.z = -d + 0.5;

    meshWindow.add(meshPlane);

    return meshWindow;
}

export function createWindow(width, height, depth, shift = 0.5)         //inutilizzata
{
    const ret = new THREE.Object3D();

    const edge = new THREE.Shape()
    .moveTo(-(width / 2), -(height / 2))
    .lineTo(width / 2, -(height / 2))
    .lineTo(width / 2, height / 2)
    .lineTo(-(width / 2), height / 2)

    const holeEdge = new THREE.Shape()
    .moveTo(-(width / 2) + shift, -(height / 2) + shift)
    .lineTo(-(width / 2) + shift, height / 2 - shift)
    .lineTo(width / 2 - shift, height / 2 - shift)
    .lineTo(width / 2 - shift, -(height / 2) + shift)

    edge.holes.push(holeEdge);

    const geometryInnerWindow = new THREE.ShapeGeometry(holeEdge);
    const materialInnerWindow = new THREE.MeshPhysicalMaterial({
        roughness: 0,
        transmission: 0.7,
        thickness: 0.5,
        side: THREE.DoubleSide,
    });
    const meshInnerWindow = new THREE.Mesh(geometryInnerWindow, materialInnerWindow);

    meshInnerWindow.position.z = depth / 2;

    const extrudeSettings = {
        depth: depth,
    };

    const geometryWindow = new THREE.ExtrudeGeometry(edge, extrudeSettings);
    const materialWindow = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
    });
    const meshWindow = new THREE.Mesh(geometryWindow, materialWindow);

    //meshWindow.position.x = width - ;
    //meshWindow.position.y = ;
    meshWindow.position.z = - depth / 2;

    meshWindow.add(meshInnerWindow);

    //const rectLight1 = new THREE.RectAreaLight( 0xffffff, 5, width, height );

    ret.add(meshWindow);
    //ret.add(rectLight1);
    //ret.add( new RectAreaLightHelper( rectLight1 ));

    return ret;
}