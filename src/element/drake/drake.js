
function createRotationTileDrake(drake, group) {
    var tween1;
    var tween2;

    var obj = drake.obj.children[0].children[0].children[4];

    var a = Math.PI / 4;
    obj.rotation.x = -Math.PI / 4;

    tween1 = new TWEEN.Tween(obj.rotation, group);
    tween1.to({x: [0, a, 0, -a], y: [-a, 0, a, 0]}, 2000).interpolation(TWEEN.Interpolation.Bezier);

    tween1.chain(tween2);

    tween1.start().repeat(Infinity);
}

function createRotationWingsDrake(drake, group) {
    var tween1;
    var tween12;

    var obj1 = drake.obj.children[0].children[0].children[2];
    var obj2 = drake.obj.children[0].children[0].children[3];

    tween1 = new TWEEN.Tween(obj1.rotation, group);
    tween1.to({x: [-Math.PI / 4, 0]}, 1000);

    tween12 = new TWEEN.Tween(obj2.rotation, group);
    tween12.to({y: [Math.PI / 4, 0]}, 1000);

    tween1.start();
    tween12.start();
}

function createRotationTile(drake, mixers, actions) {

    const times = [0, 0.5, 1.0, 1.5, 2.0];
    const times2 = [0, 0.8, 1.6, 2.4, 3.2];
    const times3 = [0, 0.5, 1.0];
    //const dcq = drake.obj.children[0].children[0].children[4].quaternion;
    const values = [
        0, 0.383, 0, 0.924,
        -0.383, 0.0, 0, 0.924,
        0, -0.383, 0, 0.924,
        0.383, 0.0, 0, 0.924,
        0, 0.383, 0, 0.924,
    ]
    const length = -1;

    const positionKf = new THREE.QuaternionKeyframeTrack(".quaternion", times, values);
    const tracks = [positionKf];
    const clipSlipC = new THREE.AnimationClip("tile", length, tracks);
    const mixerC = new THREE.AnimationMixer(drake.obj.children[0].children[0].children[4]);
    const actionC = mixerC.clipAction(clipSlipC);

    const values2 = [
        0, 0.707, 0, 0.707,
        -0.707, 0.0, 0, 0.707,
        0, -0.707, 0, 0.707,
        0.707, 0.0, 0, 0.707,
        0, 0.707, 0, 0.707,
    ];

    const positionKf2 = new THREE.QuaternionKeyframeTrack(".quaternion", times2, values2);
    const tracks2 = [positionKf2];
    const clipSlipC2 = new THREE.AnimationClip("tile", length, tracks2);
    const mixerC2 = new THREE.AnimationMixer(drake.obj.children[0].children[0].children[4].children[0].children[0]);
    const actionC2 = mixerC2.clipAction(clipSlipC2);

    const values3 = [
        0, 0.383, 0, 0.924,
        0, 0.0, 0, 1,
        0, -0.383, 0, 0.924,
    ];

    const positionKf3 = new THREE.QuaternionKeyframeTrack(".quaternion", times3, values3);
    const tracks3 = [positionKf3];
    const clipSlipC3 = new THREE.AnimationClip("tile", length, tracks3);
    const mixerC3 = new THREE.AnimationMixer(drake.obj.children[0].children[0].children[4].children[0].children[0].children[0].children[0]);
    const actionC3 = mixerC3.clipAction(clipSlipC3);
    
    mixers.push(mixerC, mixerC2, mixerC3);
    var toPush = [];
    toPush.push(actionC, actionC2, actionC3);
    actions["tile"] = toPush;
}

