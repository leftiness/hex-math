var math = require('../math.js');
var should = require('chai').should();

describe('math', function () {

  it('should exist', function () {
      math.should.exist;
  });

  describe('#convertCubeToAxial', function () {
    it('should return an array of [x, z]', function () {
      var x = 2;
      var y = 1;
      var z = -3;

      var cube = [x, y, z];
      var axial = math.convertCubeToAxial(cube);

      axial.should.eql([x, z]);
    });

    it('should throw when given invalid arguments', function () {
      var x = 'hello';
      var y = 5;
      var z = false;

      var cube = [x, y, z];
      var axial = math.convertCubeToAxial.bind(math, cube);

      axial.should.throw();
    });
  });

  describe('#convertAxialToCube', function () {
    it('should return an array of [q, (-q - r), r]', function () {
      var q = 2;
      var r = -3;

      var axial = [q, r];
      var cube = math.convertAxialToCube(axial);

      cube.should.eql([q, (-q - r), r]);
    });

    it('should throw when given invalid arguments', function () {
      var q = 'hello';
      var r = true;

      var axial = [q, r];
      var cube = math.convertAxialToCube.bind(math, axial);

      cube.should.throw();
    });
  });

});
