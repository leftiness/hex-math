var _ = require('lodash');

var _factory = {};
var _convert = {};
var _round = {};
var _distance;
var _line = {};

var _lerp = function (cube1, cube2, t) {
  var results = [];

  ['x', 'y', 'z', 'h'].forEach(function (n) {
    var lerp = cube1[n] + (cube2[n] - cube1[n]) * t;

    lerp = _.ceil(lerp, 10);
    results.push(lerp);
  });

  return _factory.create.from.cube(results);
};

_.set(_line, 'from.axial', function (axial1, axial2) {
  var cube1;
  var cube2;
  var result;

  axial1 = _factory.create.from.axial(axial1);
  axial2 = _factory.create.from.axial(axial2);

  cube1 = _convert.from.axial.to.cube(axial1);
  cube2 = _convert.from.axial.to.cube(axial2);

  result = _line.from.cube(cube1, cube2);

  return result;
});

_.set(_line, 'from.cube', function (cube1, cube2) {
  var distance;
  var n;
  var results = [];

  cube1 = _factory.create.from.cube(cube1);
  cube2 = _factory.create.from.cube(cube2);

  distance = _distance.between.cube(cube1, cube2);
  n = distance + 1;

  _.range(n + 1).forEach(function (i) {
    var lerp = _lerp(cube1, cube2, 1/n * i);
    var rounded = _round.cube(lerp);

    results.push(rounded);
  });

  return results;
});

module.exports = function (factory, convert, round, distance) {
  _factory = factory;
  _convert = convert;
  _round = round;
  _distance = distance;

  return _line;
};
