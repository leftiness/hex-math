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
  var heights = [-1, 0, 1];

  axial = _factory.create.from.axial(axial);

  heights.forEach(function (height) {
    _directions.forEach(function (direction) {
      var hex = {};

      hex.q = axial.q + direction[0];
      hex.r = axial.r + direction[1];
      hex.h = axial.h + height;

      output.push(hex);
    })
  });

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

module.exports = function (factory, convert) {
  _factory = factory;
  _convert = convert;

  return _nei;
};
