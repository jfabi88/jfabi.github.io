function onWindowResize(camera, window, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onKeyPress(key, scene) {
    if (key == ' ' && scene.cat != null) {
        scene.cat.playAnimation("jump", false, false);
    }
}

function setControl(document, window, renderer, scene)
{
    document.getElementById("x").onclick = function () {scene.deltaX += 10;};
    document.getElementById("y").onclick = function () {scene.deltaY += 10;};
    document.getElementById("z").onclick = function () {scene.deltaZ += 10;};
    document.getElementById("jump").onclick = function () {scene.cat.playAnimation("jump", false)};
    document.getElementById("slip").onclick = function () {scene.cat.playAnimation("slip", false)};
    document.addEventListener('keypress', (e) => {
        onKeyPress(e.key, scene);
    }, false);
    window.addEventListener( "resize", onWindowResize(scene.camera, window, renderer), false );
}