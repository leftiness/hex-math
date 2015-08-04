var hm = {};

hm.convertCubeToAxial = function (cube, keys) {
  var xKey;
  var yKey;
  var zKey;
  var x;
  var y;
  var z;
  var outcome;
  var emptyCube;
  var emptyKeys;
  var cubeIsArray;

  emptyCube = !!!cube || cube.length === 0;

  if (emptyCube) {
    throw new Error('Invalid empty coordinates. ' + cube);
  }

  cubeIsArray = Array.isArray(cube);
  emptykeys = !!!keys || keys.length === 0;

  if (!cubeIsArray && emptyKeys) {
    throw new Error('Keys are required when coordinates are in an object. ' + keys);
  }

  keys = keys || [0, 1, 2];
  keys = keys.length === 0 ? [0, 1, 2] : keys;

  xKey = keys[0];
  yKey = keys[1];
  zKey = keys[2];

  x = cube[xKey];
  y = cube[yKey];
  z = cube[zKey];

  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
    throw new Error('Invalid coordinates. Type is not number. ' + [x, y, z]);
  }

  if (x + y + z !== 0) {
    throw new Error('Invalid coordinates. X + Y + Z should equal 0. ' + [x, y, z]);
  }

  if (cubeIsArray) {
    outcome = [x, z];
  } else {
    outcome = {
      'q': x,
      'r': z
    };
  }

  return outcome;
};

hm.convertAxialToCube = function (axial, keys) {
  var qKey;
  var rKey;
  var q;
  var r;
  var outcome;
  var emptyAxial;
  var emptyKeys;
  var axialIsArray;

  emptyAxial = !!!axial || axial.length === 0;

  if(emptyAxial) {
    throw new Error("Invalid empty coordinates. " + axial);
  }

  axialIsArray = Array.isArray(axial);
  emptyKeys = !!!keys || keys.length === 0;

  if (!axialIsArray && emptyKeys) {
    throw new Error("Keys are required when coordinates are in an object. " + keys);
  }

  keys = keys || [0, 1];
  keys = keys.length === 0 ? [0, 1] : keys;

  qKey = keys[0];
  rKey = keys[1];

  q = axial[qKey];
  r = axial[rKey];

  if (typeof q !== 'number' || typeof r !== 'number') {
    throw new Error('Invalid coordinates. Type is not a number. ' + [q, r]);
  }

  if (axialIsArray) {
    outcome = [q, -q - r, r];
  } else {
    outcome = {
      'x': q,
      'y': -q - r,
      'z': r
    };
  }

  return outcome;
};

module.exports = hm;
