import { validateCommandLine } from '../modules/helpers/utils';
import { jest } from '@jest/globals';

const errorMessagesStrings = {
  primeErrorMessage: 'Error name: ValidationErrors \nError message: ',
  configEmpty:
    'Config string is empty, please ,use correct one, like "C0-R1-A"',
  tooLongArgument: 'Too long argument, use arguments like "C0-R1-A"',
  useCode: 'Use ciphers code 0 or 1, like "C0-R1-A", don`t use code with "A" ',
  useCodesArgs:
    'Use ciphers codes "C,R,A" in upper case, like "C0-R1-A", don`t use code with "A" ',
};

describe('Commandline validation', () => {
  let errorMess;

  beforeEach(() => {
    jest.spyOn(process, 'exit').mockImplementation(() => {});
    errorMess = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => {});
  });

  test('should validate', () => {
    const args = 'C0-R1-A';
    expect(validateCommandLine(args)).toStrictEqual(['C0', 'R1', 'A']);
  });

  test('should throw error message with null args', () => {
    const args = null;
    validateCommandLine(args);
    expect(errorMess).toHaveBeenCalledWith(
      errorMessagesStrings.primeErrorMessage + errorMessagesStrings.configEmpty
    );
  });

  test('should throw error message with too long arg', () => {
    const args = 'C02-R1-A';
    validateCommandLine(args);
    expect(errorMess).toHaveBeenCalledWith(
      errorMessagesStrings.primeErrorMessage +
        errorMessagesStrings.tooLongArgument
    );
  });

  test('should throw error message with incorrect arg', () => {
    const args = 'C2-R1-A';
    validateCommandLine(args);
    expect(errorMess).toHaveBeenCalledWith(
      errorMessagesStrings.primeErrorMessage + errorMessagesStrings.useCode
    );
  });

  test('should throw error message with incorrect arg option', () => {
    const args = 'C1-Z1-A1';
    validateCommandLine(args);
    expect(errorMess).toHaveBeenCalledWith(
      errorMessagesStrings.primeErrorMessage + errorMessagesStrings.useCodesArgs
    );
  });
});
