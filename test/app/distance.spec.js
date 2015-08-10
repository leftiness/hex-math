var should = require('chai').should();
var sinon = require('sinon');
var _ = require('lodash');

var _distance = require('./../../app/distance.js');

var _factory = {};
var _convert = {};

var _axial1 = {
  'q': 2,
  'r': -3,
  'h': 1
};

var _axial2 = {
  'q': 2,
  'r': -5,
  'h': 2
};

var _cube1 = {
  'x': 2,
  'y': 1,
  'z': -3,
  'h': 1
};

var _cube2 = {
  'x': 2,
  'y': 3,
  'z': -5,
  'h': 2
};

var _stubFacAx = sinon.stub();
var _stubFacCube = sinon.stub();
var _stubConAx = sinon.stub();

_stubFacAx.returnsArg(0);
_stubFacCube.returnsArg(0);
_stubConAx.withArgs(_axial1).returns(_cube1);
_stubConAx.withArgs(_axial2).returns(_cube2);

_.set(_factory, 'create.from.axial', _stubFacAx);
_.set(_factory, 'create.from.cube', _stubFacCube);
_.set(_convert, 'from.axial.to.cube', _stubConAx);

_distance = _distance(_factory, _convert);

describe('distance.between.axial()', function () {
  it('should exist', function() {
    _distance.between.axial.should.exist;
  });

  it('should return the distance as a number', function () {
    var distance = _distance.between.axial(_axial1, _axial2);

    distance.should.eql(3);
  });
});

describe('distance.between.cube()', function () {
  it('should exist', function () {
    _distance.between.cube.should.exist;
  });

  it('should return the distance as a number', function () {
    var distance = _distance.between.cube(_cube1, _cube2);

    distance.should.eql(3);
  })
})
