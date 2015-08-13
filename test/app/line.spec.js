var should = require('chai').should();
var sinon = require('sinon');
var _ = require('lodash');

var _line = require('./../../app/line.js');

var _hex1 = {
  'q': 2,
  'r': -3,
  'x': 2,
  'y': 1,
  'z': -3,
  'h': 1
};

var _hex2 = _.clone(_hex1);
var _hex3 = _.clone(_hex1);
var _hex4 = _.clone(_hex1);

_hex2.q = 3;
_hex2.x = 3;
_hex2.y = 0;
_hex2.h = 2;

_hex3.q = 4;
_hex3.x = 4;
_hex3.y = -1;
_hex3.h = 4;

_hex4.q = 5;
_hex4.x = 5;
_hex4.y = -2;
_hex4.h = 6;

var _factory = {};
var _convert = {};
var _round = {};
var _distance = {};

var _stubRound = sinon.stub();

_stubRound.onCall(0).returns(_hex1);
_stubRound.onCall(1).returns(_hex2);
_stubRound.onCall(2).returns(_hex3);
_stubRound.onCall(3).returns(_hex4);

_stubRound.onCall(4).returns(_hex1);
_stubRound.onCall(5).returns(_hex2);
_stubRound.onCall(6).returns(_hex3);
_stubRound.onCall(7).returns(_hex4);

_.set(_factory, 'create.from.axial', sinon.stub().returnsArg(0));
_.set(_factory, 'create.from.cube', sinon.stub.returnsArg(0));
_.set(_convert, 'from.axial.to.cube', sinon.stub().returnsArg(0));
_.set(_distance, 'between.cube', sinon.stub().returns(3));
_.set(_round, 'cube', _stubRound);

_line = _line(_factory, _convert, _round, _distance);

describe('line.from.axial', function () {
  it('should exist', function () {
    _line.from.axial.should.exist;
  });

  it('should return the hexes in a line', function () {
    var results = _line.from.axial(_hex1, _hex4);

    results[0].should.have.property('q').which.eql(2);
    results[0].should.have.property('r').which.eql(-3);
    results[0].should.have.property('h').which.eql(1);

    results[1].should.have.property('q').which.eql(3);
    results[1].should.have.property('r').which.eql(-3);
    results[1].should.have.property('h').which.eql(2);

    results[2].should.have.property('q').which.eql(4);
    results[2].should.have.property('r').which.eql(-3);
    results[2].should.have.property('h').which.eql(4);

    results[3].should.have.property('q').which.eql(5);
    results[3].should.have.property('r').which.eql(-3);
    results[3].should.have.property('h').which.eql(6);
  });
});

describe('line.from.cube', function () {
  it('should exist', function () {
    _line.from.cube.should.exist;
  });

  it('should return the hexes in a line', function () {
    var results = _line.from.cube(_hex1, _hex4);

    results[0].should.have.property('x').which.eql(2);
    results[0].should.have.property('y').which.eql(1);
    results[0].should.have.property('z').which.eql(-3);
    results[0].should.have.property('h').which.eql(1);

    results[1].should.have.property('q').which.eql(3);
    results[1].should.have.property('y').which.eql(0);
    results[1].should.have.property('r').which.eql(-3);
    results[1].should.have.property('h').which.eql(2);

    results[2].should.have.property('q').which.eql(4);
    results[2].should.have.property('y').which.eql(-1);
    results[2].should.have.property('r').which.eql(-3);
    results[2].should.have.property('h').which.eql(4);

    results[3].should.have.property('q').which.eql(5);
    results[3].should.have.property('y').which.eql(-2);
    results[3].should.have.property('r').which.eql(-3);
    results[3].should.have.property('h').which.eql(6);
  });
});
