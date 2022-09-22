
class Table extends Element {
    intersectionMesh = [];
    constructor (obj, width, height, depth) {
        super(obj, width, height, depth)
        this.type = "Table";
    };
}

/*
    TOP1
    TOP2
    LEG
*/
const geometryTable = [];

/*
    BLACK
    WHITE
*/
const materialTable = [];

const legWTable = 1.0;
const legHTable = 5.0;
const legDTable = 3.0;

const top1WTable = 10.0;
const top1HTable = 0.5;
const top1DTable = legDTable + 1.0;

const top2WTable = top1WTable;
const top2HTable = 0.1;
const top2DTable = top1DTable + 0.2;

function createGeoMatTable() {
    const geometryTop1 = createGeometryCube([1, 0, 0, 0, 0, 0], top1WTable, top1HTable, top1DTable);
    const geometryTop2 = createGeometryCube([1, 0, 0, 0, 1, 0], top2WTable, top2HTable, top2DTable);
    const geometryLeg1 = createGeometryCube([1, 0, 0, 1, 0, 0], legWTable, legHTable, legDTable);
    const geometryLeg2 = createGeometryCube([1, 1, 0, 0, 0, 0], legWTable, legHTable, legDTable);

    const blackMaterial = new THREE.MeshPhongMaterial({ color: "rgb(40, 40, 40)" });
    const whiteMaterial =  new THREE.MeshPhongMaterial({ color: "white" });

    geometryTable.push(geometryTop1, geometryTop2, geometryLeg1, geometryLeg2);
    materialTable.push(blackMaterial, whiteMaterial);
}

function createObjectTable()
{   
    const obj = new THREE.Object3D();

    const top1 = new THREE.Mesh(geometryTable[0], materialTable[0]);

    const top2 = new THREE.Mesh(geometryTable[1], materialTable[1]);
    top2.position.y = ((top1HTable + top2HTable)/ 2);
    top1.add(top2);

    const leg1 = new THREE.Mesh(geometryTable[2], materialTable[0]);
    leg1.position.x = (top1WTable / 2 - 1);
    leg1.position.y = (-(top1HTable + legHTable) / 2);
    top1.add(leg1);

    const leg2 = new THREE.Mesh(geometryTable[3], materialTable[0]);
    leg2.position.x = -(top1WTable / 2 - 1);
    leg2.position.y = (-(top1HTable + legHTable) / 2);
    top1.add(leg2);

    top1.position.y = (legHTable + top1HTable)/2;

    obj.add(top1);

    const table = new Table(obj, top1WTable, legHTable + top1HTable + top2HTable, top2DTable, [(legHTable - top1HTable - top2HTable) / 2, (legHTable + top1HTable + top2HTable) / 2]);
    table.intersectionMesh = [[0], [0, 0], [0, 1], [0, 2]];

    return (table);
}