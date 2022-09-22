
 class Element {
    obj = null;
    width = 0;
    height = 0;
    depth = 0;
    available = true;
    type = "";
    constructor(obj, width, height, depth) {
        this.obj = obj;
        this.width = width;
        this.height = height;
        this.depth = depth;
    };
    getWorldPosition() {
        const p = new THREE.Vector3();
        this.obj.getWorldPosition(p);
        return p;
    }
}

class Block extends Element {
    enabled =  false;
    connectionPoints = [5, 6, 7];
    orientationPoints =  [8, 9, 10];
    constructor (obj, w, h, d) {
        super(obj, w, h, d);
        this.type = "Block";
    };
    getConnectionPoints () {
        return getConnectionPoints(this.obj, this.connectionPoints);
    };
    getOrientationPoints () {
        return getConnectionPoints(this.obj, this.orientationPoints)[0];
    };
    connect (array) {
        const orientation = this.getOrientationPoints();
        var normal1 = takeNormal(array[0].toArray(), array[1].toArray(), array[2].toArray());
        var normal2 = takeNormal(orientation[0].toArray(), orientation[1].toArray(), orientation[2].toArray());
    
        var angle = dot(normal1, normal2);
        if (angle == Math.PI / 2) {
            const ay = vectProd(normal2, normal1);
            if (ay[1] < 0)
                angle *= -1;
        }
    
        const a = takeAxis(normal1);
        const a2 = (a == 0) ? 2 : 0; //prendo l'altro asse
        this.obj.position.setComponent(a, array[1].getComponent(a) + ((this.depth / 2) * normal1[a])); //in normal[a] c'è il segno
        this.obj.position.setComponent(a2, array[1].getComponent(a2));
    
        this.obj.rotateY(angle - Math.PI);
    };
    isIn (cat) {
        const frontC = cat.obj.position.z - cat.depth / 2;
        const backR = this.obj.position.z + this.depth / 2;
        const frontR = this.obj.position.z - this.depth / 2;

        if (backR > frontC && frontR < frontC)
            return true;
        return false;
    };
}

function getConnectionPoints(obj, points) {
    const ret = [];
    for (var i = 0; i < points.length; i += 3) {
        const array = [];

        const p1 = new THREE.Vector3();
        obj.children[points[i]].getWorldPosition(p1);
        const p2 = new THREE.Vector3();
        obj.children[points[i + 1]].getWorldPosition(p2);
        const p3 = new THREE.Vector3();
        obj.children[points[i + 2]].getWorldPosition(p3);
    
        array.push(p1);
        array.push(p2);
        array.push(p3);

        ret.push(array);
    }

    return ret;
}

function takeAxis(axis)
{
    if (Math.round(axis[0]) == 1 || Math.round(axis[0]) == -1)
        return 0;
    //if (axis[1] == 1)
    //    return 1;
    else if (Math.round(axis[2]) == 1 || Math.round(axis[2]) == -1)
        return 2;
}