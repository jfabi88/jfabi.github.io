
function createRotationTurnstile(obj, group, angle) {
    var tween;

    tween = new TWEEN.Tween(obj.rotation, group);
    tween.to({y: angle}, 100).start();
}