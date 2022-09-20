var gui = new dat.GUI();
var parameters = {
  a: 0, // camera rot x
  b: 0, // camera rot y
  c: 0, // camera rot z
  d: camera.position.x, // pos x
  e: camera.position.y, // pos y
  f: camera.position.z, // pos z
};
var cameraGuiX = gui
  .add(parameters, "a")
  .min(0)
  .max(359)
  .step(1)
  .name("Camera rot x")
  .listen();
var cameraGuiY = gui
  .add(parameters, "b")
  .min(0)
  .max(359)
  .step(1)
  .name("Camera rot y")
  .listen();
var cameraGuiZ = gui
  .add(parameters, "c")
  .min(0)
  .max(359)
  .step(1)
  .name("Camera rot z")
  .listen();
var cameraPosX = gui.add(parameters, "d").name("Camera pos x").listen();
var cameraPosY = gui.add(parameters, "e").name("Camera pos y").listen();
var cameraPosZ = gui.add(parameters, "f").name("Camera pos z").listen();

cameraGuiX.onChange(function (value) {
  camera.rotation.x = value * THREE.MathUtils.DEG2RAD;
});
cameraGuiY.onChange(function (value) {
  camera.rotation.y = value * THREE.MathUtils.DEG2RAD;
});
cameraGuiZ.onChange(function (value) {
  camera.rotation.z = value * THREE.MathUtils.DEG2RAD;
});
cameraPosX.onChange(function (value) {
  camera.position.x = value;
});
cameraPosY.onChange(function (value) {
  camera.position.y = value;
});
cameraPosZ.onChange(function (value) {
  camera.position.z = value;
});
gui.open();
