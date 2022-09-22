
const computerTexture = [];

class Computer extends Element {
    intersectionMesh = [];
    constructor (obj, width, height, depth) {
        super(obj, width, height, depth)
        this.type = "Computer";
    };
}

function loadComputerTexture(loader) {
    const texture1 = loader.load("src/element/texture/imac.png");

    texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(0.135, 0.18);
    texture1.offset.set(0.5, -0.35);
    texture1.rotation = Math.PI;

    const texture2 = loader.load("src/element/texture/applelogo.png");

    texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set(0.135, 0.18);
    texture2.offset.set(0.5, -0.35);
    //texture2.rotation = Math.PI;

    computerTexture.push(texture1, texture2);
}

function createComputer () {
    const obj = new THREE.Object3D;

    const base = new THREE.Shape()
    .moveTo(-1, -1)
    .bezierCurveTo(-1.5, -1, -1.375, -0.5, -1.375, -0.5)
    .lineTo(-1, 1)
    .lineTo(1, 1)
    .lineTo(1.375, -0.5)
    .bezierCurveTo(1.5, -1, 1, -1, 1, -1)
    .lineTo(-1, -1)

    const extrudeSettingsBot = {
        bevelEnabled: false,
        depth: 0.2,
    };

    const geometryBottom = new THREE.ExtrudeGeometry(base, extrudeSettingsBot);
    const materialBottom = new THREE.MeshPhongMaterial({
        color: 0xD3D3D3,
        side: THREE.DoubleSide,
    });
    const meshBottom = new THREE.Mesh(geometryBottom, materialBottom);

    meshBottom.position.z = -extrudeSettingsBot.depth / 2;

    obj.add(meshBottom);

    //obj.scale.set(5, 5, 5);

    const middle = new THREE.Shape()
    .moveTo(-1, -1.5)
    .lineTo(-0.5, 1.5)
    .lineTo(0.5, 1.5)
    .lineTo(1, -1.5)
    .lineTo(-1, -1.5)

    const holeMiddle = new THREE.Path()
    .moveTo(-0.375, 0)
    .arc(0.375, 0, 0.375, Math.PI, -Math.PI)

    middle.holes.push(holeMiddle);

    const extrudeSettingsMiddle = {
        bevelEnabled: false,
        depth: 0.2,
    };

    const geometryMiddle = new THREE.ExtrudeGeometry(middle, extrudeSettingsMiddle);
    const materialMiddle = new THREE.MeshPhongMaterial({
        color: 0xD3D3D3,
        side: THREE.DoubleSide,
    });
    const meshMiddle = new THREE.Mesh(geometryMiddle, materialMiddle);

    const shifty = 0.1;
    const shiftz = 0.1;

    const rotationAngle = THREE.MathUtils.DEG2RAD * (20);
    meshMiddle.position.z = -extrudeSettingsMiddle.depth / 2;
    meshMiddle.rotation.x = (rotationAngle + (Math.PI / 2));
    meshMiddle.position.y = 1 - (Math.sin(rotationAngle) * 1.5) + (Math.cos(rotationAngle) * extrudeSettingsMiddle.depth) + shifty;
    meshMiddle.position.z += (Math.cos(rotationAngle) * 1.5) + (Math.sin(rotationAngle) * extrudeSettingsMiddle.depth) + extrudeSettingsBot.depth + shiftz;
    obj.add(meshMiddle);

    const p1 = [-extrudeSettingsBot.depth / 2, 0];
    const p2 = [extrudeSettingsBot.depth / 2, 0];
    const p3 = [p1[0] - shiftz, p1[1] + shifty];
    const p4 = [p3[0] - (Math.sin(rotationAngle) * extrudeSettingsMiddle.depth), p3[1] + (Math.cos(rotationAngle) * extrudeSettingsMiddle.depth)];

    const mP1P3 = [p1[0] + ((p3[0] - p1[0]) / 2), p3[1] + ((p1[1] - p3[1]) / 2)];
    const mP2P4 = [p2[0] + ((p4[0] - p2[0]) / 2), p4[1] + ((p2[1] - p4[1]) / 2)];
    const pRotation13 = 0.05;
    const pRotation24 = 0.2;

    const btoM = new THREE.Shape()
    .moveTo(p1[0], p1[1])
    .bezierCurveTo(p1[0], p1[1], mP1P3[0] + pRotation13, mP1P3[1] + pRotation13, p3[0], p3[1])
    .lineTo(p4[0], p4[1])
    .bezierCurveTo(p4[0], p4[1], mP2P4[0] + pRotation24, mP2P4[1] + pRotation24, p2[0], p2[1])
    .lineTo(p1[0], p1[1])

    const extrudeSettingsBtoM = {
        bevelEnabled: false,
        depth: 2,
    };

    const geometryBtoM = new THREE.ExtrudeGeometry(btoM, extrudeSettingsBtoM);
    const materialBtoM = new THREE.MeshPhongMaterial({
        color: 0xD3D3D3,
        side: THREE.DoubleSide,
    });
    const meshBtoM = new THREE.Mesh(geometryBtoM, materialBtoM);

    meshBtoM.position.z = 0;
    meshBtoM.rotateY(Math.PI / 2);
    meshBtoM.position.y = 1;
    meshBtoM.position.x = -1;
    obj.add(meshBtoM);

    const screen = new THREE.Shape()
    .moveTo(-3.5, -2.5)
    .bezierCurveTo(-3.5, -2.5, -3.83, -2.5, -3.83, -2.17)
    .lineTo(-3.83, 2.17)
    .bezierCurveTo(-3.83, 2.17, -3.83, 2.5, -3.5, 2.5)
    .lineTo(3.5, 2.5)
    .bezierCurveTo(3.5, 2.5, 3.83, 2.5, 3.83, 2.17)
    .lineTo(3.83, -2.17)
    .bezierCurveTo(3.83, -2.17, 3.83, -2.5, 3.5, -2.5)
    .lineTo(-3.5, -2.5)

    const extrudeSettingsScreen = {
        bevelEnabled: false,
        depth: 0.2,
    };

    const geometryScreen = new THREE.ExtrudeGeometry(screen, extrudeSettingsScreen);
    const materialScreen = new THREE.MeshPhongMaterial({
        color: 0xD3D3D3,
        side: THREE.DoubleSide,
    });
    const meshScreen = new THREE.Mesh(geometryScreen, materialScreen);

    const extrudeSettingsScreen2 = {
        bevelEnabled: false,
        depth: 0.0,
    };

    const geometryScreen2 = new THREE.ExtrudeGeometry(screen, extrudeSettingsScreen2);
    const materialScreen2 = new THREE.MeshPhongMaterial({
        map: computerTexture[0],
        side: THREE.DoubleSide,
    });
    const meshScreen2 = new THREE.Mesh(geometryScreen2, materialScreen2);

    const geometryScreen3 = new THREE.ExtrudeGeometry(screen, extrudeSettingsScreen2);
    const materialScreen3 = new THREE.MeshPhongMaterial({
        map: computerTexture[1],
        side: THREE.DoubleSide,
    });
    const meshScreen3 = new THREE.Mesh(geometryScreen3, materialScreen3);

    meshScreen2.position.z = extrudeSettingsScreen.depth + 0.01;
    meshScreen3.position.z = -0.01;
    meshScreen.add(meshScreen2);
    meshScreen.add(meshScreen3);

    const rotationAngleScreen = THREE.MathUtils.DEG2RAD * 10;
    meshScreen.rotateX(Math.PI / 2 - rotationAngleScreen);
    console.log(meshMiddle.position.z);
    meshScreen.position.y = meshMiddle.position.y - (Math.sin(rotationAngle) * (1.5));
    meshScreen.position.z = meshMiddle.position.z + (Math.cos(rotationAngle) * (1.5));
    obj.add(meshScreen);

    const ret = new Computer(obj, 1, 1.2, 0.5);
    ret.intersectionMesh = [[3]];
    return ret;
}