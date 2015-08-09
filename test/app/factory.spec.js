var should = require('chai').should();

var _factory = require('../../app/factory.js');

describe('factory.create.from.axial()', function () {
  it('should exist', function () {
    _factory.create.from.axial.should.exist;
  });

  it('should throw if input is empty', function () {
    var fn = _factory.create.from.axial.bind(_factory);

    fn.should.throw();
  });

  it('should return a coordinate object with axial properties', function () {
    var hex = _factory.create.from.axial([2, -3]);

    hex.should.have.property('q').which.eql(2);
    hex.should.have.property('r').which.eql(-3);
  });

  it('should throw if the input coordinates are not numbers', function () {
    var input = [5, false, 1, 'string'];
    var fn = _factory.create.from.axial.bind(_factory, input);

    fn.should.throw();
  });

  it('should support input coordinate objects', function () {
    var input = {
      'q': 2,
      'r': -3
    };
    var hex = _factory.create.from.axial(input);

    hex.should.have.property('q').which.eql(2);
    hex.should.have.property('r').which.eql(-3);
  });
});

describe('factory.create.from.axial().to.array()', function () {
  it('should exist', function () {
    var hex = _factory.create.from.axial([2, -3]);

    hex.to.array.should.exist;
  });

  it('should return an axial array', function () {
    var hex = _factory.create.from.axial([2, -3]);
    var array = hex.to.array();

    array.should.eql([2, -3]);
  });
});

describe('factory.create.from.cube()', function () {
  it('should exist', function () {
    _factory.create.from.cube.should.exist;
  });

  it('should return a coordinate object with cube properties', function () {
    var hex = _factory.create.from.cube([2, 1, -3]);

    hex.should.have.property('x').which.eql(2);
    hex.should.have.property('y').which.eql(1);
    hex.should.have.property('z').which.eql(-3);
  });

  it('should throw if input is empty', function () {
    var fn = _factory.create.from.cube.bind(_factory);

    fn.should.throw();
  });

  it('should throw if x + y + z != 0', function () {
    var fn = _factory.create.from.cube.bind(_factory [2, 2, 2]);

    fn.should.throw();
  });

  it('should throw if the input coordinates are not numbers', function () {
    var input = [5, false, 1, 'string'];
    var fn = _factory.create.from.cube.bind(_factory, input);

    fn.should.throw();
  });

  it('should support input coordinate objects', function () {
    var input = {
      'x': 2,
      'y': 1,
      'z': -3
    };
    var hex = _factory.create.from.cube(input);

    hex.should.have.property('x').which.eql(2);
    hex.should.have.property('y').which.eql(1);
    hex.should.have.property('z').which.eql(-3);
  });
});

describe('factory.create.from.cube().to.array()', function () {
  it('should exist', function () {
    _factory.create.from.cube([2, 1, -3]).to.array.should.exist;
  });

  it('should return a cube array', function () {
    var hex = _factory.create.from.cube([2, 1, -3]);
    var array = hex.to.array();

    array.should.eql([2, 1, -3]);
  });
});
