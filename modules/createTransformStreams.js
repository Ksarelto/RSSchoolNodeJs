import { cipherCasearEncoding, cipherAtbashEncoding } from './ciphersFuncs.js';
import { myTransformStream } from './streams/streams.js';
import { validateCommandLine } from './helpers/utils.js';
import {
  cipherCasear,
  cipherROT_8,
  encrypt,
  discrypt,
} from './helpers/constVariables.js';

export const transformString = (configArgs) => {
  const argumentsArray = validateCommandLine(configArgs);
  const transformStreamsArray = [];

  argumentsArray.forEach((arg) => {
    const mode = arg[1] === '1' ? encrypt : discrypt;
    if (arg[0] === 'C')
      transformStreamsArray.push(
        new myTransformStream(cipherCasearEncoding, cipherCasear, mode)
      );
    if (arg[0] === 'R')
      transformStreamsArray.push(
        new myTransformStream(cipherCasearEncoding, cipherROT_8, mode)
      );
    if (arg[0] === 'A')
      transformStreamsArray.push(new myTransformStream(cipherAtbashEncoding));
  });

  return transformStreamsArray;
};
