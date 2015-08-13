var _ = require('lodash');

var _factory = {};

var _create = function (input, keys) {
  var output = {};
  var array = [];

  if (_.isEmpty(input)) {
    throw new Error('Coordinates must be array or object. ' + input);
  };

  for (i = 0; i < keys.length; i++) {
    var coord = _.isArray(input) ? input[i] : input[keys[i]];

    if (!_.isNumber(coord)) {
      throw new Error('Coordinate type is not a number. '
        + keys[i]
        + ':'
        + coord
      );
    }

    output[keys[i]] = coord;
    array[i] = coord;
  }

  _.set(output, 'to.array', function () {
    return array;
  });

  return output;
}

_.set(_factory, 'create.from.axial', function (input) {
  return _create(input, ['q', 'r', 'h']);
});

_.set(_factory, 'create.from.cube', function (input) {
  var hex = _create(input, ['x', 'y', 'z', 'h']);
  var sum = _.sum([hex.x, hex.y, hex.z]);
  var floor = _.floor(sum, 5);

  if (floor !== 0) {
    throw new Error('x + y + z != 0 ' + hex.to.array());
  }

  return hex
});

module.exports = _factory;
