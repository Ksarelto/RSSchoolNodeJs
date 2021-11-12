import { ValidationErrors } from './userErrors.js';
import chalk from 'chalk';
import process from 'process';

export const setErrorsMessage = (err) => {
  if (err.name === 'ValidationErrors') {
    process.stderr.write(
      chalk.bold.bgHex('#853c0f')(
        `Error name: ${err.name} \nError message: ${err.message}`
      )
    );
  } else {
    process.stderr.write(
      chalk.bold.bgRed(
        `Error name: ${err.name} \nError message: ${err.message}`
      )
    );
  }
  process.exit(9);
};

export const validateCommandLine = (args) => {
  try {
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
      if (!arg.match(/[CR][01]{1}/g) && arg !== 'A')
        throw new ValidationErrors(
          'Use ciphers codes "C,R,A" in upper case, like "C0-R1-A", don`t use code with "A" '
        );
    });
    return res;
  } catch (err) {
    setErrorsMessage(err);
  }
};
