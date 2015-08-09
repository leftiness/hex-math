var should = require('chai').should();
var sinon = require('sinon');
var _ = require('lodash');

var convert = require('./../../app/convert.js');

var factory = {};

_.set(factory, 'create.from.axial', sinon.stub().returns({
  'q': 2,
  'r': -3
}));

_.set(factory, 'create.from.cube', sinon.stub().returns({
  'x': 2,
  'y': 1,
  'z': -3
}));

convert = convert(factory);

describe('convert.from.cube.to.axial()', function () {
  it('should exist', function () {
    convert.from.cube.to.axial.should.exist;
  });

  it('should return an axial hex object', function () {
    var cube = [2, 1, -3];
    var axial = convert.from.cube.to.axial(cube);

    axial.should.have.property('q').which.eql(2);
    axial.should.have.property('r').which.eql(-3);
  });

  it('should support providing your own keys', function () {
    var cube = [-3, -2, -1, 0, 1, 2, 3];
    var keys = [5, 4, 0];
    var axial = convert.from.cube.to.axial(cube, keys);

    axial.should.have.property('q').which.eql(2);
    axial.should.have.property('r').which.eql(-3);
  });

  it('should work with objects if keys are provided', function () {
    var cube = {
      'x': 2,
      'y': 1,
      'z': -3
    }
    var keys = ['x', 'y', 'z'];
    var axial = convert.from.cube.to.axial(cube, keys);

    axial.should.have.property('q').which.eql(2);
    axial.should.have.property('r').which.eql(-3);
  });
});

describe('convert.from.axial.to.cube()', function () {
  it('should exist', function () {
    convert.from.axial.to.cube.should.exist;
  });

  it('should return a cube hex object', function () {
    var axial = [2, -3];
    var cube = convert.from.axial.to.cube(axial);

    cube.should.have.property('x').which.eql(2);
    cube.should.have.property('y').which.eql(1);
    cube.should.have.property('z').which.eql(-3);
  });

  it('should support providing your own keys', function () {
    var axial = [-3, -2, -1, 0, 1, 2, 3];
    var keys = [5, 0];
    var cube = convert.from.axial.to.cube(axial, keys);

    cube.should.have.property('x').which.eql(2);
    cube.should.have.property('y').which.eql(1);
    cube.should.have.property('z').which.eql(-3);
  });

  it('should work with objects if keys are provided', function () {
    var axial = {
      'q': 2,
      'r': -3
    }
    var keys = ['q', 'r'];
    var cube = convert.from.axial.to.cube(axial, keys);

    cube.should.have.property('x').which.eql(2);
    cube.should.have.property('y').which.eql(1);
    cube.should.have.property('z').which.eql(-3);
  });
});
