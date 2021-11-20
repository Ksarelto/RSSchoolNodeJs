import { jest } from '@jest/globals';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { cipherCasearEncoding } from '../modules/ciphersFuncs';
import { cipherCasear, encrypt } from '../modules/helpers/constVariables';
import { myTransformStream } from '../modules/streams/streams';

const testFunc = jest.fn();
testFunc.mockImplementation(() => {
  throw new Error('Test Error');
});

const imitatePipeline = async (func, cipher = cipherCasear, mode = encrypt) => {
  try {
    const read = fs.createReadStream('input.txt');
    const write = fs.createWriteStream('output.txt');
    const transform = new myTransformStream(func, cipher, mode);
    await pipeline(read, transform, write);
  } catch (err) {
    return err.message;
  }
};

describe('test transform stream', () => {
  afterAll(() => {
    fs.writeFileSync('./output.txt', '', { encoding: 'utf-8', flag: 'r' });
  });
  test('should throw exeption', async () => {
    testFunc.mockImplementation(() => {
      throw new Error('Test Error');
    });
    const res = await imitatePipeline(testFunc);
    expect(res).toBe('Test Error');
  });
  test('should return correct answer', async () => {
    testFunc.mockImplementation(cipherCasearEncoding);
    const res = await imitatePipeline(testFunc);
    expect(res).toBeUndefined();
  });
  test('should return not default string', async () => {
    fs.writeFileSync('./output.txt', '', { encoding: 'utf-8', flag: 'r' });
    testFunc.mockImplementation(cipherCasearEncoding);
    const res = await imitatePipeline(testFunc, 'Incorrect Cipher', 'WTF');
    expect(res).toBeUndefined();
    const result = fs.readFileSync('./output.txt', 'utf-8');
    expect(result).not.toBe('This is secret. Message about "_" symbol!');
  });
});
