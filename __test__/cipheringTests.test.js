import { getArgsFromCommandLine } from '../modules/arguments.js';
import { jest } from '@jest/globals';

const errorsMessages = {
  duplicatedArgs:
    'Error name: ValidationErrors \nError message: Command line must not have duplicated arguments',
  emptyArgs:
    'Error name: ValidationErrors \nError message: Invalid config arguments, use args like "C0-R1-A"',
};

describe('Arguments validation', () => {
  test('should return value if all arguments exist', () => {
    const args = ['-c', 'C0-C1-A', '-i', 'input.txt', '-o', 'output.txt'];
    expect(getArgsFromCommandLine(args)).toEqual([
      'input.txt',
      'output.txt',
      'C0-C1-A',
    ]);
  });

  test('should return value if input file path missing', () => {
    const args = ['-c', 'C0-C1-A', '-i', '-o', 'output.txt'];
    expect(getArgsFromCommandLine(args)).toEqual([
      undefined,
      'output.txt',
      'C0-C1-A',
    ]);
  });

  test('should return value if input and output files path missing', () => {
    const args = ['-c', 'C0-C1-A', '-i', '-o'];
    expect(getArgsFromCommandLine(args)).toEqual([
      undefined,
      undefined,
      'C0-C1-A',
    ]);
  });

  test('should return value if args missing', () => {
    const args = ['-c', '-i', '-o'];
    expect(getArgsFromCommandLine(args)).toEqual([
      undefined,
      undefined,
      undefined,
    ]);
  });
});

describe('Errors Arguments', () => {
  let errorMess;

  beforeEach(() => {
    jest.spyOn(process, 'exit').mockImplementation(() => {});
    errorMess = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => {});
  });

  test('should get error if duplicate options', () => {
    const args = ['-c', 'C0-C1-A', '-i', '-o', 'output.txt', '-c'];
    getArgsFromCommandLine(args);
    expect(errorMess).toHaveBeenCalledWith(errorsMessages.duplicatedArgs);
  });

  test('should getn error if empty arguments string', () => {
    const args = [];
    getArgsFromCommandLine(args);
    expect(errorMess).toHaveBeenCalledWith(errorsMessages.emptyArgs);
  });
});
