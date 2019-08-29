## Objects

<dl>
<dt><a href="#protocolRef">protocolRef</a> : <code>object</code></dt>
<dd><p>References used to validate payloads</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#aloesLightToOmaObject">aloesLightToOmaObject(msg)</a> ⇒ <code>object</code></dt>
<dd><p>Find corresponding <a href="/aloeslight/#omaobjects">OMA Object</a> following a AloesLight presentation message</p>
</dd>
<dt><a href="#aloesLightToOmaResources">aloesLightToOmaResources(msg)</a> ⇒ <code>object</code></dt>
<dd><p>Find corresponding <a href="/aloeslight/#omaresources">OMA Resources</a> to incoming AloesLight datas</p>
</dd>
<dt><a href="#aloesLightDecoder">aloesLightDecoder(packet, protocol)</a> ⇒ <code>object</code></dt>
<dd><p>Convert incoming AloesLight data to Aloes Client
pattern - &#39;+prefixedDevEui/+method/+omaObjectId/+sensorId/+omaResourceId&#39;</p>
</dd>
<dt><a href="#extractProtocol">extractProtocol(pattern, topic)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Extract protocol paramters from incoming topic.</p>
</dd>
<dt><a href="#aloesLightPatternDetector">aloesLightPatternDetector(packet)</a> ⇒ <code>object</code></dt>
<dd><p>Check incoming MQTT packet against AloesLight API</p>
</dd>
<dt><a href="#aloesLightEncoder">aloesLightEncoder(packet, protocol)</a></dt>
<dd><p>Convert incoming Aloes Client data to AloesLight protocol</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_OmaObjects">OmaObjects</a></dt>
<dd><p>Oma Object References.</p>
</dd>
<dt><a href="#external_OmaResources">OmaResources</a></dt>
<dd><p>Oma Resources References.</p>
</dd>
</dl>

<a name="protocolRef"></a>

## protocolRef : <code>object</code>
References used to validate payloads

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pattern | <code>string</code> | The pattern used by Aloes Light devices. |
| validators | <code>object</code> | Check inputs / build outputs |
| validators.prefixedDevEui | <code>array</code> |  |
| validators.nodeId | <code>array</code> |  |
| validators.methods | <code>array</code> | [0, 1, 2, 3, 4]. |

<a name="aloesLightToOmaObject"></a>

## aloesLightToOmaObject(msg) ⇒ <code>object</code>
Find corresponding [OMA Object](/aloeslight/#omaobjects) following a AloesLight presentation message

**Kind**: global function  
**Returns**: <code>object</code> - composed instance  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>object</code> | Decoded MQTT packet. |

<a name="aloesLightToOmaResources"></a>

## aloesLightToOmaResources(msg) ⇒ <code>object</code>
Find corresponding [OMA Resources](/aloeslight/#omaresources) to incoming AloesLight datas

**Kind**: global function  
**Returns**: <code>object</code> - composed instance  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>object</code> | Decoded MQTT packet. |

<a name="aloesLightDecoder"></a>

## aloesLightDecoder(packet, protocol) ⇒ <code>object</code>
Convert incoming AloesLight data to Aloes Client
pattern - '+prefixedDevEui/+method/+omaObjectId/+sensorId/+omaResourceId'

**Kind**: global function  
**Returns**: <code>object</code> - composed instance  

| Param | Type | Description |
| --- | --- | --- |
| packet | <code>object</code> | Incoming MQTT packet. |
| protocol | <code>object</code> | Protocol paramters ( coming from patternDetector ). |

<a name="extractProtocol"></a>

## extractProtocol(pattern, topic) ⇒ <code>Promise.&lt;object&gt;</code>
Extract protocol paramters from incoming topic.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - Extracted paramters.  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>string</code> | Name of the protocol pattern. |
| topic | <code>string</code> | MQTT topic. |

<a name="aloesLightPatternDetector"></a>

## aloesLightPatternDetector(packet) ⇒ <code>object</code>
Check incoming MQTT packet against AloesLight API

**Kind**: global function  
**Returns**: <code>object</code> - found pattern.name and pattern.params  

| Param | Type | Description |
| --- | --- | --- |
| packet | <code>object</code> | The MQTT packet. |

<a name="aloesLightEncoder"></a>

## aloesLightEncoder(packet, protocol)
Convert incoming Aloes Client data to AloesLight protocol

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| packet | <code>object</code> | Sensor instance. |
| protocol | <code>object</code> | Protocol paramters ( coming from patternDetector ). |

<a name="external_OmaObjects"></a>

## OmaObjects
Oma Object References.

**Kind**: global external  
**See**: [https://supervisor.aloes.io/api/omaObjects](https://supervisor.aloes.io/api/omaObjects)  
<a name="external_OmaResources"></a>

## OmaResources
Oma Resources References.

**Kind**: global external  
**See**: [https://supervisor.aloes.io/api/omaResources](https://supervisor.aloes.io/api/omaResources)  
