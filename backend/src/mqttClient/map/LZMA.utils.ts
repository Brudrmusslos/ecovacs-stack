import { decompress } from 'lzma-native';

const decodeB64 = (str: string) => Buffer.from(str, 'base64');

const toBigEndian = (buffer: Buffer) => {
  const fourBytesBuffer = Buffer.allocUnsafe(4);
  fourBytesBuffer.writeUintLE(0, 0, 4);
  const start = buffer.subarray(0, 9);
  const end = buffer.subarray(9);
  return Buffer.concat([start, fourBytesBuffer, end]);
};

export const decompressLZMA = (data: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    decompress(toBigEndian(decodeB64(data)), undefined, (result: Buffer | undefined) => {
      if (!result) return reject(new Error('LZMA decompression failed'));
      resolve(result);
    });
  });
};