function createAnimationWalking(drake, mixers, actions) {
    
    const times = [0, 0.25, 0.5, 0.75, 1.0];

    var leg1 = drake.obj.children[1].position;
    var leg2 = drake.obj.children[2].position;
    var leg3 = drake.obj.children[3].position;
    var leg4 = drake.obj.children[4].position;

    const valuesL1 = [
        leg1.x, leg1.y, leg1.z,
        leg1.x, leg1.y, leg1.z - 2,
        leg1.x, leg1.y, leg1.z - 4,
        leg1.x, leg1.y + 2, leg1.z - 2,
        leg1.x, leg1.y, leg1.z,
    ];

    const valuesL2 = [
        leg2.x, leg2.y, leg2.z,
        leg2.x, leg2.y + 2, leg2.z + 2,
        leg2.x, leg2.y, leg2.z + 4,
        leg2.x, leg2.y, leg2.z + 2,
        leg2.x, leg2.y, leg2.z,
    ];

    const valuesL3 = [
        leg3.x, leg3.y, leg3.z,
        leg3.x, leg3.y, leg3.z - 2,
        leg3.x, leg3.y, leg3.z - 4,
        leg3.x, leg3.y + 2, leg3.z - 2,
        leg3.x, leg3.y, leg3.z,
    ];

    const valuesL4 = [
        leg4.x, leg4.y, leg4.z,
        leg4.x, leg4.y + 2, leg4.z + 2,
        leg4.x, leg4.y, leg4.z + 4,
        leg4.x, leg4.y, leg4.z + 2,
        leg4.x, leg4.y, leg4.z,
    ];

    const length = -1;

    const positionLeg1 = new THREE.VectorKeyframeTrack(".position", times, valuesL1);
    const positionLeg2 = new THREE.VectorKeyframeTrack(".position", times, valuesL2);
    const positionLeg3 = new THREE.VectorKeyframeTrack(".position", times, valuesL3);
    const positionLeg4 = new THREE.VectorKeyframeTrack(".position", times, valuesL4);

    const tracksL1 = [positionLeg1];
    const tracksL2 = [positionLeg2];
    const tracksL3 = [positionLeg3];
    const tracksL4 = [positionLeg4];

    const clipSlipL1 = new THREE.AnimationClip("walk", length, tracksL1);
    const clipSlipL2 = new THREE.AnimationClip("walk", length, tracksL2);
    const clipSlipL3 = new THREE.AnimationClip("walk", length, tracksL3);
    const clipSlipL4 = new THREE.AnimationClip("walk", length, tracksL4);

    const mixerL1 = new THREE.AnimationMixer(drake.obj.children[1]);
    const mixerL2 = new THREE.AnimationMixer(drake.obj.children[2]);
    const mixerL3 = new THREE.AnimationMixer(drake.obj.children[3]);
    const mixerL4 = new THREE.AnimationMixer(drake.obj.children[4]);

    const actionL1 = mixerL1.clipAction(clipSlipL1);
    const actionL2 = mixerL2.clipAction(clipSlipL2);
    const actionL3 = mixerL3.clipAction(clipSlipL3);
    const actionL4 = mixerL4.clipAction(clipSlipL4);

    mixers.push(mixerL1, mixerL2, mixerL3, mixerL4);
    var toPush = [];
    toPush.push(actionL1, actionL2, actionL3, actionL4);
    actions["walk"] = toPush;
}

