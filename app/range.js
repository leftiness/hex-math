var _ = require('lodash');

var _factory = {};
var _convert = {};
var _range = {};

_.set(_range, 'from.cube', function (cube, range) {
  var results = [];
  var xmin = -range;
  var xmax = range;

  cube = _factory.create.from.cube(cube);

  _.range(xmin, xmax + 1).forEach(function (dx) {
    var ymin = _.max([-range, -dx - range]);
    var ymax = _.min([range, -dx + range]);

    _.range(ymin, ymax + 1).forEach(function (dy) {
      var hex;
      var x = cube.x + dx;
      var y = cube.y + dy;
      var z = cube.z - dx - dy;
      var h = cube.h;

      hex = _factory.create.from.cube([x, y, z, h]);
      results.push(hex);
    });
  });

  return results;
});

_.set(_range, 'from.cube.with.height', function (cube, range) {
  var results = [];
  var hmin = -range;
  var hmax = range;
  var horig;

  cube = _factory.create.from.cube(cube);
  horig = cube.h;

  _.range(hmin, hmax + 1).forEach(function (dh) {
    var dr = range - Math.abs(dh);
    var result;

    cube.h = horig + dh;
    result = _range.from.cube(cube, dr);
    results = results.concat(result);
  });

  return results;
});

_.set(_range, 'from.axial', function (axial, range) {
  var axial = _factory.create.from.axial(axial);
  var cube = _convert.from.axial.to.cube(axial);
  var results = _range.from.cube(cube, range);
  var output = [];

  results.forEach(function (result) {
    var converted = _convert.from.cube.to.axial(result);

    output.push(converted);
  });

  return output;
});

_.set(_range, 'from.axial.with.height', function (axial, range) {
  var axial = _factory.create.from.axial(axial);
  var cube = _convert.from.axial.to.cube(axial);
  var results = _range.from.cube.with.height(cube, range);
  var output = [];

  results.forEach(function (result) {
    var converted = _convert.from.cube.to.axial(result);

    output.push(converted);
  });

  return output;
});

module.exports = function (factory, convert) {
  _factory = factory;
  _convert = convert;

  return _range;
};
