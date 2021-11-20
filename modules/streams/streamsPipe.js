import process from 'process';
import { transformString } from '../createTransformStreams.js';
import { pipeline } from 'stream/promises';
import { myWritableStream, myReadableStream } from './streams.js';
import { setErrorsMessage } from '../helpers/utils.js';

export const streamsPipe = async (input, output, command) => {
  try {
    const readableStream = input ? new myReadableStream(input) : process.stdin;
    const writableStream = output
      ? new myWritableStream(output)
      : process.stdout;
    const transformStreams = transformString(command);
    await pipeline(readableStream, ...transformStreams, writableStream);
  } catch (err) {
    setErrorsMessage(err);
  }
};