function createAnimationLeg(drake, group) {
    
    var tween1;
    var tween2;
    var tween3;
    var tween4;
    var tween7;

    var body = drake.obj.children[0].children[0];
    var obj1 = drake.obj.children[1];
    var obj2 = drake.obj.children[2];
    var obj3 = drake.obj.children[3];
    var obj4 = drake.obj.children[4];

    const starty = obj1.position.y;
    const startz = obj1.position.z;
    const starty2 = obj2.position.y;
    const startz2 = obj2.position.z;

    const yM = [];
    const zM = [];
    const yM2 = [];
    const zM2 = [];

    yM.push(starty, starty + 2, starty + 4, starty + 4, starty + 4, starty, starty, starty, starty);
    zM.push(startz, startz, startz, startz, startz + 2, startz + 2, startz + 2, startz + 1, startz);
    yM2.push(starty2, starty2 + 2, starty2 + 4, starty2 + 4, starty2 + 4, starty2, starty2, starty2, starty2);
    zM2.push(startz2, startz2, startz2, startz2, startz2 + 2, startz2 + 2, startz2 + 2, startz2 + 1, startz2);

    tween1 = new TWEEN.Tween(obj1.position, group);
    tween1.to({y: yM, z: zM}, 500).interpolation(TWEEN.Interpolation.Bezier);
    tween2 = new TWEEN.Tween(obj2.position, group);
    tween2.to({y: yM2, z: zM2}, 500).interpolation(TWEEN.Interpolation.Bezier);
    tween3 = new TWEEN.Tween(obj3.position, group);
    tween3.to({y: yM, z: zM}, 500).interpolation(TWEEN.Interpolation.Bezier);
    tween4 = new TWEEN.Tween(obj4.position, group);
    tween4.to({y: yM2, z: zM2}, 500).interpolation(TWEEN.Interpolation.Bezier);
    tween1.start().repeat(Infinity).repeatDelay(500);
    tween2.start().repeat(Infinity).repeatDelay(500);
    tween3.delay(500).start().repeat(Infinity);
    tween4.delay(500).start().repeat(Infinity);


    tween7 = new TWEEN.Tween(body.position, group);
    tween7.to({y: [0.3, -0.3, 0]}, 500).start().repeat(Infinity);
}

function createDrakeSlipAnimation(drake, mixers, actions) {
    const times = [0, 0.5, 1.0];
    const dcp = drake.center.position;
    const values = [dcp.x, dcp.y, dcp.z, dcp.x, dcp.y - 2, dcp.z, dcp.x, dcp.y, dcp.z]
    const length = -1;

    const positionKf = new THREE.VectorKeyframeTrack(".position", times, values);
    const tracks = [positionKf];
    const clipSlipC = new THREE.AnimationClip("slipC", length, tracks);
    const mixerC = new THREE.AnimationMixer(drake.center);
    const actionC = mixerC.clipAction(clipSlipC);
    mixers.push(mixerC);
    var toPush = [];
    toPush.push(actionC);
    actions["slip"] = toPush;
}

function createDrakeJumpAnimation(drake, mixers, actions) {
    const times = [0, 0.1, 0.9, 1.0];
    const timesW = [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0];

    const length = -1;
    const dcp = drake.center.position;
    const dcr = drake.center.quaternion;
    const rw1 = drake.obj.children[0].children[0].children[2].quaternion;
    const rw2 = drake.obj.children[0].children[0].children[3].quaternion;
    
    const valuesCenterPosition = [dcp.x, dcp.y, dcp.z, dcp.x, dcp.y + 8, dcp.z, dcp.x, dcp.y + 8, dcp.z, dcp.x, dcp.y, dcp.z];
    const valuesCenterRotation = [
        dcr.x, dcr.y, dcr.z, dcr.w,
        dcr.x - 0.259, dcr.y, dcr.z, 0.966,
        dcr.x - 0.259, dcr.y, dcr.z, 0.966,
        dcr.x, dcr.y, dcr.z, dcr.w
    ];
    const valuesWR1 = [
        rw1.x, rw1.y, rw1.z, rw1.w,
        rw1.x -0.383, rw1.y, rw1.z, 0.924,
        rw1.x, rw1.y, rw1.z,rw1.w, 
        rw1.x -0.383, rw1.y, rw1.z, 0.924,
        rw1.x, rw1.y, rw1.z, rw1.w, 
        rw1.x -0.383, rw1.y, rw1.z, 0.924,
        rw1.x, rw1.y, rw1.z, rw1.w,
    ];

    const valuesWR2 = [
        rw2.x, rw2.y, rw2.z, rw2.w,
        rw2.x, rw2.y + 0.383, rw2.z, 0.924,
        rw2.x, rw2.y, rw2.z, rw2.w,
        rw2.x, rw2.y + 0.383, rw2.z, 0.924,
        rw2.x, rw2.y, rw2.z, rw2.w,
        rw2.x, rw2.y + 0.383, rw2.z, 0.924,
        rw2.x, rw2.y, rw2.z, rw2.w,
    ];

    const positionKf = new THREE.VectorKeyframeTrack(".position", times, valuesCenterPosition);
    const tracks = [positionKf];
    const clipSlipC = new THREE.AnimationClip("jumpC", length, tracks);
    const mixerC = new THREE.AnimationMixer(drake.center);
    const actionC = mixerC.clipAction(clipSlipC);

    const rotationKf = new THREE.VectorKeyframeTrack(".quaternion", times, valuesCenterRotation);
    const tracksR = [rotationKf];
    const clipSlipR = new THREE.AnimationClip("jumpC", length, tracksR);
    const mixerR = new THREE.AnimationMixer(drake.center);
    const actionR = mixerC.clipAction(clipSlipR);

    const rotatioW1 = new THREE.VectorKeyframeTrack(".quaternion", timesW, valuesWR1);
    const rotatioW2 = new THREE.VectorKeyframeTrack(".quaternion", timesW, valuesWR2);

    const tracksW1 = [rotatioW1];
    const tracksW2 = [rotatioW2];
    const clipJumpW = new THREE.AnimationClip("jumpC", length, tracksW1);
    const clipJumpW2 = new THREE.AnimationClip("jumpC", length, tracksW2);

    const mixerW1 = new THREE.AnimationMixer(drake.obj.children[0].children[0].children[2]);
    const actionW1 = mixerW1.clipAction(clipJumpW);
    const mixerW2 = new THREE.AnimationMixer(drake.obj.children[0].children[0].children[3]);
    const actionW2 = mixerW2.clipAction(clipJumpW2);

    mixers.push(mixerC, mixerR, mixerW1, mixerW2);
    var toPush = [];
    toPush.push(actionC, actionR, actionW1, actionW2);
    actions["jump"] = toPush;
}

