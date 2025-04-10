import fs from 'fs';
import readline from 'readline';
import path from 'path';

const LOG_FILE = path.join(__dirname, '../../logs/mqtt-traffic.log');
const ERROR_LOG_FILE = path.join(__dirname, '../../logs/parser-errors.log');
const UNKNOWN_TOPIC_LOG_FILE = path.join(__dirname, '../../logs/unknown-topics.log');

type Direction = 'request' | 'response' | 'event' | 'unknown';

type ParsedTopic = {
  count: number;
  type: 'p2p' | 'atr';
  commandOrEvent: string;
  deviceId: string;
  class: string;
  resource: string;
  direction: Direction;
  fullTopic: string;
  lastPayloads: any[]; // store parsed payloads
};

function sanitizeKeyForFilename(key: string): string {
  return key.replace(/[|/\\?%*:">< ]/g, '_');
}

const topicMap = new Map<string, ParsedTopic>();

let malformedCount = 0;
let unknownTopicCount = 0;

const errorLogStream = fs.createWriteStream(ERROR_LOG_FILE, { flags: 'a' });
const unknownTopicStream = fs.createWriteStream(UNKNOWN_TOPIC_LOG_FILE, { flags: 'a' });

async function parseLogFile() {
  const rl = readline.createInterface({
    input: fs.createReadStream(LOG_FILE),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      const topic = entry.topic;
      const parts = topic.split('/');

      if (parts.length < 6) {
        unknownTopicStream.write(`[${new Date().toISOString()}] Skipped short topic: ${topic}\n`);
        unknownTopicCount++;
        continue;
      }

      let type: 'p2p' | 'atr' | null = null;
      let commandOrEvent = '';
      let deviceId = '';
      let model = '';
      let resource = '';
      let direction: Direction = 'unknown';

      if (parts[0] === 'iot' && parts[1] === 'p2p') {
        type = 'p2p';
        commandOrEvent = parts[2];

        if (parts[3] === 'HelperBot' && parts.length >= 9) {
          deviceId = parts[6];
          model = parts[7];
          resource = parts[8];
        } else {
          deviceId = parts[3];
          model = parts[4];
          resource = parts[5];
        }

        if (parts.includes('q')) direction = 'request';
        else if (parts.includes('p')) direction = 'response';
      }

      if (parts[0] === 'iot' && parts[1] === 'atr') {
        type = 'atr';
        commandOrEvent = parts[2];
        deviceId = parts[3];
        model = parts[4];
        resource = parts[5];
        direction = 'event';
      }

      if (!type || !commandOrEvent || !deviceId || !model || !resource) {
        unknownTopicStream.write(`[${new Date().toISOString()}] Unknown format: ${topic}\n`);
        unknownTopicCount++;
        continue;
      }

      const key = `${type}|${commandOrEvent}|${deviceId}|${model}|${resource}|${direction}`;

      if (!topicMap.has(key)) {
        topicMap.set(key, {
          count: 0,
          type,
          commandOrEvent,
          deviceId,
          class: model,
          resource,
          direction,
          fullTopic: topic,
          lastPayloads: []
        });
      }

      topicMap.get(key)!.count += 1;
      try {
        const parsedPayload = JSON.parse(entry.payload);
        const topicEntry = topicMap.get(key)!;

        topicEntry.lastPayloads.push(parsedPayload);

        // Keep only last 5 payloads
        if (topicEntry.lastPayloads.length > 20) {
          topicEntry.lastPayloads.shift();
        }
      } catch {
        // Not JSON or invalid — ignore
      }
    } catch (err) {
      malformedCount++;
      errorLogStream.write(`[${new Date().toISOString()}] Malformed JSON: ${line}\n`);
    }
  }

  printSummary();
  errorLogStream.end();
  unknownTopicStream.end();
}

function printSummary() {
  const sorted = Array.from(topicMap.values()).sort((a, b) => b.count - a.count);

  console.log(`\n📦 Parsed MQTT Topic Summary (p2p + atr)\n`);
  for (const entry of sorted) {
    console.log(`🔹 ${entry.type.toUpperCase()} - ${entry.commandOrEvent}`);
    console.log(`   Count     : ${entry.count}`);
    console.log(`   Direction : ${entry.direction}`);
    console.log(`   Device ID : ${entry.deviceId}`);
    console.log(`   Model     : ${entry.class}`);
    console.log(`   Resource  : ${entry.resource}`);
    console.log(`   Example   : ${entry.fullTopic}`);
    console.log('');
  }
  const payloadDump: Record<string, any[]> = {};
  for (const [key, topicEntry] of topicMap.entries()) {
    payloadDump[key] = topicEntry.lastPayloads;
  }

  const PAYLOAD_LOG_PATH = path.join(__dirname, '../../logs/parsed-payloads.json');
  fs.writeFileSync(PAYLOAD_LOG_PATH, JSON.stringify(payloadDump, null, 2));

  const EXPORT_DIR = path.join(__dirname, '../../typesamples');
  fs.mkdirSync(EXPORT_DIR, { recursive: true });

  for (const [_unusedKey, topicEntry] of topicMap.entries()) {
    if (topicEntry.lastPayloads.length === 0) continue;

    const dirName = sanitizeKeyForFilename(`${topicEntry.type}_${topicEntry.commandOrEvent}_${topicEntry.direction}`);
    const dirPath = path.join(EXPORT_DIR, dirName);
    fs.mkdirSync(dirPath, { recursive: true });

    topicEntry.lastPayloads.forEach((payload, index) => {
      const filename = `${String(index + 1).padStart(4, '0')}.json`;
      const filePath = path.join(dirPath, filename);
      fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
    });
  }

  console.log(`⚠️  Malformed lines skipped      : ${malformedCount}`);
  console.log(`⚠️  Unknown/unsupported topics   : ${unknownTopicCount}`);
  console.log(`📁  See logs/parser-errors.log and logs/unknown-topics.log for details.`);
  console.log(`🧪 Payload dump written to: ${PAYLOAD_LOG_PATH}`);
  console.log(`🧪 Payload samples exported to: ${EXPORT_DIR}`);
}

parseLogFile().catch((err) => {
  console.error('[Parser] Failed:', err);
});
