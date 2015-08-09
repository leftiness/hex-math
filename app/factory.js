var _ = require('lodash');

var _factory = {};

_.set(_factory, 'create.from.axial', function (input, keys) {
  var qKey;
  var rKey;
  var q;
  var r;
  var outcome;

  if (_.isEmpty(input)) {
    throw new Error('Coordinates must be array or object. ' + input);
  };

  if (!_.isArray(input) && _.isEmpty(keys)) {
    throw new Error('Coordinate objects require key array. ' + keys);
  }

  if (_.isEmpty(keys)) {
    keys = [0, 1];
  }

  qKey = keys[0];
  rKey = keys[1];

  q = input[qKey];
  r = input[rKey];

  ([q, r]).forEach(function (each) {
    if (!_.isNumber(each)) {
        throw new Error('Coordinate type is not a number. ' + each);
    };
  });

  outcome = {
    'q': q,
    'r': r
  };

  _.set(outcome, 'to.array', function () {
    return [q, r];
  });

  return outcome;
});

_.set(_factory, 'create.from.cube', function (input, keys) {
  var xKey;
  var yKey;
  var zKey;
  var x;
  var y;
  var z;
  var outcome;

  if (_.isEmpty(input)) {
    throw new Error('Coordinates must be array or object. ' + input);
  };

  if (!_.isArray(input) && _.isEmpty(keys)) {
    throw new Error('Coordinate objects require key array. ' + keys);
  }

  if (_.isEmpty(keys)) {
    keys = [0, 1, 2];
  }

  xKey = keys[0];
  yKey = keys[1];
  zKey = keys[2];

  x = input[xKey];
  y = input[yKey];
  z = input[zKey];

  ([x, y, z]).forEach(function (each) {
    if (!_.isNumber(each)) {
        throw new Error('Coordinate type is not a number. ' + each);
    };
  });

  if (x + y + z !== 0) {
    throw new Error('X + Y + Z should equal 0. ' + [x, y, z]);
  }

  outcome = {
    'x': x,
    'y': y,
    'z': z
  };

  _.set(outcome, 'to.array', function () {
    return [x, y, z];
  });

  return outcome;
});

module.exports = _factory;
