const {assert} = require('chai');
const {aloesLightDecoder} = require('../lib/decoder');
const {aloesLightPatternDetector} = require('../lib/detector');

//  const aloesLightPattern = "+prefixedDevEui/+method/+omaObjectId/+sensorId/+omaResourceId";

describe('aloesLightDecoder - test 1', () => {
  const packet = {topic: 'Aloes123-out/0/3349/0/3/5910', payload: 'test'};
  const pattern = aloesLightPatternDetector(packet);
  const params = pattern.params;
  const decoded = aloesLightDecoder(packet, params);
  const keys = [
    'name',
    'devEui',
    'type',
    'transportProtocol',
    'messageProtocol',
    'nativeSensorId',
    'nativeNodeId',
    'nativeType',
    'resource',
    'nativeResource',
    'resources',
    'inputPath',
    'outputPath',
    'inPrefix',
    'outPrefix',
    'value',
    'colors',
    'frameCounter',
    'icons',
    'lastSignal',
    'method',
    'prefix',
    'direction',
  ];

  it('pattern should exist', () => {
    assert.typeOf(pattern, 'object');
  });

  it('pattern should contain params and value properties', () => {
    assert.hasAllKeys(pattern, ['params', 'name']);
  });

  it(`pattern name should be aloesLight`, () => {
    assert.strictEqual('aloesLight', pattern.name);
  });

  it('decoded should exist', () => {
    assert.typeOf(decoded, 'object');
  });

  it('decoded payload should contain all sensor registering properties', () => {
    assert.hasAllKeys(decoded, keys);
  });

  it(`decoded payload should be ${packet.payload}`, () => {
    assert.strictEqual(packet.payload, decoded.value);
  });

  it(`decoded topic should be ${packet.topic}`, () => {
    assert.strictEqual(packet.topic, decoded.outputPath);
  });
});

describe('aloesLightDecoder - test 2', () => {
  const packet = {topic: 'Aloes123-out/0/3300/1/4/5700', payload: 'test'};
  const pattern = aloesLightPatternDetector(packet);
  const params = pattern.params;
  const decoded = aloesLightDecoder(packet, params);
  const keys = [
    'name',
    'devEui',
    'type',
    'transportProtocol',
    'messageProtocol',
    'nativeSensorId',
    'nativeNodeId',
    'nativeType',
    'resource',
    'nativeResource',
    'resources',
    'inputPath',
    'outputPath',
    'inPrefix',
    'outPrefix',
    'value',
    'colors',
    'frameCounter',
    'icons',
    'lastSignal',
    'method',
    'prefix',
    'direction',
  ];

  it('pattern should exist', () => {
    assert.typeOf(pattern, 'object');
  });

  it('pattern should contain params and value properties', () => {
    assert.hasAllKeys(pattern, ['params', 'name']);
  });

  it(`pattern name should be aloesLight`, () => {
    assert.strictEqual('aloesLight', pattern.name);
  });

  it('decoded should exist', () => {
    assert.typeOf(decoded, 'object');
  });

  it('decoded payload should contain all sensor registering properties', () => {
    assert.hasAllKeys(decoded, keys);
  });

  it(`decoded payload should be ${packet.payload}`, () => {
    assert.strictEqual(packet.payload, decoded.value);
  });

  it(`decoded topic should be ${packet.topic}`, () => {
    assert.strictEqual(packet.topic, decoded.outputPath);
  });
});

describe('aloesLightDecoder - test 3', () => {
  const packet = {topic: 'Aloes123-out/1/3349/0/3/5910', payload: 'test'};
  const pattern = aloesLightPatternDetector(packet);
  const params = pattern.params;
  const decoded = aloesLightDecoder(packet, params);
  const keys = [
    'devEui',
    'type',
    'transportProtocol',
    'messageProtocol',
    'nativeSensorId',
    'nativeNodeId',
    'nativeType',
    'resource',
    'nativeResource',
    'inputPath',
    'outputPath',
    'inPrefix',
    'outPrefix',
    'value',
    'lastSignal',
    'method',
    'prefix',
    'direction',
  ];

  it('pattern should exist', () => {
    assert.typeOf(pattern, 'object');
  });

  it('pattern should contain params and value properties', () => {
    assert.hasAllKeys(pattern, ['params', 'name']);
  });

  it(`pattern name should be aloesLight`, () => {
    assert.strictEqual('aloesLight', pattern.name);
  });

  it('decoded should exist', () => {
    assert.typeOf(decoded, 'object');
  });

  it('decoded payload should contain all sensor properties', () => {
    assert.hasAllKeys(decoded, keys);
  });

  it(`decoded payload should be ${packet.payload}`, () => {
    assert.strictEqual(packet.payload, decoded.value);
  });

  it(`decoded topic should be ${packet.topic}`, () => {
    assert.strictEqual(packet.topic, decoded.outputPath);
  });
});

describe('aloesLightDecoder - test 4', () => {
  const packet = {
    topic: 'Aloes123-out/1/3349/0/4/5910',
    payload: Buffer.from('looognognogonbbuffferrr'),
  };
  const pattern = aloesLightPatternDetector(packet);
  const params = pattern.params;
  const decoded = aloesLightDecoder(packet, params);
  const keys = [
    'devEui',
    'type',
    'transportProtocol',
    'messageProtocol',
    'nativeSensorId',
    'nativeNodeId',
    'nativeType',
    'resource',
    'nativeResource',
    'inputPath',
    'outputPath',
    'inPrefix',
    'outPrefix',
    'value',
    'lastSignal',
    'method',
    'prefix',
    'direction',
  ];

  it('pattern should exist', () => {
    assert.typeOf(pattern, 'object');
  });

  it('pattern should contain params and value properties', () => {
    assert.hasAllKeys(pattern, ['params', 'name']);
  });

  it(`pattern name should be aloesLight`, () => {
    assert.strictEqual('aloesLight', pattern.name);
  });

  it('decoded should exist', () => {
    assert.typeOf(decoded, 'object');
  });

  it('decoded payload should contain all sensor properties', () => {
    assert.hasAllKeys(decoded, keys);
  });

  it(`decoded payload should be ${packet.payload.toString()}`, () => {
    assert.strictEqual(packet.payload.toString(), decoded.value.toString());
  });

  it(`decoded topic should be ${packet.topic}`, () => {
    assert.strictEqual(packet.topic, decoded.outputPath);
  });
});
