var math = {};

math.convertCubeToAxial = function (cube) {
  var x = cube[0];
  var y = cube[1];
  var z = cube[2];

  if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
    return [x, z];
  } else {
    throw new Error('Invalid input: ' + cube)
  }
};

math.convertAxialToCube = function (axial) {
  var q = axial[0];
  var r = axial[1];

  if (typeof q === 'number' && typeof r === 'number') {
    return [q, (-q - r), r];
  } else {
    throw new Error('Invalid input: ' + axial);
  }
};

module.exports = math;
