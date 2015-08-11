var _ = require('lodash');

var _factory = {};
var _convert = {};
var _distance = {};

_.set(_distance, 'between.axial', function (axial1, axial2) {
  axial1 = _factory.create.from.axial(axial1);
  axial2 = _factory.create.from.axial(axial2);

  cube1 = _convert.from.axial.to.cube(axial1);
  cube2 = _convert.from.axial.to.cube(axial2);

  return _distance.between.cube(cube1, cube2);
});

_.set(_distance, 'between.axial.with.height', function (axial1, axial2) {
  axial1 = _factory.create.from.axial(axial1);
  axial2 = _factory.create.from.axial(axial2);

  cube1 = _convert.from.axial.to.cube(axial1);
  cube2 = _convert.from.axial.to.cube(axial2);

  return _distance.between.cube.with.height(cube1, cube2);
});

_.set(_distance, 'between.cube', function (cube1, cube2) {
  var abs = Math.abs;
  var distance;

  cube1 = _factory.create.from.cube(cube1);
  cube2 = _factory.create.from.cube(cube2);

  distance = abs(cube1.x - cube2.x);
  distance += abs(cube1.y - cube2.y);
  distance += abs(cube1.z - cube2.z);
  distance /= 2;

  return distance;
});

_.set(_distance, 'between.cube.with.height', function (cube1, cube2) {
  var abs = Math.abs;
  var distance;

  distance = _distance.between.cube(cube1, cube2);
  distance += abs(cube1.h - cube2.h);

  return distance;
});

module.exports = function (factory, convert) {
  _factory = factory;
  _convert = convert;

  return _distance;
}
