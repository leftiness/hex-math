var should = require('chai').should();

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
    var axial = _factory.create.from.axial([2, -3, 1]);

    axial.should.have.property('q').which.eql(2);
    axial.should.have.property('r').which.eql(-3);
    axial.should.have.property('h').which.eql(1);
  });

  it('should throw if the input coordinates are not numbers', function () {
    var input = [5, false, 1, 'string'];
    var fn = _factory.create.from.axial.bind(_factory, input);

    fn.should.throw();
  });

  it('should support input coordinate objects', function () {
    var axial = _factory.create.from.axial(_axial);

    axial.should.have.property('q').which.eql(2);
    axial.should.have.property('r').which.eql(-3);
    axial.should.have.property('h').which.eql(1);
  });
});

describe('factory.create.from.axial().to.array()', function () {
  it('should exist', function () {
    var axial = _factory.create.from.axial([2, -3, 1]);

    axial.to.array.should.exist;
  });

  it('should return an axial array', function () {
    var axial = _factory.create.from.axial([2, -3, 1]);
    var array = axial.to.array();

    array.should.eql([2, -3, 1]);
  });
});

describe('factory.create.from.cube()', function () {
  it('should exist', function () {
    _factory.create.from.cube.should.exist;
  });

  it('should return a coordinate object with cube properties', function () {
    var cube = _factory.create.from.cube([2, 1, -3, 1]);

    cube.should.have.property('x').which.eql(2);
    cube.should.have.property('y').which.eql(1);
    cube.should.have.property('z').which.eql(-3);
    cube.should.have.property('h').which.eql(1);
  });

  it('should throw if input is empty', function () {
    var fn = _factory.create.from.cube.bind(_factory);

    fn.should.throw();
  });

  it('should throw if x + y + z != 0', function () {
    var fn = _factory.create.from.cube.bind(_factory, [2, 2, 2, 2]);

    fn.should.throw();
  });

  it('should throw if the input coordinates are not numbers', function () {
    var input = [5, false, 1, 'string'];
    var fn = _factory.create.from.cube.bind(_factory, input);

    fn.should.throw();
  });

  it('should support input coordinate objects', function () {
    var cube = _factory.create.from.cube(_cube);

    cube.should.have.property('x').which.eql(2);
    cube.should.have.property('y').which.eql(1);
    cube.should.have.property('z').which.eql(-3);
    cube.should.have.property('h').which.eql(1);
  });
});

describe('factory.create.from.cube().to.array()', function () {
  it('should exist', function () {
    _factory.create.from.cube([2, 1, -3, 1]).to.array.should.exist;
  });

  it('should return a cube array', function () {
    var cube = _factory.create.from.cube([2, 1, -3, 1]);
    var array = cube.to.array();

    array.should.eql([2, 1, -3, 1]);
  });
});
