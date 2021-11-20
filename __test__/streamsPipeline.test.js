import { streamsPipe } from '../modules/streams/streamsPipe.js';
import { jest } from '@jest/globals';

const errorMessagesStrings = {
  primeErrorMessage: 'Error name: UsersErrors \nError message: ',
  configEmpty:
    'Config string is empty, please ,use correct one, like "C0-R1-A"',
  tooLongArgument: 'Too long argument, use arguments like "C0-R1-A"',
  useCode: 'Use ciphers code 0 or 1, like "C0-R1-A", don`t use code with "A" ',
  useCodesArgs:
    'Use ciphers codes "C,R,A" in upper case, like "C0-R1-A", don`t use code with "A" ',
  inputNotExist: 'Input file is not exist',
  outputNotExist: 'Output file is not exist',
};

describe('Streams tests', () => {
  let errorMess;
  beforeEach(() => {
    jest.spyOn(process, 'exit').mockImplementation(() => {});
    errorMess = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => {});
  });

  test('should return correct result', async () => {
    const args = ['input.txt', 'output.txt', 'C0-C1-A'];
    await streamsPipe(...args);
    expect(errorMess).toHaveBeenCalledTimes(0);
  });

  test('should return incorrect result with undefined output file', async () => {
    const args = ['input.txt', undefined, 'C0-C1-A'];
    await streamsPipe(...args);
    expect(errorMess).toHaveBeenCalledTimes(0);
  });

  test('should return incorrect result with undefined input and output files', async () => {
    const args = [undefined, undefined, 'C0-C1-A'];
    const testStdin = async () => {
      streamsPipe(...args);
      process.stdin.write('hello');
    };
    await testStdin();
    expect(errorMess).toHaveBeenCalledTimes(0);
  });

  test('should return incorrect result with incorrect input file path', async () => {
    const args = ['input.tt', 'output.txt', 'C0-C1-A'];
    await streamsPipe(...args);
    expect(errorMess).toHaveBeenCalledTimes(1);
    expect(errorMess).toHaveBeenCalledWith(
      errorMessagesStrings.primeErrorMessage +
        errorMessagesStrings.inputNotExist
    );
  });

  test('should return incorrect result with incorrect output file path', async () => {
    const args = ['input.txt', 'output.t', 'C0-C1-A'];
    await streamsPipe(...args);
    expect(errorMess).toHaveBeenCalledTimes(2);
    expect(errorMess).toHaveBeenCalledWith(
      errorMessagesStrings.primeErrorMessage +
        errorMessagesStrings.outputNotExist
    );
  });

  test('should return incorrect result with blocked output file', async () => {
    const args = ['input.txt', 'ReadOnly.txt', 'C0-C1-A'];
    await streamsPipe(...args);
    expect(errorMess).toHaveBeenCalledTimes(3);
  });

  test('should return incorrect result with blocked input file', async () => {
    const args = ['WriteOnly.txt', 'output.txt', 'C0-C1-A-R1'];
    await streamsPipe(...args);
    expect(errorMess).toHaveBeenCalledTimes(4);
  });
});
