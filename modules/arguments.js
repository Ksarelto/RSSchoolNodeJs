import {
  INPUT,
  OUTPUT,
  CONFIG,
  regExOptions,
} from './helpers/constVariables.js';
import { ValidationErrors } from './helpers/userErrors.js';
import { setErrorsMessage } from './helpers/utils.js';

const setCommandLineArgumentsValues = (args) => {
  const inputPath = args[INPUT[0]] || args[INPUT[1]];
  const outputPath = args[OUTPUT[0]] || args[OUTPUT[1]];
  const config = args[CONFIG[0]] || args[CONFIG[1]];

  return [inputPath, outputPath, config];
};

export const getArgsFromCommandLine = (args) => {
  try {
    const res = args.reduce((obj, arg, index) => {
      if (obj[arg]) {
        throw new ValidationErrors(
          'Command line must not have duplicated arguments'
        );
      }
      if (arg.match(regExOptions)) {
        const value =
          args[index + 1] && args[index + 1].match(regExOptions)
            ? undefined
            : args[index + 1];
        obj[arg] = value;
      }
      return obj;
    }, {});

    if (Object.keys(res).length === 0)
      throw new ValidationErrors(
        'Invalid config arguments, use args like "C0-R1-A"'
      );

    return setCommandLineArgumentsValues(res);
  } catch (err) {
    setErrorsMessage(err);
  }
};
