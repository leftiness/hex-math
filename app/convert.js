var _ = require('lodash');

var convert = {};

_.set(convert, 'from.axial.to.cube', function (axial, keys) {
  var qKey;
  var rKey;
  var q;
  var r;
  var outcome;

  if(_.isEmpty(axial)) {
    throw new Error("Empty coordinates. " + axial);
  }

  if (!_.isArray(axial) && _.isEmpty(keys)) {
    throw new Error("Keys are required when coordinates are in an object. " + keys);
  }

  if (_.isEmpty(keys)) {
    keys = [0, 1];
  }

  qKey = keys[0];
  rKey = keys[1];

  q = axial[qKey];
  r = axial[rKey];

  ([q, r]).forEach(function (each) {
    if (!_.isNumber(each)) {
        throw new Error('Invalid coordinates. Type is not a number. ' + each);
    };
  });

  if (_.isArray(axial)) {
    outcome = [q, -q - r, r];
  } else {
    outcome = {
      'x': q,
      'y': -q - r,
      'z': r
    };
  }

  return outcome;
});

_.set(convert, 'from.cube.to.axial', function (cube, keys) {
  var xKey;
  var yKey;
  var zKey;
  var x;
  var y;
  var z;
  var outcome;

  if (_.isEmpty(cube)) {
    throw new Error('Invalid empty coordinates. ' + cube);
  }

  if (!_.isArray(cube) && _.isEmpty(keys)) {
    throw new Error('Keys are required when coordinates are in an object. ' + keys);
  }

  if (_.isEmpty(keys)) {
    keys = [0, 1, 2];
  }

  xKey = keys[0];
  yKey = keys[1];
  zKey = keys[2];

  x = cube[xKey];
  y = cube[yKey];
  z = cube[zKey];

  ([x, y, z]).forEach(function (each) {
    if (!_.isNumber(each)) {
        throw new Error('Invalid coordinates. Type is not a number. ' + each);
    };
  });

  if (x + y + z !== 0) {
    throw new Error('Invalid coordinates. X + Y + Z should equal 0. ' + [x, y, z]);
  }

  if (_.isArray(cube)) {
    outcome = [x, z];
  } else {
    outcome = {
      'q': x,
      'r': z
    };
  }

  return outcome;
});

module.exports = convert;
