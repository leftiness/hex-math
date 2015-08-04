var hm = require('../hex-math.js');
var should = require('chai').should();

describe('hm', function () {

  it('should exist', function () {
      hm.should.exist;
  });

  describe('#convertCubeToAxial', function () {

    it('should throw if there aren\'t any coordinates', function () {
        var axial = hm.convertCubeToAxial.bind(hm);

        axial.should.throw();
    });

    it('should return [2, -3]', function () {
      var cube = [2, 1, -3];
      var axial = hm.convertCubeToAxial(cube);

      axial.should.eql([2, -3]);
    });

    it('should throw when x + y + z != 0', function () {
      var cube = [1, 2, 3];
      var axial = hm.convertCubeToAxial.bind(hm, cube);

      axial.should.throw();
    });

    it('should support providing your own keys', function () {
      var cube = [-3, -2, -1, 0, 1, 2, 3];
      var keys = [5, 4, 0];
      var axial = hm.convertCubeToAxial(cube, keys);

      axial.should.eql([2, -3]);
    });

    it('should throw when the keys/values don\'t add up to 0', function () {
      var cube = [-3, -2, -1, 0, 1, 2, 3];
      var keys = [0, 1, 2];
      var axial = hm.convertCubeToAxial.bind(hm, cube, keys);

      axial.should.throw();
    });

    it('should work with objects if keys are provided', function () {
      var cube = {
        'x': 2,
        'y': 1,
        'z': -3
      };
      var keys = ['x', 'y', 'z'];
      var axial = hm.convertCubeToAxial(cube, keys);

      axial.should.eql({
        'q': 2,
        'r': -3
      });
    });

    it('should expect an array if no keys are provided', function () {
      var cube = {
        'x': 2,
        'y': 1,
        'z': -3
      };
      var axial = hm.convertCubeToAxial.bind(hm, cube);

      axial.should.throw();
    });

    it('should throw with obj if keys/values don\'t add up to 0', function () {
      var cube = {
        'x': 2,
        'y': 10,
        'z': -3
      };
      var keys = ['x', 'y', 'z'];
      var axial = hm.convertCubeToAxial.bind(hm, cube, keys);

      axial.should.throw();
    });

    it('should throw if object doesn\'t have the keys', function () {
      var cube = {
        'x': 2,
        'y': 1,
        'z': -3
      };
      var keys = ['x', 'hello', 'goodbye'];
      var axial = hm.convertCubeToAxial.bind(hm, cube, keys);

      axial.should.throw();
    });

    it('should treat null keys as default', function () {
      var cube = [2, 1, -3];
      var axial = hm.convertCubeToAxial(cube, null);

      axial.should.eql([2, -3]);
    });

    it('should treat undefined keys as default', function () {
      var cube = [2, 1, -3];
      var axial = hm.convertCubeToAxial(cube, undefined);

      axial.should.eql([2, -3]);
    });

    it('should treat empty keys as default', function () {
      var cube = [2, 1, -3];
      var axial = hm.convertCubeToAxial(cube, []);

      axial.should.eql([2, -3]);
    });

  });

  describe('#convertAxialToCube', function () {

    it('should throw if there aren\'t any coordinates', function () {
      var cube = hm.convertAxialToCube.bind(hm);

      cube.should.throw();
    });

    it('should return an array of [2, 1, -3]', function () {
      var axial = [2, -3];
      var cube = hm.convertAxialToCube(axial);

      cube.should.eql([2, 1, -3]);
    });

    it('should support providing your own keys', function () {
      var axial = [-3, -2, -1, 0, 1, 2, 3];
      var keys = [5, 0];
      var cube = hm.convertAxialToCube(axial, keys);

      cube.should.eql([2, 1, -3]);
    });

    it('should work with objects if keys are provided', function () {
      var axial = {
        'q': 2,
        'r': -3
      };
      var keys = ['q', 'r'];
      var cube = hm.convertAxialToCube(axial, keys);

      cube.should.eql({
        'x': 2,
        'y': 1,
        'z': -3
      });
    });

    it('should expect an array if no keys are provided', function () {
      var axial = {
        'q': 2,
        'r': -3
      };
      var cube = hm.convertAxialToCube.bind(hm, axial);

      cube.should.throw();
    });

    it('should throw if object doesn\'t have the keys', function () {
      var axial = {
        'q': 2,
        'r': -3
      };
      var keys = ['hello', 'goodbye'];
      var cube = hm.convertAxialToCube.bind(hm, axial);

      cube.should.throw();
    });

    it('should treat null keys as default', function () {
      var axial = [2, -3];
      var cube = hm.convertAxialToCube(axial, null);

      cube.should.eql([2, 1, -3]);
    });

    it('should treat undefined keys as default', function () {
      var axial = [2, -3];
      var cube = hm.convertAxialToCube(axial, undefined);

      cube.should.eql([2, 1, -3]);
    });

    it('should treat empty keys as default', function () {
      var axial = [2, -3];
      var cube = hm.convertAxialToCube(axial, []);

      cube.should.eql([2, 1, -3]);
    });
  });

});
