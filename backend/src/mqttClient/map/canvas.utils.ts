import { Canvas, createCanvas } from 'canvas';
import { Axis } from './map.model';

export const trimCanvas = (source: Canvas) => {
  const ctx = source.getContext('2d');
  const result = createCanvas(source.width, source.height);
  const resultCtx = result.getContext('2d');
  const pixels = ctx.getImageData(0, 0, source.width, source.height);
  const pixelsLength = pixels.data.length;
  const bound = {
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
  };
  let x = 0;
  let y = 0;

  for (let index = 0; index < pixelsLength; index += 4) {
    if (pixels.data[index + 3] !== 0) {
      x = (index / 4) % source.width;
      y = (index / 4 / source.width) >> 0;

      if (bound.top === -1) {
        bound.top = y;
      }

      if (bound.left === -1 || x < bound.left) {
        bound.left = x;
      }

      if (bound.right === -1 || bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === -1 || bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  const trimHeight = bound.bottom - bound.top;
  const trimWidth = bound.right - bound.left;
  const trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  result.width = trimWidth;
  result.height = trimHeight;

  resultCtx.putImageData(trimmed, 0, 0);

  return result;
};

export const translateCanvas = (source: Canvas, axis: Axis) => {
  const result = createCanvas(source.width, source.height);
  const resultCtx = result.getContext('2d');

  if (axis === 'x') {
    resultCtx.translate(source.width, 0);
    resultCtx.scale(-1, 1);
  } else {
    resultCtx.translate(0, source.height);
    resultCtx.scale(1, -1);
  }
  resultCtx.drawImage(source, 0, 0);
  return result;
};
