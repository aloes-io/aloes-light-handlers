const mqttPattern = require('mqtt-pattern');
const logger = require('aloes-logger');
const protocolRef = require('./common');

/**
 * Convert incoming Aloes Client data to AloesLight protocol
 * @method aloesLightEncoder
 * @param {object} instance - Sensor instance.
 * @param {object} protocol - Protocol parameters ( coming from patternDetector ).
 * @returns {object | null} packet
 * @throws {Error} 'Wrong protocol input'
 */
const aloesLightEncoder = (instance, protocol) => {
  if (
    !instance ||
    !instance.messageProtocol ||
    instance.messageProtocol.toLowerCase() !== 'aloeslight'
  ) {
    throw new Error('Wrong protocol input');
  }
  try {
    let topic = null;
    const params = {
      prefixedDevEui: `${instance.devEui}${instance.inPrefix}`,
      omaObjectId: instance.type,
      sensorId: instance.nativeSensorId,
      nodeId: instance.nativeNodeId,
      omaResourceId: instance.resource,
    };
    logger(4, 'aloes-light-handlers', 'encoder:req', params);
    if (protocol.method === 'HEAD') {
      params.method = 0;
      topic = mqttPattern.fill(protocolRef.pattern, params);
    } else if (protocol.method === 'POST' || protocol.method === 'PUT') {
      params.method = 1;
      topic = mqttPattern.fill(protocolRef.pattern, params);
    } else if (protocol.method === 'GET') {
      params.method = 2;
      topic = mqttPattern.fill(protocolRef.pattern, params);
    }
    if (!topic || topic === null) throw new Error('Method not supported');
    logger(4, 'aloes-light-handlers', 'encoder:res', topic);
    return {topic, payload: instance.value};
  } catch (error) {
    logger(4, 'aloes-light-handlers', 'encoder:err', error);
    return null;
  }
};

module.exports = {
  aloesLightEncoder,
};
