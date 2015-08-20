var should = require('chai').should();
var sinon = require('sinon');
var _ = require('lodash');

var _nei = require('./../../app/neighbors.js');

var _axial = {
  'q': 2,
  'r': -3,
  'h': 1
};

var _cube = {
  'x': 2,
  'y': 1,
  'z': -3,
  'h': 1
};

var _Hex = function (coords) {
  if (_.isArray(coords)) {
      var output = {};

      output['q'] = coords[0];
      output['r'] = coords.length === 3 ? coords[1] : coords[2];
      output['x'] = coords[0];
      output['z'] = coords.length === 3 ? coords[1] : coords[2];
      output['y'] = -output['x'] - output['z'];
      output['h'] = coords.length === 3 ? coords[2] : coords[3];

      return output;
  } else {
    coords.x = coords.x || coords.q;
    coords.z = coords.z || coords.r;
    coords.y = -coords.x - coords.z;
    coords.q = coords.q || coords.x;
    coords.r = coords.r || coords.z;

    return coords;
  }
};

var _arrays = [
  [2, 1, -3, 0],

  [3, 0, -3, 1],
  [3, 1, -4, 1],
  [2, 2, -4, 1],
  [1, 2, -3, 1],
  [1, 1, -2, 1],
  [2, 0, -2, 1],

  [2, 1, -3, 2]
];

var _hexes = [];

_arrays.forEach(function (ar) {
  _hexes.push(_Hex(ar));
});

describe('neighbors.from.cube()', function () {
  it('should exist', function () {
    _nei().from.cube.should.exist;
  });

  it('should return the array of hexes', function () {
    var factory = {};
    var convert = {};
    var nei;
    var results;

    _.set(convert, 'from.cube.to.axial', _Hex);
    _.set(convert, 'from.axial.to.cube', _Hex);

    _.set(factory, 'create.from.axial', _Hex);
    _.set(factory, 'create.from.cube', _Hex);

    nei = _nei(factory, convert);

    results = nei.from.cube(_cube);

    _.filter(_hexes, function (hex) {
      return hex.h === 1;
    }).forEach(function (hex) {
      var filter = _.filter(results, function (result) {
        var x = result.x === hex.x;
        var y = result.y === hex.y;
        var z = result.z === hex.z;
        var h = result.h === hex.h;

        return _.every([x, y, z, h]);
      });

      hex.should.have.property('x').which.eql(_.get(filter, '[0].x'));
      hex.should.have.property('y').which.eql(_.get(filter, '[0].y'));
      hex.should.have.property('z').which.eql(_.get(filter, '[0].z'));
      hex.should.have.property('h').which.eql(_.get(filter, '[0].h'));
    });
  });
});

describe('neighbors.from.cube.with.height()', function () {
  it('should exist', function () {
    _nei().from.cube.with.height.should.exist;
  });

  it('should return the array of hexes', function () {
    var factory = {};
    var convert = {};
    var nei;
    var results;

    _.set(convert, 'from.cube.to.axial', _Hex);
    _.set(convert, 'from.axial.to.cube', _Hex);

    _.set(factory, 'create.from.axial', _Hex);
    _.set(factory, 'create.from.cube', _Hex);

    nei = _nei(factory, convert);

    results = nei.from.cube.with.height(_cube);

    _hexes.forEach(function (hex) {
      var filter = _.filter(results, function (result) {
        var x = result.x === hex.x;
        var y = result.y === hex.y;
        var z = result.z === hex.z;
        var h = result.h === hex.h;

        return _.every([x, y, z, h]);
      });

      hex.should.have.property('x').which.eql(_.get(filter, '[0].x'));
      hex.should.have.property('y').which.eql(_.get(filter, '[0].y'));
      hex.should.have.property('z').which.eql(_.get(filter, '[0].z'));
      hex.should.have.property('h').which.eql(_.get(filter, '[0].h'));
    });
  });
});

describe('neighbors.from.axial()', function () {
  it('should exist', function () {
    _nei().from.axial.should.exist;
  });

  it('should return the array of hexes', function () {
    var factory = {};
    var convert = {};
    var nei;
    var results;

    _.set(convert, 'from.cube.to.axial', _Hex);
    _.set(convert, 'from.axial.to.cube', _Hex);

    _.set(factory, 'create.from.axial', _Hex);
    _.set(factory, 'create.from.cube', _Hex);

    nei = _nei(factory, convert);

    results = nei.from.axial(_axial);

    _.filter(_hexes, function (hex) {
      return hex.h === 1;
    }).forEach(function (hex) {
      var filter = _.filter(results, function (result) {
        var q = result.q === hex.q;
        var r = result.r === hex.r;
        var h = result.h === hex.h;

        return _.every([q, r, h]);
      });

      hex.should.have.property('q').which.eql(_.get(filter, '[0].q'));
      hex.should.have.property('r').which.eql(_.get(filter, '[0].r'));
      hex.should.have.property('h').which.eql(_.get(filter, '[0].h'));
    });
  });
});

describe('neighbors.from.axial.with.height()', function () {
  it('should exist', function () {
    _nei().from.axial.with.height.should.exist;
  });

  it('should return the array of hexes', function () {
    var factory = {};
    var convert = {};
    var nei;
    var results;

    _.set(convert, 'from.cube.to.axial', _Hex);
    _.set(convert, 'from.axial.to.cube', _Hex);

    _.set(factory, 'create.from.axial', _Hex);
    _.set(factory, 'create.from.cube', _Hex);

    nei = _nei(factory, convert);

    results = nei.from.axial.with.height(_axial);

    _hexes.forEach(function (hex) {
      var filter = _.filter(results, function (result) {
        var q = result.q === hex.q;
        var r = result.r === hex.r;
        var h = result.h === hex.h;

        return _.every([q, r, h]);
      });

      hex.should.have.property('q').which.eql(_.get(filter, '[0].q'));
      hex.should.have.property('r').which.eql(_.get(filter, '[0].r'));
      hex.should.have.property('h').which.eql(_.get(filter, '[0].h'));
    });
  });
});
