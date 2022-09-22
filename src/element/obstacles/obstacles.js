
 function obstaclesCreate(type) {
  var obstacle;

  if (type == "Table")
  {
    obstacle = createObjectTable();
    newScale(obstacle, [5, 2.5, 5]);
    obstacle.obj.position.y += obstacle.height / 2;
  }
  else if (type == "Turnstile") {
    const randomInt = getRandomInt(2);
    obstacle = [];
    var obstacle1 = createTurnstile(randomInt == 0);
    var obstacle2 = createTurnstile(randomInt == 1);
    newScale(obstacle1, [1.8, 2, 2]);
    newScale(obstacle2, [1.8, 2, 2]);
    obstacle1.obj.position.x = -obstacle1.width / 2;
    obstacle1.obj.position.y = obstacle1.height / 2;
    obstacle2.obj.position.x = obstacle2.width / 2;
    obstacle2.obj.position.y = obstacle2.height / 2;
    obstacle.push(obstacle1, obstacle2);
  }
  else if (type == "Computer") {
    obstacle = createComputer();
    newScale(obstacle, [3.5, 3.5, 4.0]);
    obstacle.obj.rotation.x = -Math.PI / 2;
    obstacle.obj.position.y += obstacle.height / 2;
  }
  else if (type == "Bar") {
    obstacle = createObjectBar();
    newScale(obstacle, [5, 2.5, 5]);
  }
  return obstacle;
}

function isInRangeZ(obstacle, player) {
  var p1 = player.position.z - player.size.z / 2;
  var p2 = p1 + player.size.z;
  var o1 = obstacle.position.z - obstacle.size / 2;
  var o2 = o1 + obstacle.size.z;
  if (o2 <= p2 && o2 >= p1) return true;
  if (o1 <= p2 && o1 >= p1) return true;
  return false;
}