function createDrakeAnimationHead(drake, mixers, actions) {
    const times = [0, 0.3, 0.5, 0.7, 1.0, 1.3, 1.5, 1.7, 2.0];
    const timesW = [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0, 3.0];

    const dcq = drake.center.children[1].quaternion;
    const rw1 = drake.obj.children[0].children[0].children[2].quaternion;
    const rw2 = drake.obj.children[0].children[0].children[3].quaternion;

    const values = [
        dcq.x, dcq.y, dcq.z, dcq.w,
        -0.023, -0.172, 0.129, 0.976,
        -0.018, -0.138, 0.129, 0.982,
        -0.023, -0.172, 0.129, 0.976,
        dcq.x, dcq.y, dcq.z, dcq.w,
        -0.023, 0.172, -0.129, 0.958,
        -0.018, 0.138, -0.129, 0.982,
        -0.023, 0.172, -0.129, 0.958,
        dcq.x, dcq.y, dcq.z, dcq.w,
    ];

    const length = -1;

    const positionKf = new THREE.VectorKeyframeTrack(".quaternion", times, values);
    const tracks = [positionKf];
    const clipSlipC = new THREE.AnimationClip("slipC", length, tracks);
    const mixerC = new THREE.AnimationMixer(drake.center.children[1]);
    const actionC = mixerC.clipAction(clipSlipC);

    const valuesWR1 = [
        rw1.x, rw1.y, rw1.z, rw1.w,
        rw1.x -0.383, rw1.y, rw1.z, 0.924,
        rw1.x, rw1.y, rw1.z,rw1.w, 
        rw1.x -0.383, rw1.y, rw1.z, 0.924,
        rw1.x, rw1.y, rw1.z, rw1.w, 
        rw1.x -0.383, rw1.y, rw1.z, 0.924,
        rw1.x, rw1.y, rw1.z, rw1.w,
        rw1.x, rw1.y, rw1.z, rw1.w,
    ];

    const valuesWR2 = [
        rw2.x, rw2.y, rw2.z, rw2.w,
        rw2.x, rw2.y + 0.383, rw2.z, 0.924,
        rw2.x, rw2.y, rw2.z, rw2.w,
        rw2.x, rw2.y + 0.383, rw2.z, 0.924,
        rw2.x, rw2.y, rw2.z, rw2.w,
        rw2.x, rw2.y + 0.383, rw2.z, 0.924,
        rw2.x, rw2.y, rw2.z, rw2.w,
        rw2.x, rw2.y, rw2.z, rw2.w,
    ];

    const rotatioW1 = new THREE.VectorKeyframeTrack(".quaternion", timesW, valuesWR1);
    const rotatioW2 = new THREE.VectorKeyframeTrack(".quaternion", timesW, valuesWR2);

    const tracksW1 = [rotatioW1];
    const tracksW2 = [rotatioW2];
    const clipJumpW = new THREE.AnimationClip("jumpC", length, tracksW1);
    const clipJumpW2 = new THREE.AnimationClip("jumpC", length, tracksW2);

    const mixerW1 = new THREE.AnimationMixer(drake.obj.children[0].children[0].children[2]);
    const actionW1 = mixerW1.clipAction(clipJumpW);
    const mixerW2 = new THREE.AnimationMixer(drake.obj.children[0].children[0].children[3]);
    const actionW2 = mixerW2.clipAction(clipJumpW2);

    mixers.push(mixerC, mixerW1, mixerW2);
    var toPush = [];
    toPush.push(actionC, actionW1, actionW2);
    actions["shake"] = toPush;
}

