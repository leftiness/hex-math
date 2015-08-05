var should = require('chai').should();
var _ = require('lodash');

var hex = require('../../hex-math.js');

var cubeToAxial = _.get(hex, 'convert.from.cube.to.axial');
var axialToCube = _.get(hex, 'convert.from.axial.to.cube');

describe('from', function () {

  it('should exist', function () {
    hex.convert.from.should.exist;
  });

  describe('cube', function () {

    it('should exist', function () {
      hex.convert.from.cube.should.exist;
    });

    describe('to', function () {

      it('should exist', function () {
        hex.convert.from.cube.to.should.exist;
      });

      describe('axial', function () {

        it('should exist', function () {
          cubeToAxial.should.exist;
        });

        it('should throw if there aren\'t any coordinates', function () {
            var fn = cubeToAxial.bind(hex);

            fn.should.throw();
        });

        it('should return [2, -3]', function () {
          var cube = [2, 1, -3];
          var axial = cubeToAxial(cube);

          axial.should.eql([2, -3]);
        });

        it('should throw when x + y + z != 0', function () {
          var cube = [1, 2, 3];
          var fn = cubeToAxial.bind(hex, cube);

          fn.should.throw();
        });

        it('should support providing your own keys', function () {
          var cube = [-3, -2, -1, 0, 1, 2, 3];
          var keys = [5, 4, 0];
          var axial = cubeToAxial(cube, keys);

          axial.should.eql([2, -3]);
        });

        it('should throw when keys/values don\'t add up to 0', function () {
          var cube = [-3, -2, -1, 0, 1, 2, 3];
          var keys = [0, 1, 2];
          var fn = cubeToAxial.bind(hex, cube, keys);

          fn.should.throw();
        });

        it('should work with objects if keys are provided', function () {
          var cube = {
            'x': 2,
            'y': 1,
            'z': -3
          };
          var keys = ['x', 'y', 'z'];
          var axial = cubeToAxial(cube, keys);

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
          var fn = cubeToAxial.bind(hex, cube);

          fn.should.throw();
        });

        it('should throw w/ obj if keys/values don\'t sum to 0', function () {
          var cube = {
            'x': 2,
            'y': 10,
            'z': -3
          };
          var keys = ['x', 'y', 'z'];
          var fn = cubeToAxial.bind(hex, cube, keys);

          fn.should.throw();
        });

        it('should throw if object doesn\'t have the keys', function () {
          var cube = {
            'x': 2,
            'y': 1,
            'z': -3
          };
          var keys = ['x', 'hello', 'goodbye'];
          var fn = cubeToAxial.bind(hex, cube, keys);

          fn.should.throw();
        });

        it('should treat null keys as default', function () {
          var cube = [2, 1, -3];
          var axial = cubeToAxial(cube, null);

          axial.should.eql([2, -3]);
        });

        it('should treat undefined keys as default', function () {
          var cube = [2, 1, -3];
          var axial = cubeToAxial(cube, undefined);

          axial.should.eql([2, -3]);
        });

        it('should treat empty keys as default', function () {
          var cube = [2, 1, -3];
          var axial = cubeToAxial(cube, []);

          axial.should.eql([2, -3]);
        });

      });

    });

  });

  describe('axial', function () {

    it('should exist', function () {
      hex.convert.from.axial.should.exist;
    });

    describe('to', function () {

      it('should exist', function () {
        hex.convert.from.axial.to.should.exist;
      });

      describe('cube', function () {

        it('should exist', function () {
          axialToCube.should.exist;
        });

        it('should throw if there aren\'t any coordinates', function () {
          var cube = axialToCube.bind(hex);

          cube.should.throw();
        });

        it('should return an array of [2, 1, -3]', function () {
          var axial = [2, -3];
          var cube = axialToCube(axial);

          cube.should.eql([2, 1, -3]);
        });

        it('should support providing your own keys', function () {
          var axial = [-3, -2, -1, 0, 1, 2, 3];
          var keys = [5, 0];
          var cube = axialToCube(axial, keys);

          cube.should.eql([2, 1, -3]);
        });

        it('should work with objects if keys are provided', function () {
          var axial = {
            'q': 2,
            'r': -3
          };
          var keys = ['q', 'r'];
          var cube = axialToCube(axial, keys);

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
          var cube = axialToCube.bind(hex, axial);

          cube.should.throw();
        });

        it('should throw if object doesn\'t have the keys', function () {
          var axial = {
            'q': 2,
            'r': -3
          };
          var keys = ['hello', 'goodbye'];
          var cube = axialToCube.bind(hex, axial);

          cube.should.throw();
        });

        it('should treat null keys as default', function () {
          var axial = [2, -3];
          var cube = axialToCube(axial, null);

          cube.should.eql([2, 1, -3]);
        });

        it('should treat undefined keys as default', function () {
          var axial = [2, -3];
          var cube = axialToCube(axial, undefined);

          cube.should.eql([2, 1, -3]);
        });

        it('should treat empty keys as default', function () {
          var axial = [2, -3];
          var cube = axialToCube(axial, []);

          cube.should.eql([2, 1, -3]);
        });

      });

    });

  });

});
