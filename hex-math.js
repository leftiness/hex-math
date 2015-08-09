var hex = {}

var factory = require('./app/factory.js');
var convert = require('./app/convert.js');
var neighbors = require('./app/neighbors.js');

hex.factory = factory;
hex.convert = convert(factory);
hex.neighbors = neighbors;

module.exports = hex;
