var should = require('chai').should();
var sinon = require('sinon');
var _ = require('lodash');

var _nei = require('./../../app/neighbors.js');

var _factory = {};
var _convert = {};

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

var _arrays = [
  [3, 0, -3, 0],
  [3, 1, -4, 0],
  [2, 2, -4, 0],
  [1, 2, -3, 0],
  [1, 1, -2, 0],
  [2, 0, -2, 0],

  [3, 0, -3, 1],
  [3, 1, -4, 1],
  [2, 2, -4, 1],
  [1, 2, -3, 1],
  [1, 1, -2, 1],
  [2, 0, -2, 1],

  [3, 0, -3, 2],
  [3, 1, -4, 2],
  [2, 2, -4, 2],
  [1, 2, -3, 2],
  [1, 1, -2, 2],
  [2, 0, -2, 2]
];

var stubAxial = sinon.stub();
var stubCube = sinon.stub();

for (i = 0; i < _arrays.length; i++) {
  var hex = {};

  hex.q = _arrays[i][0];
  hex.r = _arrays[i][2];
  hex.x = _arrays[i][0];
  hex.y = _arrays[i][1];
  hex.z = _arrays[i][2];
  hex.h = _arrays[i][3];

  stubAxial.onCall(i).returns(hex);
  stubCube.onCall(i).returns(hex);
}

_.set(_factory, 'create.from.axial', sinon.stub().returns(_axial));
_.set(_convert, 'from.cube.to.axial', stubAxial);
_.set(_convert, 'from.axial.to.cube', stubCube);

_nei = _nei(_factory, _convert);

describe('neighbors.from.cube()', function () {
  it('should exist', function () {
    _nei.from.cube.should.exist;
  });

  it('should return an array of cube coordinate objects', function () {
    var outcome = _nei.from.cube(_cube);

    outcome.should.not.be.empty;

    _arrays.forEach(function (array, i) {
      outcome[i].should.have.property('x').which.eql(array[0]);
      outcome[i].should.have.property('y').which.eql(array[1]);
      outcome[i].should.have.property('z').which.eql(array[2]);
      outcome[i].should.have.property('h').which.eql(array[3]);
    });
  });
});

describe('neighbors.from.axial()', function () {
  it('should exist', function () {
    _nei.from.axial.should.exist;
  });

  it('should return an array of axial coordinate objects', function () {
    var outcome = _nei.from.axial(_axial);

    outcome.should.not.be.empty;

    _arrays.forEach(function (array, i) {
      outcome[i].should.have.property('q').which.eql(array[0]);
      outcome[i].should.have.property('r').which.eql(array[2]);
      outcome[i].should.have.property('h').which.eql(array[3]);
    });
  });
});
