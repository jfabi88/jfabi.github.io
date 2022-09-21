
class Table extends Element {
    intersectionLimit = [];
    constructor (obj, width, height, depth, intersectionLimit) {
        super(obj, width, height, depth)
        this.intersectionLimit = intersectionLimit;
        this.type = "Table";
    };
    dispose () {
        objDispose(this.obj);
    };
    checkIntersection (cat) {

        const pT = new THREE.Vector3();
        const pCC = new THREE.Vector3();

        this.obj.getWorldPosition(pT);
        cat.center.getWorldPosition(pCC);

        const limitPositionD = pT.y + this.intersectionLimit[0];
        const limitPositionU = pT.y + this.intersectionLimit[1];

        if (pCC.y + (cat.height / 2) >= limitPositionU && pCC.y - (cat.height / 2) <= limitPositionD)
            return true;
        return false;
    }
}

function intersectionTable(table, cat)
{
    const limitPositionD = table.obj.position.y + table.intersectionLimit[0];
    const limitPositionU = table.obj.position.y + table.intersectionLimit[1];

    if (cat.obj.position.y + cat.center.position.y + (cat.height / 2) >= limitPositionU && cat.obj.position.y + cat.center.position.y - (cat.height / 2) <= limitPositionD)
        return 1;
    return 0;
}

 function createTable()
{
    const legW = 1.0;
    const legH = 5.0;
    const legD = 3.0;

    const top1W = 10.0;
    const top1H = 0.5;
    const top1D = legD + 1.0;

    const top2W = top1W;
    const top2H = 0.1;
    const top2D = top1D + 0.2;
    
    const obj = new THREE.Object3D();

    const blackMaterial = new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" });
    const whiteMaterial =  new THREE.MeshPhongMaterial({ color: "white" });

    const geometryTop1 = createGeometryCube([1, 0, 0, 0, 0, 0]);
    const top1 = createMesh(geometryTop1, blackMaterial, top1W, top1H, top1D);
    //console.log(top1.position);

    //const top1 = createCube(top1W, top1H, top1D,  whiteMaterial);

    //const top2 = createCube(top2W, top2H, top2D, whiteMaterial);
    const geometryTop2 = createGeometryCube([1, 0, 0, 0, 1, 0]);
    const top2 = createMesh(geometryTop2, whiteMaterial, (top2W * 2) / (top1W) , (top2H * 2) / top1H, (top2D * 2) / top1D);
    top2.position.y = ((top1H + top2H)/ 2) / (top1H / 2);
    top1.add(top2);

    const geometryLeg1 = createGeometryCube([1, 0, 0, 1, 0, 0]);
    const leg1 = createMesh(geometryLeg1, blackMaterial, (legW * 2) /(top1W), (legH * 2) / (top1H), (legD * 2) / (top1D));
    //const leg1 = createCube(legW, legH, legD, blackMaterial);
    leg1.position.x = (top1W / 2 - 1) / (top1W / 2);
    leg1.position.y = (-(top1H + legH) / 2) / (top1H / 2);
    top1.add(leg1);
    //obj.add(leg1);

    const geometryLeg2 = createGeometryCube([1, 1, 0, 0, 0, 0]);
    const leg2 = createMesh(geometryLeg2, blackMaterial, (legW * 2) / (top1W), (legH * 2) / (top1H), (legD * 2) / top1D);
    //const leg2 = createCube(legW, legH, legD, blackMaterial);
    leg2.position.x = -(top1W / 2 - 1) / (top1W / 2);
    leg2.position.y = (-(top1H + legH) / 2) / (top1H / 2);
    top1.add(leg2);
    //obj.add(leg2);

    top1.position.y = (legH + top1H)/2;

    obj.add(top1);

    const table = new Table(obj, top1W, legH + top1H + top2H, top2D, [(legH - top1H - top2H) / 2, (legH + top1H + top2H) / 2]);

    return (table);
}