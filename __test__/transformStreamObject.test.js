import { jest } from '@jest/globals';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { cipherCasear, encrypt } from '../modules/helpers/constVariables';
import { myTransformStream } from '../modules/streams/streams';

const errorMessage = jest.fn(() => {
  throw new Error('Test Error');
});

const imitatePipeline = async () => {
  try {
    const read = fs.createReadStream('input.txt');
    const write = fs.createWriteStream('output.txt');
    const transform = new myTransformStream(
      errorMessage,
      cipherCasear,
      encrypt
    );
    await pipeline(read, transform, write);
  } catch (err) {
    return err.message;
  }
};

describe('test transform stream', () => {
  test('should throw exeption', async () => {
    const res = await imitatePipeline();
    expect(res).toBe('Test Error');
  });
});
