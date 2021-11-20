import { spawn } from 'child_process';

const spawnErrorProcess = (command) => {
  return new Promise((resolve, reject) => {
    const args = command.split(' ');
    const childProcess = spawn('node', [...args], { stdio: 'pipe' });
    let errorMessage = '';

    childProcess.stderr.on('data', (data) => {
      errorMessage += data.toString();
    });

    childProcess.on('close', () => {
      if (errorMessage !== '') {
        resolve(errorMessage);
      } else {
        reject('Error');
      }
    });
  });
};

const responsesMessages = {
  duplicated: 'Command line must not have duplicated arguments',
  empty: 'Config string is empty, please ,use correct one, like "C0-R1-A"',
  inputRespNotExist: 'Input file is not exist',
  outputRespNotExist: 'Output file is not exist',
  useCipherCode:
    'Use ciphers code 0 or 1, like "C0-R1-A", don`t use code with "A"',
};

describe('Input errors of CLI', () => {
  test('should get error message after duplicate options', async () => {
    const response = await spawnErrorProcess(
      'index.js -c C0-C1-A -i input.txt -o output.txt -c'
    );
    expect(response.includes(responsesMessages.duplicated)).not.toBeFalsy();
  });

  test('should get error message when forget to enter -c option', async () => {
    const response = await spawnErrorProcess(
      'index.js C0-C1-A -i input.txt -o output.txt'
    );
    expect(response.includes(responsesMessages.empty)).not.toBeFalsy();
  });

  test('should get error message when enter incorrect input file path', async () => {
    const response = await spawnErrorProcess(
      'index.js --config C0-C1-A -i input.tt -o output.txt'
    );
    expect(
      response.includes(responsesMessages.inputRespNotExist)
    ).not.toBeFalsy();
  });

  test('should get error message when enter incorrect output file path', async () => {
    const response = await spawnErrorProcess(
      'index.js --config C0-C1-A -i input.txt -o outp.tt'
    );
    expect(
      response.includes(responsesMessages.outputRespNotExist)
    ).not.toBeFalsy();
  });

  test('should get error message when enter incorrect config arguments', async () => {
    const response = await spawnErrorProcess(
      'index.js --config C2-R3-A --input input.txt --output output.txt'
    );
    expect(response.includes(responsesMessages.useCipherCode)).not.toBeFalsy();
  });
});
