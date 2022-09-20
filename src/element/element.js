import { Vector3 } from "three";

export class Element {
    obj = null;
    width = 0;
    height = 0;
    depth = 0;
    available = true;
    type = "";
    toDispose = [];
    constructor(obj, width, height, depth) {
        this.obj = obj;
        this.width = width;
        this.height = height;
        this.depth = depth;
    };
    dispose () {
        for (var i = 0; i < this.toDispose.length; i++)
            this.toDispose[i].dispose();
        objDispose(this.obj);
    };
    getWorldPosition() {
        const p = new Vector3();
        this.obj.getWorldPosition(p);
        return p;
    }
}