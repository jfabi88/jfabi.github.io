
class Bar extends Element {
    intersectionMesh = [];
    constructor (obj, width, height, depth) {
        super(obj, width, height, depth)
        this.type = "Bar";
    };
}

const geometryBar = [];
const materialBar = [];

function createGeoMatBar() {
    const geometryTop = createGeometryCube([1, 0, 0, 0, 1, 0], 7, 2.0, 2.5);
    const materialTop = new THREE.MeshPhongMaterial({color: "rgb(40, 40, 40)"});

    geometryBar.push(geometryTop);
    materialBar.push(materialTop);
}

function createObjectBar() {
    const obj = new THREE.Object3D();

    const top = new THREE.Mesh(geometryBar[0], materialBar[0]);

    obj.add(top);
    obj.position.y = 2;

    const ret = new Bar(obj, 6, 1, 2.5)
    ret.intersectionMesh = [[0]];

    return ret;
}