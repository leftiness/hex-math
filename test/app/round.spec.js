var should = require('chai').should();
var sinon = require('sinon');
var _ = require('lodash');

var _round = require('./../../app/round.js');

var _factory = {};
var _convert = {};

var _axialFloat = {
  'q': 2.8,
  'r': -3.8,
  'h': 1.8
};

var _axialRounded = {
  'q': 3,
  'r': -4,
  'h': 1
};

var _cubeFloat = {
  'x': 2.8,
  'y': 1,
  'z': -3.8,
  'h': 1.8
};

var _cubeRounded = {
  'x': 3,
  'y': 1,
  'z': -4,
  'h': 1
};

var _stubAxCon = sinon.stub().withArgs(_axialFloat).returns(_cubeFloat);
var _stubCubeCon = sinon.stub().withArgs(_cubeRounded).returns(_axialRounded);

_.set(_factory, 'create.from.cube', sinon.stub().returns(_cubeRounded));
_.set(_convert, 'from.axial.to.cube', _stubAxCon);
_.set(_convert, 'from.cube.to.axial', _stubCubeCon);

_round = _round(_factory, _convert);

describe('round.axial', function () {
  it('should exist', function () {
    _round.axial.should.exist;
  });

  it('should return an axial coordinate object', function () {
    var axial = _round.axial(_axialFloat);

    axial.should.have.property('q').which.eql(3);
    axial.should.have.property('r').which.eql(-4);
    axial.should.have.property('h').which.eql(1);
  });
});

describe('round.cube', function () {
  it('should exist', function () {
    _round.cube.should.exist;
  });

  it('should return a cube coordinate object', function () {
    var cube = _round.cube(_cubeFloat);

    cube.should.have.property('x').which.eql(3);
    cube.should.have.property('y').which.eql(1);
    cube.should.have.property('z').which.eql(-4);
    cube.should.have.property('h').which.eql(1);
  });
});
