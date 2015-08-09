var _ = require('lodash');

var _convert = {};
var _factory = {};
var _nei = {};

var _axial = [
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

  _axial.forEach(function (each) {
    var hex = {};
    hex.q = axial.q + each[0];
    hex.r = axial.r + each[1];
    output.push(hex);
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
