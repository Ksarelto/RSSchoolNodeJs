import { ValidationErrors } from './userErrors.js';
import process from 'process';
import { regExArgs } from './constVariables.js';
import { CONFIG, INPUT, OUTPUT } from './constVariables.js';

export const setErrorsMessage = (err) => {
  process.stderr.write(
    `Error name: ${err.name} \nError message: ${err.message}`
  );
  process.exit(9);
};

export const validateCommandLine = (args) => {
  try {
    if (!args) {
      throw new ValidationErrors(
        'Config string is empty, please ,use correct one, like "C0-R1-A"'
      );
    }
    const res = args.split('-');
    res.forEach((arg) => {
      if (arg.length > 2)
        throw new ValidationErrors(
          'Too long argument, use arguments like "C0-R1-A"'
        );
      if (arg[1] > 1) {
        throw new ValidationErrors(
          'Use ciphers code 0 or 1, like "C0-R1-A", don`t use code with "A" '
        );
      }
      if (!arg.match(regExArgs) && arg !== 'A')
        throw new ValidationErrors(
          'Use ciphers codes "C,R,A" in upper case, like "C0-R1-A", don`t use code with "A" '
        );
    });
    return res;
  } catch (err) {
    setErrorsMessage(err);
  }
};

export const checkOptions = (arg) => {
  return INPUT.includes(arg)
    ? INPUT
    : OUTPUT.includes(arg)
    ? OUTPUT
    : CONFIG.includes(arg)
    ? CONFIG
    : null;
};
