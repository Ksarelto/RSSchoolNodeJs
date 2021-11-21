import { streamsPipe } from '../modules/streams/streamsPipe.js';
import { jest } from '@jest/globals';
import fs from 'fs';

const errorMessagesStrings = {
  primeErrorMessage: 'Error name: UsersErrors \nError message: ',
  classError: 'Error name: Error \nError message: ',
  configEmpty:
    'Config string is empty, please ,use correct one, like "C0-R1-A"',
  tooLongArgument: 'Too long argument, use arguments like "C0-R1-A"',
  useCode: 'Use ciphers code 0 or 1, like "C0-R1-A", don`t use code with "A" ',
  useCodesArgs:
    'Use ciphers codes "C,R,A" in upper case, like "C0-R1-A", don`t use code with "A" ',
  inputNotExist: 'Input file is not exist',
  outputNotExist: 'Output file is not exist',
};

const testSetCommandLineArgs = jest.fn();

testSetCommandLineArgs
  .mockReturnValueOnce(['input.txt', 'output.txt', 'C0-C1-A'])
  .mockReturnValueOnce(['input.txt', undefined, 'C0-C1-R1'])
  .mockReturnValueOnce([undefined, undefined, 'C0-C1-A'])
  .mockReturnValueOnce(['input.tt', 'output.txt', 'C0-C1-A'])
  .mockReturnValueOnce(['input.txt', 'output.t', 'C0-C1-A']);

describe('Streams tests', () => {
  jest.spyOn(process, 'exit').mockImplementation(() => {});
  let errorMess = jest
    .spyOn(process.stderr, 'write')
    .mockImplementation(() => {});

  test('should return correct result', async () => {
    const args = testSetCommandLineArgs();
    await streamsPipe(...args);
    fs.writeFileSync('output.txt', '');
    expect(errorMess).toHaveBeenCalledTimes(0);
  });

  test('should not throw err with undefined output file', async () => {
    const args = testSetCommandLineArgs();
    await streamsPipe(...args);
    expect(errorMess).toHaveBeenCalledTimes(0);
  });

  test('should not throw err  with undefined input and output files', async () => {
    const args = testSetCommandLineArgs();
    streamsPipe(...args);
    expect(errorMess).toHaveBeenCalledTimes(0);
  });

  test('should return incorrect result with incorrect input file path', async () => {
    const args = testSetCommandLineArgs();
    await streamsPipe(...args);
    expect(errorMess).toHaveBeenCalledTimes(1);
    expect(errorMess).toHaveBeenCalledWith(
      errorMessagesStrings.primeErrorMessage +
        errorMessagesStrings.inputNotExist
    );
  });

  test('should return incorrect result with incorrect output file path', async () => {
    const args = testSetCommandLineArgs();
    await streamsPipe(...args);
    expect(errorMess).toHaveBeenCalledTimes(2);
    expect(errorMess).toHaveBeenCalledWith(
      errorMessagesStrings.primeErrorMessage +
        errorMessagesStrings.outputNotExist
    );
  });
});
