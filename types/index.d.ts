export type Value = string | number | object;

export type Sensor = {
  name: string;
  devEui: string;
  value: Value;
  type: number;
  resources?: object;
  resource: number;
  createdAt: Date;
  lastSignal: Date;
  frameCounter: number;
  icons?: string[];
  colors?: object;
  transportProtocol: string;
  transportProtocolVersion?: string;
  messageProtocol: string;
  messageProtocolVersion?: string;
  nativeSensorId: string;
  nativeNodeId?: string;
  nativeType: number;
  nativeResource?: number;
  inputPath?: string;
  outputPath?: string;
  inPrefix?: string;
  outPrefix?: string;
};

// export enum Methods {
//   '0',
//   '1',
//   '2',
//   '3',
//   '4',
// }

export enum OuputMethods {
  'HEAD',
  'POST',
  'GET',
  'PUT',
  'DELETE',
  'STREAM',
}

export enum Directions {
  '-in',
  '-out',
}

export type AloesLightProtocol = {
  prefixedDevEui: string;
  suffixedDevEui: string;
  nodeId: number;
  sensorId: number;
  subType: number;
  method: string;
  // method: Methods;
  direction: Directions;
};

export type Pattern = {
  name: string;
  params: AloesLightProtocol;
};

export type Packet = {
  topic: string;
  payload: Value;
};

export declare function aloesLightEncoder(
  instance: Sensor,
  protocol: AloesLightProtocol,
): Packet | null;

export declare function aloesLightDecoder(
  packet: Packet,
  protocol: AloesLightProtocol,
): Sensor | null;

export declare function aloesLightPatternDetector(
  packet: Packet,
): Pattern | null;
