import { inspect } from 'node:util';

export const getColoredConsoleLog = (topic: string) => {
  let color = 31;
  if (topic.includes('p2p')) {
    if (topic.includes('/p/')) {
      color = 36;
    } else {
      color = 35;
    }
  }
  return `\x1b[${color}m[${topic}]\x1b[0m`;
};

export const isTopic = (query: string, topic: string) =>
  topic.search('/q/') < 0 && topic.search(query) >= 0 && process.env.BOTID && topic.search(process.env.BOTID) >= 0;

// export const getDatafromMessage = (message: Buffer) => JSON.parse(message.toString()).body.data;

export const getDatafromMessage = (message: Buffer) => {
  try {
    const parsed = JSON.parse(message.toString());
    return parsed?.body?.data;
  } catch (e) {
    console.warn(`[getDatafromMessage] Failed to parse`, e);
    return null;
  }
};

export const getLogs = (topic: string, message: Buffer) => {
  let formattedRes;
  try {
    formattedRes = JSON.parse(message.toString());
  } catch (err) {
    console.error(`[getLogs] Failed to parse message:`, err);
    console.error(`[getLogs] Raw message:`, message.toString());
    return;
  }

  if (isTopic('onFwBuryPoint', topic) && formattedRes?.body?.data?.content) {
    try {
      formattedRes.body.data.content = JSON.parse(formattedRes.body.data.content);
    } catch (e) {
      console.warn(`[getLogs] Failed to parse .content field:`, e);
    }
  }

  if (isTopic('onInfo', topic) && formattedRes?.body?.data?.d_val) {
    console.log('onInfo', formattedRes.body.data.d_val);
  }

  console.log(`${new Date().toLocaleString()}`, getColoredConsoleLog(topic), inspect(formattedRes, true, null, true));
};

export const getParsedContent = (topic: string, message: Buffer): { parsed: unknown | null; raw: unknown } => {
  const raw = getDatafromMessage(message);

  if (!raw?.content) {
    console.warn(`[getParsedContent] Missing content field in message from topic "${topic}"`, raw);
    return { parsed: null, raw };
  }

  try {
    const parsed = JSON.parse(raw.content);
    return { parsed, raw };
  } catch (e) {
    console.warn(`[getParsedContent] Failed to parse content in message from topic "${topic}"`, e, raw);
    return { parsed: null, raw };
  }
};
