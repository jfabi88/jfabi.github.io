
var geometry = [];
var material = [];

var widthWindow = 25;
var heightWindow = 50;
var depthWindow = 2;
var shiftWindow = 1.5;

 function createWall(material, width, height) {
  const geometryWall = new THREE.PlaneGeometry(width, height);
  const materialWall = material;
  const wall = new THREE.Mesh(geometryWall, materialWall);
  return wall;
}

function createGeometryWallHoles() {
    const wallShape = new THREE.Shape()
    .moveTo(-60, -40)
    .lineTo(60, -40)
    .lineTo(60, 40)
    .lineTo(-60, 40)

    const holeWindow1 = new THREE.Path()
    .moveTo(32.5, -20)
    .lineTo(32.5, 30)
    .lineTo(57.5, 30)
    .lineTo(57.5, -20)

    const holeWindow2 = new THREE.Path()
    .moveTo(2.5, -20)
    .lineTo(2.5, 30)
    .lineTo(27.5, 30)
    .lineTo(27.5, -20)

    const holeWindow3 = new THREE.Path()
    .moveTo(-27.5, -20)
    .lineTo(-27.5, 30)
    .lineTo(-2.5, 30)
    .lineTo(-2.5, -20)

    const holeWindow4 = new THREE.Path()
    .moveTo(-57.5, -20)
    .lineTo(-57.5, 30)
    .lineTo(-32.5, 30)
    .lineTo(-32.5, -20)

    wallShape.holes.push(holeWindow1);
    wallShape.holes.push(holeWindow2);
    wallShape.holes.push(holeWindow3);
    wallShape.holes.push(holeWindow4);

    const geometryWall = new THREE.ShapeGeometry(wallShape);
    return geometryWall;
}

 function createObjectWallWindows(size = 1) {

    const instanced = createObjWindowInstance(4 * size);
  
    const matrix = new THREE.Matrix4();
    const matrix2 = new THREE.Matrix4();
    const vector = new THREE.Vector3();
  
    for (var i = 0; i < size; i++) {
      matrix.setPosition(45, 5, 1);
      instanced[0].setMatrixAt(0 + (i * 4), matrix);
      matrix.setPosition(15, 5, 1);
      instanced[0].setMatrixAt(1 + (i * 4), matrix);
      matrix.setPosition(-15, 5, 1);
      instanced[0].setMatrixAt(2 + (i * 4), matrix);
      matrix.setPosition(-45, 5, 1);
      instanced[0].setMatrixAt(3 + (i * 4), matrix);
  
      instanced[1].getMatrixAt(0, matrix2);
      vector.setFromMatrixPosition(matrix2);
    
      matrix.setPosition(45, 5, 1 + vector.z);
      instanced[1].setMatrixAt(0 + (i * 4), matrix);
      matrix.setPosition(15, 5, 1 + vector.z);
      instanced[1].setMatrixAt(1 + (i * 4), matrix);
      matrix.setPosition(-15, 5, 1 + vector.z);
      instanced[1].setMatrixAt(2 + (i * 4), matrix);
      matrix.setPosition(-45, 5, 1 + vector.z);
      instanced[1].setMatrixAt(3 + (i * 4), matrix);
    }

    instanced[0].instanceMatrix.needsUpdate = true; 
    instanced[1].instanceMatrix.needsUpdate = true;

    if (size == 1) {
      const ret = new THREE.Object3D();
      const meshWall = new THREE.Mesh(geometry[0], material[0]);

      meshWall.add(instanced[0]);
      meshWall.add(instanced[1]);
      ret.add(meshWall);

      return ret;
    }

    const instancedWall = new THREE.InstancedMesh(geometry[0], material[0], size);
    instanced.push(instancedWall);
    return instanced;
    //ret.add(instanced[0]);
  
}

 function createGeoMatWallWindows(w = widthWindow, h = heightWindow, d = depthWindow, s = shiftWindow) {
    const geometryWall = createGeometryWallHoles();
    geometry.push(geometryWall);

    const materialWall = new THREE.MeshPhongMaterial({
      color: 'white',
      side: THREE.DoubleSide,
    });
    material.push(materialWall);

    createGeoMatWindow(w, h, d, s);
}
