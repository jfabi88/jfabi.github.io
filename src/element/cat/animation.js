
 function createJumpAnimation(cat, mixers, actions) {
    const times = [0, 0.2, 0.8, 1.0];
    const values = [cat.center.position.x, cat.center.position.y, cat.center.position.z, cat.center.position.x, cat.center.position.y + 15, cat.center.position.z, cat.center.position.x, cat.center.position.y + 15, cat.center.position.z, cat.center.position.x, cat.center.position.y, cat.center.position.z];
    const rP1 = rotateOnPoint(cat.leg1, new THREE.Vector3(3.01, -2.25, 5.26), new THREE.Vector3(1, 0, 0), -90 * THREE.MathUtils.DEG2RAD);
    const rP2 = rotateOnPoint(cat.leg2, new THREE.Vector3(-3.01, -2.25, 5.26), new THREE.Vector3(1, 0, 0), -90 * THREE.MathUtils.DEG2RAD);
    const rP3 = rotateOnPoint(cat.leg3, new THREE.Vector3(3.01, -2.25, -5.26), new THREE.Vector3(1, 0, 0), 90 * THREE.MathUtils.DEG2RAD);
    const rP4 = rotateOnPoint(cat.leg4, new THREE.Vector3(-3.01, -2.25, -5.26), new THREE.Vector3(1, 0, 0), 90 * THREE.MathUtils.DEG2RAD);

    const valueJP1 = [cat.leg1.position.x, cat.leg1.position.y, cat.leg1.position.z, rP1[0].x, rP1[0].y, rP1[0].z, rP1[0].x, rP1[0].y, rP1[0].z, cat.leg1.position.x, cat.leg1.position.y, cat.leg1.position.z];
    const valueJR1 = [cat.leg1.quaternion.x, cat.leg1.quaternion.y, cat.leg1.quaternion.z, cat.leg1.quaternion.w, rP1[1].x, rP1[1].y, rP1[1].z, rP1[1].w, rP1[1].x, rP1[1].y, rP1[1].z, rP1[1].w, cat.leg1.quaternion.x, cat.leg1.quaternion.y, cat.leg1.quaternion.z, cat.leg1.quaternion.w];

    const valueJP2 = [cat.leg2.position.x, cat.leg2.position.y, cat.leg2.position.z, rP2[0].x, rP2[0].y, rP2[0].z, rP2[0].x, rP2[0].y, rP2[0].z, cat.leg2.position.x, cat.leg2.position.y, cat.leg2.position.z];
    const valueJR2 = [cat.leg2.quaternion.x, cat.leg2.quaternion.y, cat.leg2.quaternion.z, cat.leg2.quaternion.w, rP2[1].x, rP2[1].y, rP2[1].z, rP2[1].w, rP2[1].x, rP2[1].y, rP2[1].z, rP2[1].w, cat.leg2.quaternion.x, cat.leg2.quaternion.y, cat.leg2.quaternion.z, cat.leg2.quaternion.w];

    const valueJP3 = [cat.leg3.position.x, cat.leg3.position.y, cat.leg3.position.z, rP3[0].x, rP3[0].y, rP3[0].z, rP3[0].x, rP3[0].y, rP3[0].z, cat.leg3.position.x, cat.leg3.position.y, cat.leg3.position.z];
    const valueJR3 = [cat.leg3.quaternion.x, cat.leg3.quaternion.y, cat.leg3.quaternion.z, cat.leg3.quaternion.w, rP3[1].x, rP3[1].y, rP3[1].z, rP3[1].w, rP3[1].x, rP3[1].y, rP3[1].z, rP3[1].w,cat.leg3.quaternion.x, cat.leg3.quaternion.y, cat.leg3.quaternion.z, cat.leg3.quaternion.w];

    const valueJP4 = [cat.leg4.position.x, cat.leg4.position.y, cat.leg4.position.z, rP4[0].x, rP4[0].y, rP4[0].z, rP4[0].x, rP4[0].y, rP4[0].z, cat.leg4.position.x, cat.leg4.position.y, cat.leg4.position.z];
    const valueJR4 = [cat.leg4.quaternion.x, cat.leg4.quaternion.y, cat.leg4.quaternion.z, cat.leg4.quaternion.w, rP4[1].x, rP4[1].y, rP4[1].z, rP4[1].w, rP4[1].x, rP4[1].y, rP4[1].z, rP4[1].w, cat.leg4.quaternion.x, cat.leg4.quaternion.y, cat.leg4.quaternion.z, cat.leg4.quaternion.w];

    const positionKf = new THREE.VectorKeyframeTrack(".position", times, values);
    const positionLeg1 = new THREE.VectorKeyframeTrack(".position", times, valueJP1);
    const rotationLeg1 = new THREE.QuaternionKeyframeTrack(".quaternion", times, valueJR1);
    const positionLeg2 = new THREE.VectorKeyframeTrack(".position", times, valueJP2);
    const rotationLeg2 = new THREE.QuaternionKeyframeTrack(".quaternion", times, valueJR2);
    const positionLeg3 = new THREE.VectorKeyframeTrack(".position", times, valueJP3);
    const rotationLeg3 = new THREE.QuaternionKeyframeTrack(".quaternion", times, valueJR3);
    const positionLeg4 = new THREE.VectorKeyframeTrack(".position", times, valueJP4);
    const rotationLeg4 = new THREE.QuaternionKeyframeTrack(".quaternion", times, valueJR4);

    const tracks = [positionKf];
    const tracksL1 = [positionLeg1, rotationLeg1];
    const tracksL2 = [positionLeg2, rotationLeg2];
    const tracksL3 = [positionLeg3, rotationLeg3];
    const tracksL4 = [positionLeg4, rotationLeg4];
    const length = -1;

    const clipJumpC = new THREE.AnimationClip("jumpC", length, tracks); 
    const clipJumpL1 = new THREE.AnimationClip("jumpLeg", length, tracksL1);
    const clipJumpL2 = new THREE.AnimationClip("jumpLeg", length, tracksL2);
    const clipJumpL3 = new THREE.AnimationClip("jumpLeg", length, tracksL3);
    const clipJumpL4 = new THREE.AnimationClip("jumpLeg", length, tracksL4);
    const mixerC = new THREE.AnimationMixer(cat.center);
    const mixerL1 = new THREE.AnimationMixer(cat.leg1);
    const mixerL2 = new THREE.AnimationMixer(cat.leg2);
    const mixerL3 = new THREE.AnimationMixer(cat.leg3);
    const mixerL4 = new THREE.AnimationMixer(cat.leg4);
    const actionC = mixerC.clipAction(clipJumpC);
    const actionL1 = mixerL1.clipAction(clipJumpL1);
    const actionL2 = mixerL2.clipAction(clipJumpL2);
    const actionL3 = mixerL3.clipAction(clipJumpL3);
    const actionL4 = mixerL4.clipAction(clipJumpL4);

    mixers.push(mixerC);
    mixers.push(mixerL1);
    mixers.push(mixerL2);
    mixers.push(mixerL3);
    mixers.push(mixerL4);
    var toPush = [];
    toPush.push(actionC);
    toPush.push(actionL1);
    toPush.push(actionL2);
    toPush.push(actionL3);
    toPush.push(actionL4);
    actions["jump"] = toPush;
}

 function createSlipAnimation(cat, mixers, actions) {
    const times = [0, 0.5, 1.0];
    const values = [cat.center.position.x, cat.center.position.y, cat.center.position.z, cat.center.position.x, cat.center.position.y - 4.2, cat.center.position.z, cat.center.position.x, cat.center.position.y, cat.center.position.z];

    const leg1Turned = cat.leg1.clone();//.rotateOnAxis(new THREE.Vector3(0, 1, 0), 90 * THREE.MathUtils.DEG2RAD);
    const leg2Turned = cat.leg2.clone();//.rotateOnAxis(new THREE.Vector3(0, 1, 0), -90 * THREE.MathUtils.DEG2RAD);
    const leg3Turned = cat.leg3.clone();//rotateOnAxis(new THREE.Vector3(0, 1, 0), 90 * THREE.MathUtils.DEG2RAD);
    const leg4Turned = cat.leg4.clone();//.rotateOnAxis(new THREE.Vector3(0, 1, 0), -90 * THREE.MathUtils.DEG2RAD);

    const rP1 = rotateOnPoint(leg1Turned, new THREE.Vector3(3.01, -2.25, 5.26), new THREE.Vector3(0, 0, 1), 90 * THREE.MathUtils.DEG2RAD);
    const rP2 = rotateOnPoint(leg2Turned, new THREE.Vector3(-3.01, -2.25, 5.26), new THREE.Vector3(0, 0, 1), -90 * THREE.MathUtils.DEG2RAD);
    const rP3 = rotateOnPoint(leg3Turned, new THREE.Vector3(3.01, -2.25, -5.26), new THREE.Vector3(0, 0, 1), 90 * THREE.MathUtils.DEG2RAD);
    const rP4 = rotateOnPoint(leg4Turned, new THREE.Vector3(-3.01, -2.25, -5.26), new THREE.Vector3(0, 0, 1), -90 * THREE.MathUtils.DEG2RAD);

    const valueJP1 = [leg1Turned.position.x, leg1Turned.position.y, leg1Turned.position.z, rP1[0].x, rP1[0].y, rP1[0].z, leg1Turned.position.x, leg1Turned.position.y, leg1Turned.position.z];
    const valueJR1 = [leg1Turned.quaternion.x, leg1Turned.quaternion.y, leg1Turned.quaternion.z, leg1Turned.quaternion.w, rP1[1].x, rP1[1].y, rP1[1].z, rP1[1].w, leg1Turned.quaternion.x, leg1Turned.quaternion.y, leg1Turned.quaternion.z, cat.leg1.quaternion.w];

    //const valueJP1 = [leg1Turned.position.x, leg1Turned.position.y, leg1Turned.position.z, leg1Turned.position.x, leg1Turned.position.y, leg1Turned.position.z, leg1Turned.position.x, leg1Turned.position.y, leg1Turned.position.z];
    //const valueJR1 = [leg1Turned.quaternion.x, leg1Turned.quaternion.y, leg1Turned.quaternion.z, leg1Turned.quaternion.w, leg1Turned.quaternion.x, leg1Turned.quaternion.y, leg1Turned.quaternion.z, leg1Turned.quaternion.w, leg1Turned.quaternion.x, leg1Turned.quaternion.y, leg1Turned.quaternion.z, cat.leg1.quaternion.w];

    const valueJP2 = [leg2Turned.position.x, leg2Turned.position.y, leg2Turned.position.z, rP2[0].x, rP2[0].y, rP2[0].z, leg2Turned.position.x, leg2Turned.position.y, leg2Turned.position.z];
    const valueJR2 = [leg2Turned.quaternion.x, leg2Turned.quaternion.y, leg2Turned.quaternion.z, leg2Turned.quaternion.w, rP2[1].x, rP2[1].y, rP2[1].z, rP2[1].w, leg2Turned.quaternion.x, leg2Turned.quaternion.y, leg2Turned.quaternion.z, leg2Turned.quaternion.w];

    const valueJP3 = [leg3Turned.position.x, leg3Turned.position.y, leg3Turned.position.z, rP3[0].x, rP3[0].y, rP3[0].z, leg3Turned.position.x, leg3Turned.position.y, leg3Turned.position.z];
    const valueJR3 = [leg3Turned.quaternion.x, leg3Turned.quaternion.y, leg3Turned.quaternion.z, leg3Turned.quaternion.w, rP3[1].x, rP3[1].y, rP3[1].z, rP3[1].w, leg3Turned.quaternion.x, leg3Turned.quaternion.y, leg3Turned.quaternion.z, cat.leg3.quaternion.w];

    const valueJP4 = [leg4Turned.position.x, leg4Turned.position.y, leg4Turned.position.z, rP4[0].x, rP4[0].y, rP4[0].z, leg4Turned.position.x, leg4Turned.position.y, leg4Turned.position.z];
    const valueJR4 = [leg4Turned.quaternion.x, leg4Turned.quaternion.y, leg4Turned.quaternion.z, leg4Turned.quaternion.w, rP4[1].x, rP4[1].y, rP4[1].z, rP4[1].w, leg4Turned.quaternion.x, leg4Turned.quaternion.y, leg4Turned.quaternion.z, cat.leg4.quaternion.w];

    const positionKf = new THREE.VectorKeyframeTrack(".position", times, values);
    const positionLeg1 = new THREE.VectorKeyframeTrack(".position", times, valueJP1);
    const rotationLeg1 = new THREE.QuaternionKeyframeTrack(".quaternion", times, valueJR1);
    const positionLeg2 = new THREE.VectorKeyframeTrack(".position", times, valueJP2);
    const rotationLeg2 = new THREE.QuaternionKeyframeTrack(".quaternion", times, valueJR2);
    const positionLeg3 = new THREE.VectorKeyframeTrack(".position", times, valueJP3);
    const rotationLeg3 = new THREE.QuaternionKeyframeTrack(".quaternion", times, valueJR3);
    const positionLeg4 = new THREE.VectorKeyframeTrack(".position", times, valueJP4);
    const rotationLeg4 = new THREE.QuaternionKeyframeTrack(".quaternion", times, valueJR4);

    const tracks = [positionKf];
    const tracksL1 = [positionLeg1, rotationLeg1];
    const tracksL2 = [positionLeg2, rotationLeg2];
    const tracksL3 = [positionLeg3, rotationLeg3];
    const tracksL4 = [positionLeg4, rotationLeg4];
    const length = -1;

    const clipSlipC = new THREE.AnimationClip("slipC", length, tracks); 
    const clipSlipL1 = new THREE.AnimationClip("slipLeg", length, tracksL1);
    const clipSlipL2 = new THREE.AnimationClip("slipLeg", length, tracksL2);
    const clipSlipL3 = new THREE.AnimationClip("slipLeg", length, tracksL3);
    const clipSlipL4 = new THREE.AnimationClip("slipLeg", length, tracksL4);
    const mixerC = new THREE.AnimationMixer(cat.center);
    const mixerL1 = new THREE.AnimationMixer(cat.leg1);
    const mixerL2 = new THREE.AnimationMixer(cat.leg2);
    const mixerL3 = new THREE.AnimationMixer(cat.leg3);
    const mixerL4 = new THREE.AnimationMixer(cat.leg4);
    const actionC = mixerC.clipAction(clipSlipC);
    const actionL1 = mixerL1.clipAction(clipSlipL1);
    const actionL2 = mixerL2.clipAction(clipSlipL2);
    const actionL3 = mixerL3.clipAction(clipSlipL3);
    const actionL4 = mixerL4.clipAction(clipSlipL4);

    mixers.push(mixerC);
    mixers.push(mixerL1);
    mixers.push(mixerL2);
    mixers.push(mixerL3);
    mixers.push(mixerL4);
    var toPush = [];
    toPush.push(actionC);
    toPush.push(actionL1);
    toPush.push(actionL2);
    toPush.push(actionL3);
    toPush.push(actionL4);
    actions["slip"] = toPush;
}