
//addEventListener('DOMContentLoaded', (event) => {init();});

init();

function setInitScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(128 / 256, 113 / 256, 130 / 256);

    var aLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(aLight);
    var light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(1, 10, 8);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;

    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default

    scene.add(light);

    THREE.ShaderLib[ 'lambert' ].fragmentShader = THREE.ShaderLib[ 'lambert' ].fragmentShader.replace(

        `vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;`,
    
        `#ifndef CUSTOM
            vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
        #else
            vec3 outgoingLight = diffuseColor.rgb * ( 1.0 - 0.5 * ( 1.0 - getShadowMask() ) ); // shadow intensity hardwired to 0.5 here
        #endif`
    
    );

    const geometryPlane = new THREE.PlaneGeometry(100, 100);
    const materialPlane = new THREE.MeshLambertMaterial({color: 0x807182,})
    materialPlane.defines = materialPlane.defines || {};
    materialPlane.defines.CUSTOM = "";
    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotateX(-Math.PI / 2);
    plane.receiveShadow = true;
    plane.position.y = -9;

    scene.add(plane);

    return scene;
}

function setGameScene() {
    const scene = new THREE.Scene(); 
    scene.background = new THREE.Color("rgb(255, 255, 255)");

    const light = new THREE.DirectionalLight(0xffffff, 0.1); // soft white light
    light.position.set(150, 50, -100);
    light.target.position.set(0, 0, 0);
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

    return scene;
}

function setShadowCat(cat , bool) {
    cat.head.castShadow = bool;
    cat.ear1.castShadow = bool;
    cat.ear2.castShadow = bool;
    cat.nose.castShadow = bool;
    cat.body.castShadow = bool;
    cat.leg1.castShadow = bool;
    cat.leg2.castShadow = bool;
    cat.leg3.castShadow = bool;
    cat.leg4.castShadow = bool;
    cat.foot1.castShadow = bool;
    cat.foot2.castShadow = bool;
    cat.foot3.castShadow = bool;
    cat.foot4.castShadow = bool;
}

function changePosition(position, catdirection, speed, limit) {
    position.addScaledVector(catdirection, speed);
    if (position.x >= limit[0])
      position.x = limit[0];
    else if (position.x <= limit[1])
      position.x = limit[1];
}

function stop(mainScene) {
    const menu = document.getElementById("menu");
    menu.style.visibility = "visible";
    mainScene.pause = true;
    mainScene.died = true;
}

function runGame(mainScene, catdirection, memory, delta, score) {
    mainScene.tweenGA.forEach(group => {
      group.update();
    });
    if (mainScene.cat != null && mainScene.pause == false) {
      mainScene.mixers.forEach((mixer) => {
        mixer.update(delta);
      });
      changePosition(mainScene.cat.obj.position, catdirection, mainScene.catspeed * delta * (mainScene.ambientSpeed / 100.0), mainScene.limit);
      if (mainScene.catspeed > 0.0)
        mainScene.catspeed -= 5.0;
      else if (mainScene.catspeed < 0.0)
        mainScene.catspeed += 5.0;
      updateScene(mainScene, memory, delta);
      mainScene.room = checkIn(mainScene.cat, mainScene.elementsA, mainScene.wallsA);
      if (mainScene.room == null) {
        stop(mainScene);
      }
      if (mainScene.room && mainScene.room.type == "Room") {
        checkAnimation(mainScene.room.obstacles, mainScene.cat, mainScene.tweenGA);
      }
      if (mainScene.room && mainScene.room.type == "Room" && checkIntersection(mainScene.room.obstacles, mainScene.cat))
            stop(mainScene);
        mainScene.score += 0.1;
        score.textContent = Math.floor(mainScene.score);
    }
}

function init() {
    var renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true}
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  
    var camera1 = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera1.position.set(0, 0, 60);

    const camera2 = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        0.1, 
        300,
      );
    camera2.position.set(0, 40, 40);

    const scene1 = setInitScene();
    const scene2 = setGameScene();
    var scene = scene1;
    var camera = camera1;

    var memory = {
        obstacleA: [],
        decorationA: [],
        roomA: [],
    }
    
    var mainScene = {
        scene: scene2,
        cat: null,
        camera: camera,
        catspeed: 0,
        ambientSpeed: 100,
        pause: true,
        died: false,
        score: 0,
        room: null,
        spawn: 4,
        lastObj: [],
        decorationA: [],
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
        start: 0,
        mixers: [],
    };

    const loadManagerCat = new THREE.LoadingManager();
    const loaderCat = new THREE.TextureLoader(loadManagerCat);

    loadCatTexture(loaderCat);

    const loadManagerGame = new THREE.LoadingManager();
    const loaderGame = new THREE.TextureLoader(loadManagerGame);

    loadComputerTexture(loaderGame);
    loadTurnStileTexture(loaderGame);
    loadRoomTexture(loaderGame);

    var cat = null;
    loadManagerCat.onLoad = () => {
        cat = createCat();
        cat.obj.rotateY(-Math.PI / 12);
        setShadowCat(cat, true);
        scene1.add(cat.obj);

        mainScene.cat = cat;
        cat.mixers.forEach((mixer) => {
          mainScene.mixers.push(mixer);
        });

        mainScene.start += 1;
    }

    loadManagerGame.onLoad = () => {
        createAllObject(mainScene, memory.roomA, memory.obstacleA, memory.decorationA);
        createLimit(mainScene);
        createWay(mainScene, memory);
    }

    setControl(document, window, renderer, mainScene);

    document.getElementById("start").onclick = function () {
        if (mainScene.cat != null) {
            var elem = document.getElementById("page");
            elem.style.display = "none";
            
            elem = document.getElementById("score");
            elem.textContent = mainScene.score;
            elem.style.visibility = "visible";

            cat.obj.rotateY(Math.PI / 12);
            cat.obj.rotation.y += 180 * THREE.MathUtils.DEG2RAD;
            cat.obj.position.y += cat.height / 2;
            cat.obj.position.z -= 10;
            setShadowCat(cat, false);
            scene1.remove(cat);
            scene2.add(cat.obj);

            camera = camera2;
            scene = scene2;

            mainScene.start += 1;

            elem = document.getElementById("pressStart");
            elem.style.visibility = "visible";
            console.log("Tasto start premuto!");
        }
    };

    var score = document.getElementById("score");

    document.getElementById("restart").onclick = function () {
        const menu = document.getElementById("menu");
        menu.style.visibility = "hidden";
        reset(mainScene, memory);
        score.textContent = 0;
        createWay(mainScene, memory);
    }

    var clock = new THREE.Clock();
    var delta = 0;
    var catdirection = new THREE.Vector3(1, 0, 0);

    function render() {
        if (scene == scene2) {
            delta = clock.getDelta(); //deve stare fuori dalla pausa
            runGame(mainScene, catdirection, memory, delta, score);
            //console.log(renderer.info.render.calls);
            //renderer.info.autoReset = false;
            //renderer.info.reset();
        }
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}