
class DecorationLight extends Element {
  constructor (obj) {
    super(obj, 0, 0, 0);
    this.type = "CeilingLight";
  };
}

const geometryLamp = [];
const materialLamp = [];

var widthLamp;
var heightLamp;
var depthLamp;
var shiftLamp;

function createBordLampGeometry(w, h, d, s) {
  const f = 0.75;

  const vertices = [
    //face 1
    {pos: [0, -h/2, d/2], norm: [0.4731, 0, 0.881], uv: [0, 0]}, //0_29_32_46           //0
    {pos: [w/2 * f, -h/2, d/2 * f], norm: [0.4731, 0, 0.881], uv: [1, 0]}, //1=4=34=36  //1
    {pos: [0, h/2, d/2], norm: [0.4731, 0, 0.881], uv: [1, 0]}, //2=31                  //2
    {pos: [w/2 * f, h/2, d/2 * f], norm: [0.4731, 0, 0.881], uv: [1, 1]}, //3=6         //3
    //face 2
    {pos: [w/2 * f, -h/2, d/2 * f], norm: [0.881, 0, 0.4731], uv: [0, 0]}, //1=4=34=36  //4
    {pos: [w/2, -h/2, 0], norm: [0.881, 0, 0.4731], uv: [1, 0]}, //5=38                 //5
    {pos: [w/2 * f, h/2, d/2 * f], norm: [0.881, 0, 0.4731], uv: [1, 0]}, //3=6         //6
    {pos: [w/2, h/2, 0], norm: [0.881, 0, 0.4731], uv: [1, 1]}, //7                     //7
    //face 3
    {pos: [w/2 - s, -h/2, 0], norm: [-0.881, 0, 0.4731], uv: [0, 0]}, //8=39            //8
    {pos: [w/2 - s, h/2, 0], norm: [-0.881, 0, 0.4731], uv: [1, 0]}, //9                //9
    {pos: [(w/2 - s) * f, -h/2, -(d/2 -s) * f], norm: [-0.881, 0, 0.4731], uv: [1, 0]}, //10=12  //10
    {pos: [(w/2 - s) * f, h/2, -(d/2 - s) * f], norm: [-0.881, 0, 0.4731], uv: [1, 1]}, //11=13  //11
    //face 4
    {pos: [(w/2 - s) * f, -h/2, -(d/2 -s) * f], norm: [-0.4731, 0, 0.881], uv: [0, 0]}, //10=12  //12
    {pos: [(w/2 - s) * f, h/2, -(d/2 - s) * f], norm: [-0.4731, 0, 0.881], uv: [1, 0]}, //11=13  //13
    {pos: [0, -h/2, -(d/2 - s)], norm: [-0.4731, 0, 0.881], uv: [1, 0]}, //14=16                 //14
    {pos: [0, h/2, -(d/2 - s)], norm: [-0.4731, 0, 0.881], uv: [1, 1]}, //15=17                  //15
    //face 5
    {pos: [0, -h/2, -(d/2 - s)], norm: [0.4731, 0, 0.881], uv: [0, 0]}, //14=16                  //16
    {pos: [0, h/2, -(d/2 - s)], norm: [0.4731, 0, 0.881], uv: [0, 1]}, //15=17                   //17
    {pos: [-(w/2 -s) * f, -h/2, -(d/2 - s) * f], norm: [0.4731, 0, 0.881], uv: [1, 0]}, //18=20  //18
    {pos: [-(w/2 - s) * f, h/2, -(d/2 - s) * f], norm: [0.4731, 0, 0.881], uv: [1, 1]}, //19=21      //19
    //face 6
    {pos: [-(w/2 -s) * f, -h/2, -(d/2 - s) * f], norm: [0.881, 0, 0.4731], uv: [0, 0]}, //18=20  //20
    {pos: [-(w/2 - s) * f, h/2, -(d/2 - s) * f], norm: [0.881, 0, 0.4731], uv: [1, 0]}, //19=21      //21
    {pos: [-(w/2 - s), -h/2, 0], norm: [0.881, 0, 0.4731], uv: [0, 1]}, //22=41                  //22
    {pos: [-(w/2 - s), h/2, 0], norm: [0.881, 0, 0.4731], uv: [1, 1]}, //23                      //23
    //face 7
    {pos: [-(w/2), -h/2, 0], norm: [-0.881, 0, 0.4731], uv: [0, 0]}, //24=40         //24
    {pos: [-w/2 * f, -h/2, d/2 * f], norm: [-0.881, 0, 0.4731], uv: [1, 0]}, //25=28=42=44          //25
    {pos: [-w/2, h/2, 0], norm: [-0.881, 0, 0.4731], uv: [0, 1]}, //26         //26
    {pos: [-w/2 * f, h/2, d/2 * f], norm: [-0.881, 0, 0.4731], uv: [1, 1]}, //27=30      //27
    //face 8
    {pos: [-w/2 * f, -h/2, d/2 * f], norm: [-0.4731, 0, 0.881], uv: [0, 0]}, //25=28=42=44          //28
    {pos: [0, -h/2, d/2], norm: [-0.4731, 0, 0.881], uv: [1, 0]}, //0_29_32_46           //29
    {pos: [-w/2 * f, h/2, d/2 * f], norm: [-0.4731, 0, 0.881], uv: [0, 1]}, //27=30      //30
    {pos: [0, h/2, d/2], norm: [-0.4731, 0, 0.881], uv: [1, 1]}, //2=31                  //31
    //face 9
    {pos: [0, -h/2, d/2], norm: [0, -1, 0], uv: [0, 0]}, //0_29_32_46                     //32
    {pos: [0, -h/2, d/2 -s], norm: [0, -1, 0], uv: [1, 0]}, //33=47                       //33
    {pos: [w/2 * f, -h/2, d/2 * f], norm: [0, -1, 0], uv: [0, 1]}, //1=4=34=36            //34
    {pos: [(w/2 -s) * f, -h/2, (d/2 -s) * f], norm: [0, -1, 0], uv: [1, 1]}, //35=37      //35
    //face 10
    {pos: [w/2 * f, -h/2, d/2 * f], norm: [0, -1, 0], uv: [0, 0]}, //1=4=34=36            //36
    {pos: [(w/2 -s) * f, -h/2, (d/2 -s) * f], norm: [0, -1, 0], uv: [1, 0]}, //35=37      //37
    {pos: [w/2, -h/2, 0], norm: [0, -1, 0], uv: [0, 1]}, //5=38                           //38
    {pos: [w/2 - s, -h/2, 0], norm: [0, -1, 0], uv: [1, 1]}, //8=39                       //39
    //face 11
    {pos: [w/2, -h/2, 0], norm: [0, -1, 0], uv: [0, 0]}, //5=38                           //40
    {pos: [w/2 - s, -h/2, 0], norm: [0, -1, 0], uv: [1, 0]}, //8=39                       //41
    {pos: [(w/2) * f, -h/2, -(d/2) * f], norm: [0, -1, 0], uv: [0, 1]}, //n1              //42
    {pos: [(w/2 - s) * f, -h/2, -(d/2 -s) * f], norm: [0, -1, 0], uv: [1, 1]}, //10=12    //43
    //face 12
    {pos: [(w/2) * f, -h/2, -(d/2) * f], norm: [0, -1, 0], uv: [0, 0]}, //n1              //44
    {pos: [(w/2 - s) * f, -h/2, -(d/2 -s) * f], norm: [0, -1, 0], uv: [1, 0]}, //10=12    //45
    {pos: [0, -h/2, -(d/2)], norm: [0, -1, 0], uv: [0, 1]}, //n2                          //46
    {pos: [0, -h/2, -(d/2 - s)], norm: [0, -1, 0], uv: [1, 1]}, //14=16                   //47
    //face 13
    {pos: [0, -h/2, -(d/2)], norm: [0, -1, 0], uv: [0, 0]}, //n2,                         //48
    {pos: [0, -h/2, -(d/2 - s)], norm: [0, -1, 0], uv: [1, 0]}, //14=16                   //49
    {pos: [-(w/2) * f, -h/2, -(d/2) * f], norm: [0, -1, 0], uv: [0, 1]}, //n3          //50
    {pos: [-(w/2 -s) * f, -h/2, -(d/2 - s) * f], norm: [0, -1, 0], uv: [1, 1]}, //18=20   //51
    //face 14
    {pos: [-(w/2) * f, -h/2, -(d/2) * f], norm: [0, -1, 0], uv: [0, 0]}, //n3          //52
    {pos: [-(w/2 -s) * f, -h/2, -(d/2 - s) * f], norm: [0, -1, 0], uv: [1, 0]}, //18=20   //53
    {pos: [-(w/2), -h/2, 0], norm: [0, -1, 0], uv: [0, 1]}, //24=40                       //54
    {pos: [-(w/2 - s), -h/2, 0], norm: [0, -1, 0], uv: [1, 1]}, //22=41                   //55
    //face 15
    {pos: [-(w/2), -h/2, 0], norm: [0, -1, 0], uv: [0, 0]}, //24=40                       //56
    {pos: [-(w/2 - s), -h/2, 0], norm: [0, -1, 0], uv: [1, 0]}, //22=41                   //57
    {pos: [-w/2 * f, -h/2, d/2 * f], norm: [0, -1, 0], uv: [0, 1]}, //25=28=42=44         //58
    {pos: [-(w/2 - s) * f, -h/2, (d/2 - s) * f], norm: [0, -1, 0], uv: [1, 1]}, //43=45   //59
    //face 16
    {pos: [-w/2 * f, -h/2, d/2 * f], norm: [0, -1, 0], uv: [0, 0]}, //25=28=42=44         //60
    {pos: [-(w/2 - s) * f, -h/2, (d/2 - s) * f], norm: [0, -1, 0], uv: [1, 0]}, //43=45   //61
    {pos: [0, -h/2, d/2], norm: [0, -1, 0], uv: [0, 1]}, //0_29_32_46                     //62
    {pos: [0, -h/2, d/2 -s], norm: [0, -1, 0], uv: [1, 1]}, //33=47                       //63
  ];

  const index = [];
  for (var size = 0; size < 16; size++) {
    const d = (size * 4);
    index.push(0 + d, 1 + d, 2 + d, 2 + d, 1 + d, 3 + d);
  };

  return componeGeometry(vertices, index);
}

