var _ = require('lodash');

var _convert = {};
var _factory = {};
var _nei = {};

var _directions = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1]
];

_.set(_nei, 'from.axial', function(axial) {
  var output = [];

  axial = _factory.create.from.axial(axial);

  _directions.forEach(function (direction) {
    var q = axial.q + direction[0];
    var r = axial.r + direction[1];
    var h = axial.h;
    var hex = _factory.create.from.axial([q, r, h]);

    output.push(hex);
  });

  return output;
});

_.set(_nei, 'from.axial.with.height', function (axial) {
  var output = [];
  var above;
  var below;
  var results;

  axial = _factory.create.from.axial(axial);

  above = _.clone(axial);
  below = _.clone(axial);

  above.h += 1;
  below.h -= 1;

  results = _nei.from.axial(axial);

  output = output.concat(results);
  output.push(above);
  output.push(below);

  return output;
});

_.set(_nei, 'from.cube', function(cube) {
  var axial = _convert.from.cube.to.axial(cube);
  var results = _nei.from.axial(axial);
  var output = [];

  results.forEach(function (result) {
    output.push(_convert.from.axial.to.cube(result));
  });

  return output;
});

_.set(_nei, 'from.cube.with.height', function (cube) {
  var axial = _convert.from.cube.to.axial(cube);
  var results = _nei.from.axial.with.height(axial);
  var output = [];

  results.forEach(function (result) {
    output.push(_convert.from.axial.to.cube(result));
  });

  return output;
});

module.exports = function (factory, convert) {
  _factory = factory;
  _convert = convert;

  return _nei;
};
