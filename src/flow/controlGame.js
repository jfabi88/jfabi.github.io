

function rotationCamera(mainScene, angle) {
    console.log("Siamo dentro rotationCamera");
    mainScene.pause = true;
    mainScene.room.enabled = false;
    const group = new TWEEN.Group();
    createAnimationTransitionRoomTween(mainScene.wallsA, mainScene.cat ,group, angle);
    createAnimationTransitionRoomTween(mainScene.elementsA, mainScene.cat , group, angle);
    createAnimationTransitionRoomTween(mainScene.obstaclesA,  mainScene.cat , group, angle);
    //createAnimationTransitionRoomTween([mainScene.cat], mainScene.room , group, angle);
    mainScene.room = null;
    const tween = new TWEEN.Tween(mainScene, group).onComplete(function () {
        var diff;
        mainScene.wallsA.forEach(element => {
            element.obj.position.x = 0;
        });
        mainScene.elementsA.forEach(element => {
            diff = element.obj.position.x;
            element.obj.position.x = 0;
        });
        mainScene.obstaclesA.forEach(element => {
            element.obj.position.x = 0;
        });
        mainScene.pause = false;
        for (var i = 0; i < mainScene.tweenGA.length; i++) {
            if (mainScene.tweenGA[i] == group)
                mainScene.tweenGA.splice(i, 1);
        }
        if ((diff < 0 && mainScene.cat.obj.position.x < 0) ||(diff > 0 && mainScene.cat.obj.position.x > 0))
            mainScene.cat.obj.position.x -= diff;
        group.removeAll();
    });
    tween.to({pause: true}, 110).start();
    mainScene.tweenGA.push(group);
}

function onWindowResize(camera, window, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onKeyPress(key, mainScene) {
    if (mainScene.start != 2)
        return ; 
    if (key == "a" && mainScene.cat != null) {
        mainScene.catspeed = -50;
      }
    else if (key == "d" && mainScene.cat != null) {
        mainScene.catspeed = 50;
    }
    else if (key == "o") {
        if (mainScene.room && mainScene.room.enabled && mainScene.room.canRotate(mainScene.cat)) {
            rotationCamera(mainScene, -Math.PI / 2);
        }
    }
    else if (key == "p") {
        if (mainScene.room && mainScene.room.enabled && mainScene.room.canRotate(mainScene.cat)) {
            rotationCamera(mainScene, Math.PI / 2);
        }
    }
    else if (key == "m") {
        if (mainScene.pause == true && mainScene.died == false) {
            const elem = document.getElementById("pressStart");
            elem.style.visibility = "hidden";
            mainScene.pause = false;
        }
        else if (mainScene.died == false) {
            const elem = document.getElementById("pressStart");
            elem.style.visibility = "visible";
            mainScene.pause = true;
        }
    }
    else if (key == "w" && mainScene.cat != null) {
        mainScene.cat.playAnimation("jump", false);
    }
    else if (key == "s" && mainScene.cat != null) {
        mainScene.cat.playAnimation("slip", false);
    }
}


function setControl(document, window, renderer, mainScene, memory)
{
    document.addEventListener('keypress', (e) => {
        onKeyPress(e.key, mainScene);
    }, false);
    window.addEventListener( "resize", function() { onWindowResize(mainScene.camera, window, renderer)}, false );

    window.addEventListener('click', (event) => {
        if (mainScene.start == 1 && mainScene.targetAnimal == 1 && mainScene.cat.type == "Drake") {
            mainScene.scene1.children[0].rotation.y = 0;
            mainScene.scene1.children[0].children[1].rotateY(-Math.PI / 2);
            mainScene.scene1.children[0].children[0].rotateY(-Math.PI / 2);
            mainScene.cat = cat;
            //scene.targetAnimal = 1;
        }
        else if (mainScene.start == 1 && mainScene.targetAnimal == 2 && mainScene.cat.type == "Cat") {
            mainScene.scene1.children[0].rotation.y = -Math.PI / 2;
            mainScene.scene1.children[0].children[1].rotateY(Math.PI / 2);
            mainScene.scene1.children[0].children[0].rotateY(Math.PI / 2);
            mainScene.cat = drake;
            //scene.targetAnimal = 2;
        }
    });

    document.getElementById("restart").onclick = function () {
            const menu = document.getElementById("menu");
            menu.style.visibility = "hidden";
            const button = document.getElementById("restart");
            button.style.visibility = "hidden";
            reset(mainScene, memory);
            score.textContent = 0;
            createWay(mainScene, memory);
            mainScene.cat.playAnimation("walk", true);
            mainScene.cat.playAnimation("tile", true);
            console.log("Tasto restart premuto!");
    };

    document.getElementById("start").onclick = function () {
        if (mainScene.cat != null) {
            var elem = document.getElementById("page");
            elem.style.display = "none";
            
            elem = document.getElementById("score");
            elem.textContent = mainScene.score;
            elem.style.visibility = "visible";

            scene1.children[0].remove(mainScene.cat.obj);
            mainScene.cat.obj.rotateY(Math.PI / 12);
            mainScene.cat.obj.position.x = 0;
            mainScene.cat.obj.rotation.y = 180 * THREE.MathUtils.DEG2RAD;
            mainScene.cat.obj.position.y = mainScene.cat.height / 2;
            mainScene.cat.obj.position.z = -10;
            mainScene.cat.playAnimation("walk", true);
            //mainScene.cat.playAnimation("shake", true);
            mainScene.cat.setShadow(false);
            scene2.add(mainScene.cat.obj);

            createWay(mainScene, memory);

            camera = camera2;
            scene = scene2;

            drake.stopAnimation("shake");
            mainScene.scene = scene2;
            mainScene.start += 1;

            elem = document.getElementById("pressStart");
            elem.style.visibility = "visible";

            elem = document.getElementById("back");
            elem.style.visibility = "visible";

            console.log("Tasto start premuto!");
        }
    };

    document.getElementById("back").onclick = function () {
        reset(mainScene, memory);

        var elem = document.getElementById("pressStart");
        elem.style.visibility = "hidden";
        elem = document.getElementById("back");
        elem.style.visibility = "hidden";
        elem = document.getElementById("score");
        elem.style.visibility = "hidden";
        elem = document.getElementById("page");
        elem.style.display = "block";
        elem = document.getElementById("menu");
        menu.style.visibility = "hidden";

        drake.playAnimation("shake", true);
        scene2.remove(mainScene.cat.obj);
        scene1.children[0].rotation.y = 0;
        scene1.children[0].add(mainScene.cat.obj);

        cat.obj.position.y = cat.height / 2;
        cat.obj.position.z = 60;
        cat.obj.rotation.y = 0;
        cat.obj.rotateY(-Math.PI / 12);

        drake.obj.position.x = 50;
        drake.obj.position.y = drake.height / 2 - 0;
        drake.obj.position.z = 0;
        drake.obj.rotation.y = 0;
        drake.obj.rotateY(-Math.PI / 12);

        mainScene.cat.setShadow(true);
        mainScene.start -= 1;

        mainScene.cat = cat;

        camera = camera1;
        scene = scene1;
    }
}