function createGeoMatCeilingLamp(w, h, d, s = 0.5) {

  widthLamp = w;
  heightLamp = h;
  depthLamp = d;
  shiftLamp = s;


  const geometryExternal = createBordLampGeometry(w, h, d, s);
  const materialExternal = new THREE.MeshPhongMaterial({
    color: 0x222222,
  });

  const geometryOctagon = createGeometryOctagon(w - (2 * s), d - (2 * s));
  const materialOctagon = new THREE.MeshPhongMaterial({
    color: 0xFFFFCC,
    opacity: 0.2,
  });

  geometryLamp.push(geometryExternal, geometryOctagon);
  materialLamp.push(materialExternal, materialOctagon);
}

function createCeilingLampOptimized() {
  const obj = new THREE.Object3D();

  const lamp = new THREE.Mesh(geometryLamp[0], materialLamp[0]);

  const light = new THREE.Mesh(geometryLamp[1], materialLamp[1]);
  light.rotateX(Math.PI / 2);
  light.position.y = -heightLamp / 4;
  lamp.add(light);

  obj.add(lamp);

  const target = new THREE.Object3D();
  target.position.set(0.0, -4.0, 0.0);

  const spotLight = new THREE.SpotLight( 0xFFFFCC );
  spotLight.intensity = 0.6;
  spotLight.decay = 2;
  spotLight.penumbra = 0.2;
  spotLight.distance = 200;
  spotLight.angle = Math.PI / 8;
  spotLight.position.set(0, 0, 0.5);
  spotLight.target = target;

  obj.add(spotLight);
  obj.add(target);

  return new DecorationLight(obj);
}
