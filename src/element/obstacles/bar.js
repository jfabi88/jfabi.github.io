
class Bar extends Element {
    intersectionMesh = [];
    constructor (obj, width, height, depth) {
        super(obj, width, height, depth)
        this.type = "Bar";
    };
}

function createBar() {
    const obj = new THREE.Object3D();


    const geometryTop = createGeometryCube([1, 0, 0, 0, 1, 0], 7, 2.0, 2.5);
    const materialTop = new THREE.MeshPhongMaterial({color: "rgb(40, 40, 40)"});
    const top = new THREE.Mesh(geometryTop, materialTop);

    obj.add(top);

    const ret = new Bar(obj, 6, 1, 2.5)
    ret.intersectionMesh = [[0]];

    return ret;
}