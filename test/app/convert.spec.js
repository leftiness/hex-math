var should = require('chai').should();
var sinon = require('sinon');
var _ = require('lodash');

var _convert = require('./../../app/convert.js');

var _factory = {};

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

_.set(_factory, 'create.from.axial', sinon.stub().returns(_axial));

_.set(_factory, 'create.from.cube', sinon.stub().returns(_cube));

_convert = _convert(_factory);

describe('convert.from.cube.to.axial()', function () {
  it('should exist', function () {
    _convert.from.cube.to.axial.should.exist;
  });

  it('should return an axial hex object', function () {
    var cube = [2, 1, -3, 1];
    var axial = _convert.from.cube.to.axial(cube);

    axial.should.have.property('q').which.eql(2);
    axial.should.have.property('r').which.eql(-3);
    axial.should.have.property('h').which.eql(1);
  });

  it('should work with objects', function () {
    var axial = _convert.from.cube.to.axial(_cube);

    axial.should.have.property('q').which.eql(2);
    axial.should.have.property('r').which.eql(-3);
    axial.should.have.property('h').which.eql(1);
  });
});

describe('convert.from.axial.to.cube()', function () {
  it('should exist', function () {
    _convert.from.axial.to.cube.should.exist;
  });

  it('should return a cube hex object', function () {
    var axial = [2, -3, 1];
    var cube = _convert.from.axial.to.cube(axial);

    cube.should.have.property('x').which.eql(2);
    cube.should.have.property('y').which.eql(1);
    cube.should.have.property('z').which.eql(-3);
    cube.should.have.property('h').which.eql(1);
  });

  it('should work with objects', function () {
    var cube = _convert.from.axial.to.cube(_axial);

    cube.should.have.property('x').which.eql(2);
    cube.should.have.property('y').which.eql(1);
    cube.should.have.property('z').which.eql(-3);
    cube.should.have.property('h').which.eql(1);
  });
});
