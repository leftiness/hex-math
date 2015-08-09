var _hex = {}

var _factory = require('./app/factory.js');
var _convert = require('./app/convert.js');
var _neighbors = require('./app/neighbors.js');

_hex.factory = _factory;
_hex.convert = _convert(_factory);
_hex.neighbors = _neighbors(_factory, _convert);

module.exports = _hex;
