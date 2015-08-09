var _ = require('lodash');

var _factory = {};

_.set(_factory, 'create.from.axial', function (input) {
  var q;
  var r;
  var outcome;

  if (_.isEmpty(input)) {
    throw new Error('Coordinates must be array or object. ' + input);
  };

  if (_.isArray(input)) {
    q = input[0];
    r = input[1];
  } else {
    q = input['q'];
    r = input['r'];
  }

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

_.set(_factory, 'create.from.cube', function (input) {
  var x;
  var y;
  var z;
  var outcome;

  if (_.isEmpty(input)) {
    throw new Error('Coordinates must be array or object. ' + input);
  };

  if (_.isArray(input)) {
    x = input[0];
    y = input[1];
    z = input[2];
  } else {
    x = input['x'];
    y = input['y'];
    z = input['z'];
  }

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