function createDrake() {

    const obj = new THREE.Object3D();

    const bodyWidth = 2 * Math.sqrt(2);
    const bodyHeight = 2 * Math.sqrt(2);
    const bodyDepth = 3;

    const legWidth = 1.5;
    const legHeight = 0.5;
    const legDepth = 1.5;

    const wingWidth = 1.5;
    const wingHeight = 2.5;
    const wingDepth = 0.5;

    const headWidth = 4;
    const headHeight = 3.5;
    const headDepth = 5;

    const coneRadius = 0.8;
    const coneHeight = 0.8;

    const eyeWidth = 0.2;
    const eyeHeight = 1.5;
    const eyeDepth = 1.5;

    const earWidth = 0.5;
    const earHeight = 1.5;
    const earDepth = 0.2;

    const innerEyeWidth = 0.25;
    const innerEyeHeight = 0.8;
    const innerEyeDepth = 0.8;

    const tileWidth = 0.1;
    const tileHeigth = 0.1;
    const tileDepth = 0.75;

    const greenMaterial = new THREE.MeshPhongMaterial({color: "rgb(147, 197, 114)"});
    const greenMaterialT = new THREE.MeshPhongMaterial({color: "rgb(147, 197, 114)", side: THREE.DoubleSide});
    const yellowMaterial = new THREE.MeshBasicMaterial( {color: 0xfffe75} );
    const whiteMaterial = new THREE.MeshPhongMaterial({color: "rgb(255, 255, 255)"});
    const redMaterial = new THREE.MeshPhongMaterial({color: 0xff1749});
    const blackMaterial = new THREE.MeshPhongMaterial({color: 0x000000});

    const geometryBody = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth);
    const body = new THREE.Mesh(geometryBody, greenMaterial);
    body.rotateZ(Math.PI / 4);
    body.layers.set(1);

    const shape = new THREE.Shape()
    .moveTo(-0.75, 0)
    .lineTo(0, 0.75)
    .lineTo(0.75, 0)

    const triangleGeometry = new THREE.ShapeGeometry(shape);
    const triangle1 = new THREE.Mesh(triangleGeometry, greenMaterialT);
    const triangle2 = new THREE.Mesh(triangleGeometry, greenMaterialT);

    triangle1.rotateY(Math.PI / 2);
    triangle2.rotateY(Math.PI / 2);
    triangle1.rotateX(Math.PI / 4);
    triangle2.rotateX(Math.PI / 4);
    placeObj(triangle1, [bodyWidth / 2, bodyHeight/ 2, -0.75]);
    placeObj(triangle2, [bodyWidth / 2, bodyHeight/ 2, 0.75]);
    body.add(triangle1);                            //0-0-0
    body.add(triangle2);                            //0-0-1

    const rotationWing1 = new THREE.Object3D();
    const rotationWing2 = new THREE.Object3D();

    rotationWing1.position.y = bodyHeight / 2 + 0.6;
    rotationWing2.position.x = bodyWidth / 2 + 0.6;

    body.add(rotationWing1);                        //0-0-2
    body.add(rotationWing2);                        //0-0-3

    const wingsGeometry = new THREE.BoxGeometry(wingWidth, wingHeight, wingDepth);
    const wing1 = new THREE.Mesh(wingsGeometry, yellowMaterial);
    const wing2 = new THREE.Mesh(wingsGeometry, yellowMaterial);

    wing1.position.y = wingHeight / 2;
    wing2.position.x = wingHeight / 2;
    wing2.rotateZ(Math.PI / 2);
    wing1.rotateY(-Math.PI / 8);
    wing2.rotateY(-Math.PI / 8);

    rotationWing1.add(wing1);
    rotationWing2.add(wing2);

    const legGeometry = new THREE.BoxGeometry(legWidth, legHeight, legDepth);
    const leg1 = new THREE.Mesh(legGeometry, greenMaterial);
    const leg2 = new THREE.Mesh(legGeometry, greenMaterial);
    const leg3 = new THREE.Mesh(legGeometry, greenMaterial);
    const leg4 = new THREE.Mesh(legGeometry, greenMaterial);

    placeObj(leg1, [1 + legWidth / 2, -(2.5 + legHeight / 2), 1 + legDepth / 2]);
    placeObj(leg2, [1 + legWidth / 2, -(2.5 + legHeight / 2), -(1 + legDepth / 2)]);
    placeObj(leg3, [-(1 + legWidth / 2), -(2.5 + legHeight / 2), 1 + legDepth / 2]);
    placeObj(leg4, [-(1 + legWidth / 2), -(2.5 + legHeight / 2), -(1 + legDepth / 2)]);

    const center = new THREE.Object3D();
    obj.add(center);    //0
    center.add(body);   //0-0
    obj.add(leg1);      //1
    obj.add(leg2);      //2
    obj.add(leg3);      //3
    obj.add(leg4);      //4

    const rotationCone = new THREE.Object3D();
    rotationCone.position.z = -bodyDepth / 2;

    const geometryTile = new THREE.CylinderGeometry( tileWidth, tileHeigth, tileDepth, 6 );
    const tile = new THREE.Mesh( geometryTile, yellowMaterial );
    placeObj(tile, [0, 0, -tileDepth / 2], [Math.PI / 2, 0, 0]);
    rotationCone.add(tile);

    const rotationTile2 = new THREE.Object3D();
    rotationTile2.position.y = -tileDepth / 2;
    tile.add(rotationTile2);
    const tile2 = new THREE.Mesh( geometryTile, yellowMaterial);
    placeObj(tile2, [0, -tileDepth / 2, 0]);
    rotationTile2.add(tile2);

    const rotationTile3 = new THREE.Object3D();
    rotationTile3.position.y = -tileDepth / 2;
    tile2.add(rotationTile3);
    const tile3 = new THREE.Mesh( geometryTile, yellowMaterial);
    placeObj(tile3, [0, -tileDepth / 2, 0]);
    rotationTile3.add(tile3);

    const geometryCone = new THREE.ConeGeometry( coneRadius, coneHeight, 4, 1, false );
    const cone = new THREE.Mesh( geometryCone, yellowMaterial);
    //cone.rotateY(Math.PI / 4);
    //cone.rotation.x = -Math.PI / 2;
    cone.position.y = - coneHeight / 2 - tileDepth / 2;
    cone.rotateX(Math.PI);
    tile3.add(cone);
    body.add(rotationCone);                      //0-0-4

    const geometryHead = new THREE.BoxGeometry(headWidth, headHeight, headDepth);
    const head = new THREE.Mesh(geometryHead, greenMaterial);
    //head.position.y = headHeight / 2;
    head.position.z = headDepth / 2;

    const rotationHead = new THREE.Object3D();
    center.add(rotationHead);
    rotationHead.position.y =  headHeight / 2;
    rotationHead.position.z = bodyDepth / 2 + 0.5;

    //rotationHead.quaternion.set(-0.034, -0.257, 0.126, 0.958);
    center.add(rotationHead);                              //0-1
    rotationHead.add(head);                                //0-1-0
    head.layers.set(1);

    //center.children[1].quaternion.set(-0.034, -0.257, 0.126, 0.958);

    const geometryHeadBottom = new THREE.BoxGeometry(headWidth - 2, headHeight / 6, headDepth / 2);
    const headBottom = new THREE.Mesh(geometryHeadBottom, greenMaterial);
    head.add(headBottom);
    placeObj(headBottom, [0, -(headHeight + headHeight / 6) / 2, headDepth / 4 - 0.2]);

    const geometryMouth = new THREE.RingGeometry( 0.2, 0.4, 32, 8, Math.PI, Math.PI);
    const mouth = new THREE.Mesh( geometryMouth, blackMaterial );
    head.add( mouth );
    placeObj(mouth, [0, -headHeight / 2 + 0.2, headDepth / 2 + 0.01]);

    const eyeGeometry = new THREE.BoxGeometry(eyeWidth, eyeHeight, eyeDepth);
    const eye1 = new THREE.Mesh(eyeGeometry, whiteMaterial);
    const eye2 = new THREE.Mesh(eyeGeometry, whiteMaterial);

    //eye1.rotateY(Math.PI / 2);
    //eye2.rotateY(-Math.PI / 2);
    placeObj(eye1, [headWidth / 2 + eyeWidth / 2, eyeHeight / 2, -(eyeDepth / 2 + 0.5)]);
    placeObj(eye2, [-(headWidth / 2 + eyeWidth / 2), eyeHeight / 2, -(eyeDepth / 2 + 0.5)]);
    head.add(eye1);
    head.add(eye2);

    const innerEyeGeometry = new THREE.BoxGeometry(innerEyeWidth, innerEyeHeight, innerEyeDepth);
    const innerEye1 = new THREE.Mesh(innerEyeGeometry, redMaterial);
    const innerEye2 = new THREE.Mesh(innerEyeGeometry, redMaterial);

    placeObj(innerEye1, [0, - (0.35), (0.36)]);
    placeObj(innerEye2, [0, - (0.35), (0.36)]);

    eye1.add(innerEye1);
    eye2.add(innerEye2);

    const guancia1 = new THREE.Mesh(eyeGeometry, yellowMaterial);
    const guancia2 = new THREE.Mesh(eyeGeometry, yellowMaterial);

    placeObj(guancia1, [headWidth / 2 + eyeWidth / 2, -eyeHeight / 2, (eyeDepth / 2 + 0.5)]);
    placeObj(guancia2, [-(headWidth / 2 + eyeWidth / 2), -eyeHeight / 2, (eyeDepth / 2 + 0.5)]);

    head.add(guancia1);
    head.add(guancia2);

    const noseGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
    const nose1 = new THREE.Mesh(noseGeometry, blackMaterial);
    const nose2 = new THREE.Mesh(noseGeometry, blackMaterial);

    placeObj(nose1, [0.4, headHeight / 2 - 0.8, headDepth / 2]);
    placeObj(nose2, [-0.4, headHeight / 2 - 0.8, headDepth / 2]);

    head.add(nose1);
    head.add(nose2);

    const triangle3 = new THREE.Mesh(geometryCone, yellowMaterial);
    const triangle4 = new THREE.Mesh(geometryCone, yellowMaterial);
    
    triangle3.scale.set(0.5, 0.5, 0.5);
    triangle4.scale.set(0.5, 0.5, 0.5);
    placeObj(triangle3, [-0.8, headHeight / 2 + coneHeight / 4, -1.8]);
    placeObj(triangle4, [0.8, headHeight / 2 + coneHeight / 4, -1.8]);
    head.add(triangle3);
    head.add(triangle4);

    const earGeometry = new THREE.BoxGeometry(earWidth, earHeight, earDepth);
    const ear1 = new THREE.Mesh(earGeometry, greenMaterial);
    const ear2 = new THREE.Mesh(earGeometry, greenMaterial);

    placeObj(ear1, [-(headWidth + earWidth) / 2, (headHeight + earHeight) / 2, -2]);
    placeObj(ear2, [(headWidth + earWidth) / 2, (headHeight + earHeight) / 2, -2]);

    ear1.rotateZ(Math.PI / 6);
    ear2.rotateZ(-Math.PI / 6);

    head.add(ear1);
    head.add(ear2);

    const mixers = [];
    const actions = { jump: [], slip: [] , walk: []};

    head.name = "head_drake";
    body.name = "body_drake";

    var ret = {
        obj: obj,
        head: head,
        body: body,
        leg1: leg1,
        leg2: leg2,
        leg3: leg3,
        leg4: leg4,
        wing1: wing1,
        wing2: wing2,
        tile: tile,
        tile2: tile2,
        tile3: tile3,
        cone: cone,
        mainScene: null,
        width: headWidth,
        height: (2.5 + legHeight) * 2,
        depth: headDepth + bodyDepth + 1,
        center: center,
        type: "Drake",
        mixers: mixers,
        playAnimation: function (anim, loop, restart = false) {
            if (
                actions[anim][0].time == 0 ||
                actions[anim][0].time > 0.6 ||
                restart == true
              ) {
                actions["slip"].forEach((action) => {
                    action.stop();   
                  });
                  actions["jump"].forEach((action) => {
                    action.stop();   
                });
                if (loop == true) {
                  actions[anim].forEach((action) => {
                    action.play().reset();
                  });
                } else {
                  actions[anim].forEach((action) => {
                    action.play().setLoop(THREE.LoopOnce, 0).reset();
                  });
                }
              }
            },
        checkIntersection: function (obstacle) {
            const box3Obs = new THREE.Box3();
            const box3Cat = new THREE.Box3();
            const box3CatBody = new THREE.Box3();

            for (var i = 0; i < obstacle.intersectionMesh.length; i++) {
              var obs = obstacle.obj;
              for (var j = 0; j < obstacle.intersectionMesh[i].length; j++) {
                obs = obs.children[obstacle.intersectionMesh[i][j]];
              }
              obs.geometry.computeBoundingBox();
              this.head.geometry.computeBoundingBox();
      
              const vector = new THREE.Vector3();
              this.head.getWorldPosition(vector);
              this.body.getWorldPosition(vector);
              box3Obs.copy( obs.geometry.boundingBox ).applyMatrix4( obs.matrixWorld );
              box3Cat.copy( this.head.geometry.boundingBox ).applyMatrix4( this.head.matrixWorld );
              box3CatBody.copy(this.body.geometry.boundingBox).applyMatrix4( this.body.matrixWorld );
              
              box3Cat.intersect(box3Obs);
              if (!box3Cat.isEmpty())
                return true;
                box3CatBody.intersect(box3Obs);
                if (!box3CatBody.isEmpty())
                  return true;
            }
            return false;
        },
        stopAnimation: function (anim) {
            actions[anim].forEach((action) => {
                action.stop();
              });
        },
        setShadow: function (bool) {
            this.head.castShadow = bool;
            this.body.castShadow = bool;
            this.leg1.castShadow = bool;
            this.leg2.castShadow = bool;
            this.leg3.castShadow = bool;
            this.leg4.castShadow = bool;
            this.wing1.castShadow = bool;
            this.wing2.castShadow = bool;
            this.tile.castShadow = bool;
            this.tile2.castShadow = bool;
            this.tile3.castShadow = bool;
            this.cone.castShadow = bool;
          }
    }

    newScale(ret, [2, 2, 2]);

    createDrakeSlipAnimation(ret, mixers, actions);
    createDrakeJumpAnimation(ret, mixers, actions);
    createAnimationWalking(ret, mixers, actions);
    createDrakeAnimationHead(ret, mixers, actions);
    createRotationTile(ret, mixers, actions);

    return ret;
}