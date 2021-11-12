import process from 'process';
import path from 'path';
import { transformString } from '../createTransformStreams.js';
import { pipeline } from 'stream';
import { myWritableStream, myReadableStream } from './streams.js';
import { setErrorsMessage } from '../helpers/utils.js';

export const streamsPipe = (input, output, command) => {
  const readableStream = input
    ? new myReadableStream(path.join(input))
    : process.stdin;
  const writableStream = output
    ? new myWritableStream(path.join(output))
    : process.stdout;
  const transformStreams = transformString(command);
  pipeline(readableStream, ...transformStreams, writableStream, (err) => {
    if (err) {
      setErrorsMessage(err);
    }
  });
};
