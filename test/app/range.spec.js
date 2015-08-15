var should = require('chai').should();
var sinon = require('sinon');
var _ = require('lodash');

var _range = require('./../../app/range.js');

var _Cube = function (coords) {
  if (_.isArray(coords)) {
    return {
      'x': coords[0],
      'y': coords[1],
      'z': coords[2],
      'h': coords[3]
    };
  } else {
    return coords;
  }
};

var _Axial = function (coords) {
  if (_.isArray(coords)) {
    return {
      'q': coords[0],
      'r': coords[1],
      'h': coords[2]
    };
  } else {
    return coords;
  }
};

var _coords = [
  [0, 0, 0, 0],

  [0, 0, 0, -1],
  [0, 0, 0, -2],
  [0, 0, 0, 1],
  [0, 0, 0, 2],

  [0, -1, 1, -1],
  [1, -1, 0, -1],
  [1, 0, -1, -1],
  [0, 1, -1, -1],
  [-1, 1, 0, -1],
  [-1, 0, 1, -1],
  [0, -1, 1, 0],
  [1, -1, 0, 0],
  [1, 0, -1, 0],
  [0, 1, -1, 0],
  [-1, 1, 0, 0],
  [-1, 0, 1, 0],
  [0, -1, 1, 1],
  [1, -1, 0, 1],
  [1, 0, -1, 1],
  [0, 1, -1, 1],
  [-1, 1, 0, 1],
  [-1, 0, 1, 1],

  [2, -2, 0, 0],
  [2, -1, -1, 0],
  [2, 0, -2, 0],
  [1, 1, -2, 0],
  [0, 2, -2, 0],
  [-1, 2, -1, 0],
  [-2, 2, 0, 0],
  [-2, 1, 1, 0],
  [-2, 0, 2, 0],
  [-1, -1, 2, 0],
  [0, -2, 2, 0],
  [1, -2, 1, 0]
];

var _hexes = [];

_coords.forEach(function (coord) {
  _hexes.push({
    'q': coord[0],
    'r': coord[2],
    'x': coord[0],
    'y': coord[1],
    'z': coord[2],
    'h': coord[3]
  });
});

describe('range.from.cube()', function () {
  it('should exist', function () {
    _range().from.cube.should.exist;
  });

  it('should return the array of hex objects', function () {
    var range;
    var factory = {};
    var start = [0, 0, 0, 0];
    var distance = 2;
    var results;

    _.set(factory, 'create.from.cube', _Cube);

    range = _range(factory);
    results = range.from.cube(start, distance);

    _.filter(_hexes, function (hex) {
      return hex.h === 0;
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

describe('range.from.cube.with.height()', function () {
  it('should exist', function () {
    _range().from.cube.with.height.should.exist;
  });

  it('should return the array of hex objects', function () {
    var range;
    var factory = {};
    var start = [0, 0, 0, 0];
    var distance = 2;
    var results;

    _.set(factory, 'create.from.cube', _Cube);

    range = _range(factory);
    results = range.from.cube.with.height(start, distance);

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
})

describe('range.from.axial()', function () {
  it('should exist', function () {
    _range().from.axial.should.exist;
  });

  it('should return the array of hex objects', function () {
    var range;
    var factory = {};
    var convert = {};
    var start = [0, 0, 0];
    var distance = 2;
    var results;

    _.set(factory, 'create.from.axial', _Axial);
    _.set(factory, 'create.from.cube', _Cube);

    _.set(convert, 'from.axial.to.cube', function (ax) {
      var cube = {};

      cube.x = ax.q;
      cube.y = -ax.q - ax.r;
      cube.z = ax.r;
      cube.h = ax.h;

      return cube;
    });

    _.set(convert, 'from.cube.to.axial', function (cube) {
      var ax = {};

      ax.q = cube.x;
      ax.r = cube.z;
      ax.h = cube.h;
      
      return ax;
    });

    range = _range(factory, convert);
    results = range.from.axial(start, distance);

    _.filter(_hexes, function (hex) {
      return hex.h === 0;
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

describe('range.from.axial.with.height()', function () {
  it('should exist', function () {
    _range().from.axial.with.height.should.exist;
  });

  it('should return the array of hex objects', function () {
    var range;
    var factory = {};
    var convert = {};
    var start = [0, 0, 0];
    var distance = 2;
    var results;

    _.set(factory, 'create.from.axial', _Axial);
    _.set(factory, 'create.from.cube', _Cube);

    _.set(convert, 'from.axial.to.cube', function (ax) {
      var cube = {};

      cube.x = ax.q;
      cube.y = -ax.q - ax.r;
      cube.z = ax.r;
      cube.h = ax.h;

      return cube;
    });

    _.set(convert, 'from.cube.to.axial', function (cube) {
      var ax = {};

      ax.q = cube.x;
      ax.r = cube.z;
      ax.h = cube.h;

      return ax;
    });

    range = _range(factory, convert);
    results = range.from.axial.with.height(start, distance);

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
