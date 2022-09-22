
var turnstileTexture = [];

class Turnstile extends Element {
    rotation1 = null;
    rotation2 = null;
    enabled = false;
    intersectionMesh = [];
    constructor (obj, width, height, depth, r1, r2) {
        super(obj, width, height, depth);
        this.rotation1 = r1;
        this.rotation2 = r2;
        this.type = "Turnstile";
    };
    activateAnimation(mainGroup) {
        if (this.enabled) {
            const group = new TWEEN.Group();
            var tween;

            tween = new TWEEN.Tween(this.rotation1.rotation, group);
            tween.to({y: -Math.PI / 2}, 100).start();
            tween = new TWEEN.Tween(this.rotation2.rotation, group);
            tween.to({y: -Math.PI / 2}, 100).start();
        
            mainGroup.push(group);
        }
    }
    checkToAnimate(cat) {
        if (this.enabled) {
            const pT = new THREE.Vector3();
            const pCC = new THREE.Vector3();
    
            this.obj.getWorldPosition(pT);
            cat.center.getWorldPosition(pCC);
    
            if (pCC.z - (cat.depth / 2) <= pT.z + 50) {
                return true;
            }
        }
        return false;
    }
}

/*
    MIDDLE
    BOTTOM
    CYLINDER
    GLASS
    TOP
*/
const geometryTurnstile = [];

/*
    BLACK
    CYLINDER
    GLASS
    TOP
    TOPLIGHT
*/
const materialTurnstile = [];

const cWTS = 2;
const cHTS = 6;
const cDTS = 1;

const tWTS = 3;
const tHTS = 2;
const tDTS = 1;

const bWTS = 3;
const bHTS = 6;
const bDTS = 1;

const gWTS = 6;
const gHTS = 8;
const gDTS = 0.5;

function loadTurnStileTexture(loader) {
    const texture1 = loader.load("src/element/texture/redTurn.png");
    const texture2 = loader.load("src/element/texture/greenTurn.png");

    turnstileTexture = [texture1, texture2];
}

function createRotationTurnstile(obj, group, angle) {
    var tween;

    tween = new TWEEN.Tween(obj.rotation, group);
    tween.to({y: angle}, 100).start();
}

function createGeoMatTurnstile() {
    const geometryMiddle = createGeometryCube([1, 1, 0, 0, 0, 0], cWTS, cHTS, cDTS);
    const geometryBottom = createGeometryCube([1, 1, 0, 0, 1, 0], bWTS, bHTS, bDTS);
    const geometryCylinder = new THREE.CylinderGeometry( 0.5, 0.5, 6, 6 );
    const geometryGlass = createGeometryCube([1, 1, 1, 1, 1, 1], gWTS, gHTS, gDTS);
    const geometryTop = createGeometryCube([1, 1, 0, 0, 1, 0], tWTS, tHTS, tDTS);

    const materialBlack = new THREE.MeshPhongMaterial( {color: 0x000000} );
    const materialCylinder = new THREE.MeshPhongMaterial( {color: 0x9c9c9c} );
    const materialGlass = new THREE.MeshPhysicalMaterial( {
        color: "white",
        opacity: 0.2,
        transparent: true,
        side: THREE.DoubleSide} );
    var materialTopRed = new THREE.MeshPhongMaterial( {map: turnstileTexture[0], } );
    var materialTopLight = new THREE.MeshPhongMaterial( {
        map: turnstileTexture[1],
        emissiveIntensity: 0.1,
        emissive: new THREE.Color(50, 205, 50),
        emissiveMap: turnstileTexture[1],
    } );

    geometryTurnstile.push(geometryMiddle, geometryBottom, geometryCylinder, geometryGlass, geometryTop);
    materialTurnstile.push(materialBlack, materialCylinder, materialGlass, materialTopRed, materialTopLight);
}

function createHalfTurnstileOptimazed(texture, light) {
    const obj = new THREE.Object3D();

    const meshBottom = new THREE.Mesh(geometryTurnstile[1], materialTurnstile[0]);
    meshBottom.position.x = ((bWTS - cWTS)/ 2);
    meshBottom.position.y = (-((cHTS / 2) + (bHTS / 2)));

    const cube = new THREE.Mesh(geometryTurnstile[0], materialTurnstile[0]);
    cube.add(meshBottom);   //0

    const cylinder = new THREE.Mesh(geometryTurnstile[2], materialTurnstile[1]);
    const glass = new THREE.Mesh(geometryTurnstile[3], materialTurnstile[2]);
    glass.position.x = 3.9;
    glass.position.y = -1;

    cylinder.add(glass);
    cylinder.position.x = 1.5;
    cube.add( cylinder );  //1

    var top;
    if (!light)
        top = new THREE.Mesh(geometryTurnstile[4], materialTurnstile[3]);
    else
        top = new THREE.Mesh(geometryTurnstile[4], materialTurnstile[4]);

    top.position.x = 0.5;
    top.position.y = 4;

    cube.add(top);    //2

    obj.add(cube);

    obj.position.y = 2;
    obj.position.x = 0.5;

    return obj;
}

function createTurnstile(flag) {
    const obj = new THREE.Object3D();

    const leftTurn = createHalfTurnstileOptimazed(turnstileTexture[+flag], flag);
    const rightTurn = createHalfTurnstileOptimazed(turnstileTexture[+flag], flag);

    leftTurn.position.x = -9;

    rightTurn.position.x = 9;
    rightTurn.scale.x = -1;//(Math.PI);

    obj.add(leftTurn);
    obj.add(rightTurn);

    const r1 = leftTurn.children[0].children[1];
    const r2 = rightTurn.children[0].children[1];
    const ret = new Turnstile(obj, 21, 14, 1, r1, r2);
    ret.intersectionMesh = [[0, 0], [0, 0, 1], [0, 0, 2], [0, 0, 1, 0], [1, 0, 0], [1, 0, 1], [1, 0, 2], [1, 0, 1, 0]];
    ret.enabled = flag;
    return ret;
}
