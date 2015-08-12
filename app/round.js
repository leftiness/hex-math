var _ = require('lodash');

var _factory = {};
var _convert = {};
var _round = {};

_.set(_round, 'cube', function (cube) {
  var round = Math.round;
  var floor = Math.floor;
  var abs = Math.abs;

  var rx;
  var ry;
  var rz;
  var rh;

  var dx;
  var dy;
  var dz;

  cube = _factory.create.from.cube(cube);

  rx = round(cube.x);
  ry = round(cube.y);
  rz = round(cube.z);
  rh = floor(cube.h);

  dx = abs(rx - cube.x);
  dy = abs(ry - cube.y);
  dz = abs(rz - cube.z);

  if (dx > dy && dx > dz) {
    rx = -ry -rz;
  } else if (dy > dz) {
    ry = -rx - rz;
  } else {
    rz = -rx - ry;
  }

  return _factory.create.from.cube([rx, ry, rz, rh]);
});

_.set(_round, 'axial', function (axial) {
  var cube = _convert.from.axial.to.cube(axial);

  cube = _round.cube(cube);
  axial = _convert.from.cube.to.axial(cube);

  return axial;
});

module.exports = function (factory, convert) {
  _factory = factory;
  _convert = convert;

  return _round;
};
