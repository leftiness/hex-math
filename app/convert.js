var _ = require('lodash');

var _factory = {};
var _convert = {};

_.set(_convert, 'from.axial.to.cube', function (axial) {
  var hex = _factory.create.from.axial(axial);
  var q = hex.q;
  var r = hex.r;
  return _factory.create.from.cube([q, -q - r, r]);
});

_.set(_convert, 'from.cube.to.axial', function (cube) {
  var hex = _factory.create.from.cube(cube);
  var x = hex.x;
  var z = hex.z;
  return _factory.create.from.axial([x, z]);
});

module.exports = function (factory) {
  _factory = factory;
  return _convert;
};
