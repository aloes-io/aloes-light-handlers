import mqttPattern from 'mqtt-pattern';
import logger from 'aloes-logger';
import protocolRef from './common';

/**
 * Convert incoming Aloes Client data to AloesLight protocol
 * @method aloesLightEncoder
 * @param {object} packet - Sensor instance.
 * @param {object} protocol - Protocol paramters ( coming from patternDetector ).
 */
const aloesLightEncoder = (instance, protocol) => {
  try {
    if (
      instance &&
      instance.messageProtocol &&
      instance.messageProtocol.toLowerCase() === 'aloeslight'
    ) {
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
    }
    throw new Error('Wrong protocol input');
  } catch (error) {
    logger(4, 'aloes-light-handlers', 'encoder:err', error);
    throw error;
  }
};

module.exports = {
  aloesLightEncoder,
};
