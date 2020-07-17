const {aloesLightEncoder} = require('./lib/encoder');
const {aloesLightDecoder} = require('./lib/decoder');
const {aloesLightPatternDetector} = require('./lib/detector');
const version = require('../package.json').version;

module.exports = {
  version,
  aloesLightEncoder,
  aloesLightDecoder,
  aloesLightPatternDetector,
};
