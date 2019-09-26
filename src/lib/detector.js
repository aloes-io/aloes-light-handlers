import mqttPattern from 'mqtt-pattern';
import {omaObjects} from 'oma-json';
import logger from 'aloes-logger';
import protocolRef from './common';

/**
 * Check incoming MQTT packet against AloesLight API
 * @method aloesLightPatternDetector
 * @param {object} packet - The MQTT packet.
 * @returns {object} found pattern.name and pattern.params
 */
const aloesLightPatternDetector = packet => {
  try {
    const pattern = {name: 'empty', params: {}};
    if (mqttPattern.matches(protocolRef.pattern, packet.topic)) {
      logger(4, 'aloes-light-handlers', 'patternDetector:res', 'reading API ...');
      const aloesLightProtocol = mqttPattern.exec(
        protocolRef.pattern,
        packet.topic,
      );
      logger(
        3,
        'aloes-light-handlers',
        'patternDetector:res',
        aloesLightProtocol,
      );
      const methodExists = protocolRef.validators.methods.some(
        meth => meth === Number(aloesLightProtocol.method),
      );
      const omaObjectIdExists = omaObjects.some(
        object => object.value === Number(aloesLightProtocol.omaObjectId),
      );
      logger(4, 'aloes-light-handlers', 'patternDetector:res', {
        methodExists,
        omaObjectIdExists,
      });
      if (methodExists && omaObjectIdExists) {
        pattern.name = 'aloesLight';
        pattern.params = aloesLightProtocol;
        return pattern;
      }
      return pattern
    }
    return pattern;
  } catch (error) {
    let err = error;
    if (!err) {
      err = new Error('Error: invalid packet');
    }
    logger(2, 'aloes-light-handlers', 'patternDetector:err', err);
    throw err;
  }
};

module.exports = {
  aloesLightPatternDetector,
};
