var should = require('chai').should();

var factory = require('../../app/factory.js');

describe('factory', function () {
  it('should exist', function () {
    factory.should.exist;
  });
});

describe('factory.create', function () {
  it('should exist', function () {
    factory.create.should.exist;
  });
});

describe('factory.create.from', function () {
  it('should exist', function () {
    factory.create.from.should.exist;
  });
});

describe('factory.create.from.axial()', function () {
  it('should exist', function () {
    factory.create.from.axial.should.exist;
  });

  it('should throw if input is empty', function () {
    var fn = factory.create.from.axial.bind(factory);

    fn.should.throw();
  });

  it('should return a coordinate object with axial properties', function () {
    var hex = factory.create.from.axial([2, -3]);

    hex.should.have.property('q').which.eql(2);
    hex.should.have.property('r').which.eql(-3);
  });

  it('should support defining your own keys', function () {
    var keys = [1, 3];
    var input = [5, 2, 1, -3];
    var hex = factory.create.from.axial(input, keys);

    hex.should.have.property('q').which.eql(2);
    hex.should.have.property('r').which.eql(-3);
  });

  it('should throw if the input coordinates are not numbers', function () {
    var keys = [1, 3];
    var input = [5, false, 1, 'string'];
    var fn = factory.create.from.axial.bind(factory, input, keys);

    fn.should.throw();
  });

  it('should support input coordinate objects', function () {
    var keys = ['qCoord', 'rCoord'];
    var input = {
      'qCoord': 2,
      'rCoord': -3
    };
    var hex = factory.create.from.axial(input, keys);

    hex.should.have.property('q').which.eql(2);
    hex.should.have.property('r').which.eql(-3);
  });

  it('should throw if an input object is provided without keys', function () {
    var input = {
      'qCoord': 2,
      'rCoord': -3
    };
    var fn = factory.create.from.axial.bind(factory, input);

    fn.should.throw();
  });
});

describe('factory.create.from.axial().to', function () {
  it('should exist', function () {
    var hex = factory.create.from.axial([2, -3]);

    hex.to.should.exist;
  });
})

describe('factory.create.from.axial().to.array()', function () {
  it('should return an axial array', function () {
    var hex = factory.create.from.axial([2, -3]);
    var array = hex.to.array();

    array.should.eql([2, -3]);
  });
});

describe('factory.create.from.axial().to.cube()', function () {
  it('should return a cube coordinate object', function () {
    var hex = factory.create.from.axial([2, -3]);
    var cube = hex.to.cube();

    cube.should.have.property('x').which.eql(2);
    cube.should.have.property('y').which.eql(1);
    cube.should.have.property('z').which.eql(-3);
  });
});

describe('factory.create.from.cube()', function () {
  it('should exist', function () {
    factory.create.from.cube.should.exist;
  });

  it('should return a coordinate object with cube properties', function () {
    var hex = factory.create.from.cube([2, 1, -3]);

    hex.should.have.property('x').which.eql(2);
    hex.should.have.property('y').which.eql(1);
    hex.should.have.property('z').which.eql(-3);
  });

  it('should throw if input is empty', function () {
    var fn = factory.create.from.cube.bind(factory);

    fn.should.throw();
  });

  it('should throw if x + y + z != 0', function () {
    var fn = factory.create.from.cube.bind(factory [2, 2, 2]);

    fn.should.throw();
  });

  it('should support defining your own keys', function () {
    var keys = [1, 2, 3];
    var input = [5, 2, 1, -3];
    var hex = factory.create.from.cube(input, keys);

    hex.should.have.property('x').which.eql(2);
    hex.should.have.property('y').which.eql(1);
    hex.should.have.property('z').which.eql(-3);
  });

  it('should throw if the input coordinates are not numbers', function () {
    var keys = [1, 2, 3];
    var input = [5, false, 1, 'string'];
    var fn = factory.create.from.cube.bind(factory, input, keys);

    fn.should.throw();
  });

  it('should support input coordinate objects', function () {
    var keys = ['xCoord', 'yCoord', 'zCoord'];
    var input = {
      'xCoord': 2,
      'yCoord': 1,
      'zCoord': -3
    };
    var hex = factory.create.from.cube(input, keys);

    hex.should.have.property('x').which.eql(2);
    hex.should.have.property('y').which.eql(1);
    hex.should.have.property('z').which.eql(-3);
  });

  it('should throw if an input object is provided without keys', function () {
    var input = {
      'xCoord': 2,
      'yCoord': 1,
      'zCoord': -3
    };
    var fn = factory.create.from.cube.bind(factory, input);

    fn.should.throw();
  });
});

describe('factory.create.from.cube().to', function () {
  it('should exist', function () {
    factory.create.from.cube([2, 1, -3]).to.should.exist;
  });
});

describe('factory.create.from.cube().to.array()', function () {
  it('should exist', function () {
    factory.create.from.cube([2, 1, -3]).to.array.should.exist;
  });

  it('should return a cube array', function () {
    var hex = factory.create.from.cube([2, 1, -3]);
    var array = hex.to.array();

    array.should.eql([2, 1, -3]);
  });
});

describe('factory.create.from.cube().to.axial()', function () {
  it('should exist', function () {
    factory.create.from.cube([2, 1, -3]).to.axial.should.exist;
  });

  it('should should return an axial coordinate object', function () {
    var hex = factory.create.from.cube([2, 1, -3]);
    var axial = hex.to.axial();

    axial.should.have.property('q').which.eql(2);
    axial.should.have.property('r').which.eql(-3);
  });
});
