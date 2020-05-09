const mqttPattern = require('mqtt-pattern');
const {omaObjects, omaResources, omaViews} = require('oma-json');
const logger = require('aloes-logger');
const protocolRef = require('./common');

/**
 * Find corresponding [OMA Object]{@link /aloeslight/#omaobjects} following a AloesLight presentation message
 * @method aloesLightToOmaObject
 * @param {object} msg - Decoded MQTT packet.
 * @returns {object | null} composed instance
 */
const aloesLightToOmaObject = (msg) => {
  try {
    logger(4, 'aloes-light-handlers', 'toOmaObject:req', msg);
    if (!msg || msg == null || !msg.type || msg.type === null) {
      throw new Error('Wrong instance input');
    }
    const foundOmaObject = omaObjects.find((object) => object.value === Number(msg.type));
    if (!foundOmaObject) throw new Error('no OMA Object found');
    const foundOmaViews = omaViews.find((view) => view.value === Number(msg.type));
    const decoded = {
      ...msg,
      resources: foundOmaObject.resources,
      name: foundOmaObject.name,
      icons: foundOmaViews.icons,
      colors: foundOmaViews.resources,
      frameCounter: 0,
    };
    logger(4, 'aloes-light-handlers', 'toOmaObject:res', decoded);
    return decoded;
  } catch (error) {
    logger(2, 'aloes-light-handlers', 'toOmaObject:err', error);
    return null;
  }
};

/**
 * Find corresponding [OMA Resources]{@link /aloeslight/#omaresources} to incoming AloesLight datas
 * @method aloesLightToOmaResources
 * @param {object} msg - Decoded MQTT packet.
 * @returns {object | null} composed instance
 */
const aloesLightToOmaResources = (msg) => {
  try {
    logger(4, 'aloes-light-handlers', 'toOmaResources:req', msg);
    if (!msg || msg === null || !msg.type || msg.type === null || !msg.resource) {
      throw new Error('Wrong instance input');
    }
    const aloesResource = omaResources.find((resource) => resource.value === Number(msg.resource));
    if (!aloesResource) throw new Error('no OMA Object found');

    const decoded = {
      ...msg,
    };
    // todo adapt decoded.value base on recieved packet.payload type
    // if (msg.resource !== 5910) decoded.value = msg.value.toString();
    logger(4, 'aloes-light-handlers', 'toOmaResources:res', decoded);
    return decoded;
  } catch (error) {
    logger(2, 'aloes-light-handlers', 'toOmaResources:err', error);
    return null;
  }
};

/**
 * Convert incoming AloesLight data to Aloes Client
 *
 * pattern : '+prefixedDevEui/+method/+omaObjectId/+sensorId/+omaResourceId'
 *
 * @method aloesLightDecoder
 * @param {object} packet - Incoming MQTT packet.
 * @param {object} protocol - Protocol paramters ( coming from patternDetector ).
 * @returns {object | null} composed instance
 */
const aloesLightDecoder = (packet, protocol) => {
  try {
    logger(4, 'aloes-light-handlers', 'decoder:req', protocol);
    const protocolKeys = Object.getOwnPropertyNames(protocol);
    if (protocolKeys.length === 6) {
      const decoded = {};
      let decodedPayload;
      const gatewayIdParts = protocol.prefixedDevEui.split('-');
      const inPrefix = protocolRef.validators.directions[0];
      const outPrefix = protocolRef.validators.directions[1];
      const params = {
        ...protocol,
        prefixedDevEui: `${gatewayIdParts[0]}${inPrefix}`,
      };
      // todo get transportProtocol from packet
      decoded.transportProtocol = 'aloesLight';
      decoded.messageProtocol = 'aloesLight';
      decoded.inPrefix = inPrefix;
      decoded.outPrefix = outPrefix;
      decoded.devEui = gatewayIdParts[0];
      decoded.prefix = gatewayIdParts[1];
      decoded.lastSignal = new Date();
      decoded.direction = 'RX';

      switch (Number(protocol.method)) {
        case 0: // HEAD
          decoded.nativeSensorId = protocol.sensorId;
          decoded.nativeNodeId = protocol.nodeId;
          decoded.type = Number(protocol.omaObjectId);
          decoded.nativeType = Number(protocol.omaObjectId);
          decoded.resource = Number(protocol.omaResourceId);
          decoded.nativeResource = Number(protocol.omaResourceId);
          decoded.value = packet.payload.toString();
          decoded.inputPath = mqttPattern.fill(protocolRef.pattern, params);
          params.prefixedDevEui = `${gatewayIdParts[0]}${outPrefix}`;
          decoded.outputPath = mqttPattern.fill(protocolRef.pattern, params);
          decoded.method = 'HEAD';
          decodedPayload = aloesLightToOmaObject(decoded);
          break;
        case 1: // POST
          decoded.inputPath = mqttPattern.fill(protocolRef.pattern, params);
          params.prefixedDevEui = `${gatewayIdParts[0]}${outPrefix}`;
          decoded.outputPath = mqttPattern.fill(protocolRef.pattern, params);
          decoded.nativeSensorId = protocol.sensorId;
          decoded.nativeNodeId = protocol.nodeId;
          decoded.type = Number(protocol.omaObjectId);
          decoded.nativeType = Number(protocol.omaObjectId);
          decoded.resource = Number(protocol.omaResourceId);
          decoded.nativeResource = Number(protocol.omaResourceId);
          if (decoded.resource === 5910 || decoded.resource === 5522) {
            decoded.value = packet.payload;
            // decoded.value = packet.payload.toString('binary');
          } else {
            decoded.value = packet.payload.toString();
          }
          decoded.method = 'POST';
          decodedPayload = aloesLightToOmaResources(decoded);
          break;
        case 2: // GET
          decoded.nativeSensorId = protocol.sensorId;
          decoded.nativeNodeId = protocol.nodeId;
          decoded.type = Number(protocol.omaObjectId);
          decoded.resource = Number(protocol.omaResourceId);
          decoded.nativeResource = Number(protocol.omaResourceId);
          decoded.method = 'GET';
          decodedPayload = decoded;
          break;
        case 3: // DELETE
          decoded.value = packet.payload.toString();
          decoded.nativeSensorId = protocol.sensorId;
          decoded.nativeNodeId = protocol.nodeId;
          decoded.type = Number(protocol.omaObjectId);
          decoded.resource = Number(protocol.omaResourceId);
          decoded.nativeResource = Number(protocol.omaResourceId);
          decoded.method = 'DELETE';
          decodedPayload = decoded;
          break;
        case 4: // STREAM
          decoded.nativeSensorId = protocol.sensorId;
          decoded.nativeNodeId = protocol.nodeId;
          decoded.type = Number(protocol.omaObjectId);
          decoded.nativeType = Number(protocol.omaObjectId);
          decoded.resource = Number(protocol.omaResourceId);
          decoded.nativeResource = Number(protocol.omaResourceId);
          decoded.value = packet.payload;
          //  decoded.value = Uint8Array.from(packet.payload).buffer;
          decoded.method = 'STREAM';
          decodedPayload = decoded;
          break;
        default:
          break;
      }
      logger(3, 'aloes-light-handlers', 'decoder:res', decodedPayload);
      return decodedPayload;
    }
    throw new Error("Topic doesn't match");
  } catch (error) {
    logger(2, 'aloes-light-handlers', 'decoder:err', error);
    return null;
  }
};

module.exports = {
  // aloesLightToOmaObject,
  // aloesLightToOmaResources,
  aloesLightDecoder,
};
