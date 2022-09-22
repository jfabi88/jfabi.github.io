
 function placeObj(obj, pos, rot, scale) {
    if (pos != null)
        obj.position.set(pos[0], pos[1], pos[2]);
    if (rot != null)
        obj.rotation.set(rot[0], rot[1], rot[2]); //da verificare che rotation.set esista
    if (scale != null)
        obj.scale.set(scale[0], scale[1], scale[0]);
}

function removeFromArray(obj, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == obj) {
          array.splice(i, 1);
          break ;
        }
    } 
}

function newScale(obj, scale) {
    obj.obj.scale.set(scale[0], scale[1], scale[2]);
    obj.width *= scale[0];
    obj.height *= scale[1];
    obj.depth *= scale[2];
}

function componeGeometry(vertices, index) {

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

    geometry.setIndex(index);

    return geometry;
}

 function createGeometryOctagon(width = 2, height = 2, factor = 0.75) {
    const vertices = [
        { pos: [0, 0, 0], norm: [ 0, 0, 1], uv: [0, 1], },          //0
        { pos: [0, 0.5 * height, 0], norm: [ 0, 0, 1], uv: [0, 1], },          //1
        { pos: [-0.5 * width * factor, 0.5 * width * factor, 0], norm: [ 0, 0, 1], uv: [0, 1], },   //2 
        { pos: [-0.5 * width, 0, 0], norm: [ 0, 0, 1], uv: [0, 1], },         //3
        { pos: [-0.5 * width * factor, -0.5 * height * factor, 0], norm: [ 0, 0, 1], uv: [0, 1], },  //4 
        { pos: [0, -0.5 * height, 0], norm: [ 0, 0, 1], uv: [0, 1], },         //5
        { pos: [0.5 * width * factor, -0.5 * height * factor, 0], norm: [ 0, 0, 1], uv: [0, 1], },   //6 
        { pos: [0.5 * width, 0, 0], norm: [ 0, 0, 1], uv: [0, 1], },          //7
        { pos: [0.5 * width * factor, 0.5 * height * factor, 0], norm: [ 0, 0, 1], uv: [0, 1], },    //8
    ];

    const index = [];
    for (var i = 0; i < 7; i++) {
        index.push(0, 1 + i, 2 + i);
    }
    index.push(0, 8, 1);

    return componeGeometry(vertices, index);
}

 function createGeometryPlane(width = 2, height = 2) {
    const vertices = [
        { pos: [-0.5 * width, -0.5 * height,  0], norm: [ 0,  0,  1], uv: [0, 1], }, // 0
        { pos: [ 0.5 * width, -0.5 * height,  0], norm: [ 0,  0,  1], uv: [1, 1], }, // 1
        { pos: [-0.5 * width,  0.5 * height,  0], norm: [ 0,  0,  1], uv: [0, 0], }, // 2
        { pos: [ 0.5 * width,  0.5 * height,  0], norm: [ 0,  0,  1], uv: [1, 0], }, // 3
    ];

    const index = [0, 1, 2, 2, 1, 3];

    return componeGeometry(vertices, index);
}

 function createGeometryCube(face, width = 2, height = 2, depth = 2) {
    const vertices = [];
    const index = [];
    var size = 0;

    if (face[0]) {
        vertices.push(
            // front == 1
            { pos: [-0.5 * width, -0.5 * height,  0.5 * depth], norm: [ 0,  0,  1], uv: [0, 1], }, // 0
            { pos: [ 0.5 * width, -0.5 * height,  0.5 * depth], norm: [ 0,  0,  1], uv: [1, 1], }, // 1
            { pos: [-0.5 * width,  0.5 * height,  0.5 * depth], norm: [ 0,  0,  1], uv: [0, 0], }, // 2
            { pos: [ 0.5 * width,  0.5 * height,  0.5 * depth], norm: [ 0,  0,  1], uv: [1, 0], }, // 3
        )
        index.push(0,  1,  2,   2,  1,  3);
        size++;
    }
    if (face[1]) {
        vertices.push(
            // right == 2
            { pos: [ 0.5 * width, -0.5 * height,  0.5 * depth], norm: [ 1,  0,  0], uv: [0, 1], }, // 4
            { pos: [ 0.5 * width, -0.5 * height, -0.5 * depth], norm: [ 1,  0,  0], uv: [1, 1], }, // 5
            { pos: [ 0.5 * width,  0.5 * height,  0.5 * depth], norm: [ 1,  0,  0], uv: [0, 0], }, // 6
            { pos: [ 0.5 * width,  0.5 * height, -0.5 * depth], norm: [ 1,  0,  0], uv: [1, 0], }, // 7
        )
        index.push(0 + (4 * size),  1 + (4 * size),  2 + (4 * size),   2 + (4 * size),  1 + (4 * size),  3 + (4 * size));
        size++;
    }
    if (face[2]) {
        vertices.push(
            // back == 3
            { pos: [ 0.5 * width, -0.5 * height, -0.5 * depth], norm: [ 0,  0, -1], uv: [0, 1], }, // 8
            { pos: [-0.5 * width, -0.5 * height, -0.5 * depth], norm: [ 0,  0, -1], uv: [1, 1], }, // 9
            { pos: [ 0.5 * width,  0.5 * height, -0.5 * depth], norm: [ 0,  0, -1], uv: [0, 0], }, // 10
            { pos: [-0.5 * width,  0.5 * height, -0.5 * depth], norm: [ 0,  0, -1], uv: [1, 0], }, // 11
        )
        index.push(0 + (4 * size),  1 + (4 * size),  2 + (4 * size),   2 + (4 * size),  1 + (4 * size),  3 + (4 * size));
        size++;
    }
    if (face[3]) {
        // left == 4
        vertices.push(
            { pos: [-0.5 * width, -0.5 * height, -0.5 * depth], norm: [-1,  0,  0], uv: [0, 1], }, // 12
            { pos: [-0.5 * width, -0.5 * height,  0.5 * depth], norm: [-1,  0,  0], uv: [1, 1], }, // 13
            { pos: [-0.5 * width,  0.5 * height, -0.5 * depth], norm: [-1,  0,  0], uv: [0, 0], }, // 14
            { pos: [-0.5 * width,  0.5 * height,  0.5 * depth], norm: [-1,  0,  0], uv: [1, 0], }, // 15
        )
        index.push(0 + (4 * size),  1 + (4 * size),  2 + (4 * size),   2 + (4 * size),  1 + (4 * size),  3 + (4 * size));
        size++;
    }
    if (face[4]) {
        vertices.push(   
            // top == 5
            { pos: [ 0.5 * width,  0.5 * height, -0.5 * depth], norm: [ 0,  1,  0], uv: [0, 1], }, // 16
            { pos: [-0.5 * width,  0.5 * height, -0.5 * depth], norm: [ 0,  1,  0], uv: [1, 1], }, // 17
            { pos: [ 0.5 * width,  0.5 * height,  0.5 * depth], norm: [ 0,  1,  0], uv: [0, 0], }, // 18
            { pos: [-0.5 * width,  0.5 * height,  0.5 * depth], norm: [ 0,  1,  0], uv: [1, 0], }, // 19
        )
        index.push(0 + (4 * size),  1 + (4 * size),  2 + (4 * size),   2 + (4 * size),  1 + (4 * size),  3 + (4 * size));
        size++;
    }
    if (face[5]) {
        vertices.push(   
            // bottom == 6
            { pos: [ 0.5 * width, -0.5 * height,  0.5 * depth], norm: [ 0, -1,  0], uv: [0, 1], }, // 20
            { pos: [-0.5 * width, -0.5 * height,  0.5 * depth], norm: [ 0, -1,  0], uv: [1, 1], }, // 21
            { pos: [ 0.5 * width, -0.5 * height, -0.5 * depth], norm: [ 0, -1,  0], uv: [0, 0], }, // 22
            { pos: [-0.5 * width, -0.5 * height, -0.5 * depth], norm: [ 0, -1,  0], uv: [1, 0], }, // 23
        )
        index.push(0 + (4 * size),  1 + (4 * size),  2 + (4 * size),   2 + (4 * size),  1 + (4 * size),  3 + (4 * size));
    }

    return componeGeometry(vertices, index);
}

 function createCube(width, height, depth, material) {
    const cubeGeometry = new THREE.BoxGeometry(width, height, depth);
    const cubeMesh = new THREE.Mesh(cubeGeometry, material);
    return cubeMesh;
}

 function createPlane(width, height, material) {
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const planeMesh = new THREE.Mesh(planeGeometry, material);
    return planeMesh;
}

function rotateOnPoint(obj, point, axis, angle) {
    var newObj = obj.clone();
    newObj.position.sub(point);
    newObj.position.applyAxisAngle(axis, angle);
    newObj.position.add(point);
    newObj.rotateOnAxis(axis, angle);
    return ([newObj.position, newObj.quaternion]);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}