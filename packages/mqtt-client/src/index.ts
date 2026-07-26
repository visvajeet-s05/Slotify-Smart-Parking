import fs from "node:fs";
import mqtt, { MqttClient } from "mqtt";

export type SlotDelta = { s: string; v: "A" | "R" | "O" | "V" | "E"; t: number };
export function slotTopic(lotId: string, slotId: string) { return `slotify/v1/lot/${lotId}/slot/${slotId}/event`; }
export function connectMtls(): MqttClient {
  const required = ["MQTT_URL", "MQTT_CA_PATH", "MQTT_CERT_PATH", "MQTT_KEY_PATH"] as const;
  for (const key of required) if (!process.env[key]) throw new Error(`Missing ${key}`);
  return mqtt.connect(process.env.MQTT_URL!, { protocol: "mqtts", rejectUnauthorized: true, ca: fs.readFileSync(process.env.MQTT_CA_PATH!), cert: fs.readFileSync(process.env.MQTT_CERT_PATH!), key: fs.readFileSync(process.env.MQTT_KEY_PATH!), clientId: `slotify-${process.env.EDGE_NODE_ID ?? "service"}` });
}
export function publishDelta(client: MqttClient, lotId: string, slotId: string, delta: SlotDelta) {
  const payload = JSON.stringify(delta);
  if (Buffer.byteLength(payload) >= 50) throw new Error("Slot delta must be under 50 bytes");
  client.publish(slotTopic(lotId, slotId), payload, { qos: 1 });
}
