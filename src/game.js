import * as THREE from './three';
import {loadCatTexture, createCat, setRayCaster} from "./element/cat/cat.js";
import {loadRoomTexture} from "./element/room/room.js";
import {loadTurnStileTexture} from "./element/obstacles/turnstile.js";
import {createAllObject, createWay} from './flow/creation.js';
import {updateScene} from './flow/update.js';
import {checkIn, checkAnimation, checkIntersection} from './flow/check.js';
import {setControl} from './flow/controlGame.js';


function changePosition(position, catdirection, speed, limit) {
  position.addScaledVector(catdirection, speed);
  if (position.x >= limit[0])
    position.x = limit[0];
  else if (position.x <= limit[1])
    position.x = limit[1];
  //if (position.y >= limit[2])
  //  position.y = limit[2];
  //else if (position.y <= limit[3])
  //  position.y = limit[3];
  //if (position.z >= limit[4])
  //  position.z = limit[4];
  //if (position.z <= limit[5])
  //  position.z = limit[5];
}

export function main(cat, renderer) {
  var stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );

  const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1, 
    500,
  );

  camera.position.set(0, 40, 40);

  const scene = new THREE.Scene(); 
  scene.background = new THREE.Color("rgb(255, 255, 255)");

  var memory = {
    obstacleA: [],
    decorationA: [],
    roomA: [],
  }

  var mainScene = {
    scene: scene,
    cat: null,
    camera: camera,
    catspeed: 0,
    ambientSpeed: 100,
    pause: true,
    room: null,
    lastObj: [],
    elementsA: [],
    wallsA: [],
    obstaclesA: [],
    tweenGA: [],
    limit: [20, -20, 100, -100, 100, -100],
    distance: 0,
    limitDistance: 6,
    widthRoom: 80,
    heightRoom: 80,
    depthRoom: 120,
    mixers: [],
  };

  const rayCaster = new THREE.Raycaster();

  const light = new THREE.DirectionalLight(0xffffff, 0.1); // soft white light
  light.position.set(150, 50, -100);
  light.target.position.set(0, 0, 0);
  //light.castShadow = true;
  scene.add(light);
  scene.add(light.target);
  const light2 = new THREE.DirectionalLight(0xffffff, 0.1); // soft white light
  light.position.set(-150, 50, -100);
  light.target.position.set(0, 0, 0);
  light.target.position.set(0, 0, 0);
  scene.add(light2);
  scene.add(light2.target);

  var lightAmbient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(lightAmbient);

  var clock = new THREE.Clock();

  const loadManager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(loadManager);

  //loadCatTexture(loader);
  loadRoomTexture(loader);
  loadTurnStileTexture(loader);
  //loadComputerTexture(loader);

  loadManager.onLoad = () => {
    //var cat = createCat();
    cat.obj.rotation.y += 180 * THREE.MathUtils.DEG2RAD;
    cat.obj.position.y += cat.height / 2;
    cat.obj.position.z -= 10;
    scene.add(cat.obj);
    mainScene.cat = cat;
    cat.mixers.forEach((mixer) => {
      mainScene.mixers.push(mixer);
    });
    setRayCaster(cat, rayCaster);
    createAllObject(mainScene, memory.roomA, memory.obstacleA, memory.decorationA);
    createWay(mainScene, memory);
  };

  setControl(document, window, renderer, mainScene);

  var delta = 0;
  var catdirection = new THREE.Vector3(1, 0, 0);
  //var pause = false;

  // loop that runs every frame to render scene and camera
  function update() {
    //console.log("Number of Triangles :", renderer.info.render.triangles);
    stats.begin();
    delta = clock.getDelta(); //deve stare fuori dalla pausa
    mainScene.tweenGA.forEach(group => {
      group.update();
    });
    if (mainScene.cat != null && mainScene.pause == false) {
      mainScene.mixers.forEach((mixer) => {
        mixer.update(delta);
      });
      changePosition(mainScene.cat.obj.position, catdirection, mainScene.catspeed * delta, mainScene.limit);
      if (mainScene.catspeed > 0.0)
        mainScene.catspeed -= 5.0;
      else if (mainScene.catspeed < 0.0)
        mainScene.catspeed += 5.0;
      updateScene(mainScene, memory, delta);
      mainScene.room = checkIn(mainScene.cat, mainScene.elementsA, mainScene.wallsA);
      if (mainScene.room == null) {
        mainScene.pause = true;
        console.log(mainScene.wallsA);
        mainScene.wallsA.forEach(elem => {
          console.log(elem.obj.position.z);
        })
        console.log("non siamo in una stanza");
      }
      if (mainScene.room) {
        checkAnimation(mainScene.room.obstacles, mainScene.cat, mainScene.tweenGA);
      }
      if (mainScene.room && checkIntersection(mainScene.room.obstacles, mainScene.cat, rayCaster))
        mainScene.pause = true;
    }
    stats.end();
    console.log(renderer.info.render.calls);
    renderer.info.autoReset = false;
    renderer.info.reset();
    requestAnimationFrame(update);
    renderer.render(scene, camera);
  }
  update();
}
