import mqtt, { MqttClient } from 'mqtt';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load .env config if needed

const MQTT_URL = process.env.MQTT_URL || 'mqtts://localhost:8883';
const LOG_FILE = path.join(__dirname, '../../logs/mqtt-traffic.log');

// Ensure log folder exists
fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });

console.log('[MQTT Sniffer] Connecting to broker:', MQTT_URL);

const snifferClient: MqttClient = mqtt.connect(MQTT_URL);

snifferClient.on('connect', () => {
  console.log('[MQTT Sniffer] Connected');

  snifferClient.subscribe('#', (err) => {
    if (err) {
      console.error('[MQTT Sniffer] Failed to subscribe to all topics:', err.message);
    } else {
      console.log('[MQTT Sniffer] Subscribed to all topics (#)');
    }
  });
});

snifferClient.on('message', (topic: string, payload: Buffer) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    topic,
    payload: payload.toString()
  };

  fs.appendFile(LOG_FILE, JSON.stringify(logEntry) + '\n', (err) => {
    if (err) {
      console.error('[MQTT Sniffer] Failed to write log:', err.message);
    }
  });

  // Optional: Console log for debugging
  console.log(`[MQTT Sniffer] ${topic} -> ${payload.toString()}`);
});
