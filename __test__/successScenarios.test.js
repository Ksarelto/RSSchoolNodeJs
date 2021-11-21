import { spawn } from 'child_process';
import fs from 'fs';

const spawnCorrectProcess = (command) => {
  return new Promise((resolve, reject) => {
    const args = command.split(' ');
    const childProcess = spawn('node', [...args], { stdio: 'pipe' });

    childProcess.on('close', () => {
      fs.readFile('./testFiles/testOutput.txt', 'utf-8', (err, data) => {
        if (err) reject(new Error('Test failed'));
        resolve(data);
      });
    });

    childProcess.on('exit', () => {
      childProcess.kill();
    });
  });
};

const responseStrings = {
  'C1-C1-R0-A': 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!',
  'C1-C0-A-R1-R0-A-R0-R0-C1-A': 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!',
  'A-A-A-R1-R0-R0-R0-C1-C1-A': 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!',
  'C1-R1-C0-C0-A-R0-R1-R1-A-C1': 'This is secret. Message about "_" symbol!',
};

const correctScenarios = {
  first:
    'index.js -c C1-C1-R0-A -i ./testFiles/testInput.txt -o ./testFiles/testOutput.txt',
  second:
    'index.js -c C1-C0-A-R1-R0-A-R0-R0-C1-A -i ./testFiles/testInput.txt -o ./testFiles/testOutput.txt',
  third:
    'index.js -c A-A-A-R1-R0-R0-R0-C1-C1-A -i ./testFiles/testInput.txt -o ./testFiles/testOutput.txt',
  fourth:
    'index.js -c C1-R1-C0-C0-A-R0-R1-R1-A-C1 -i ./testFiles/testInput.txt -o ./testFiles/testOutput.txt',
};

describe('Correct tests of CLI', () => {
  beforeAll(() => {
    try {
      fs.writeFileSync('./testFiles/testOutput.txt', '', {
        encoding: 'utf-8',
        flag: 'r',
      });
    } catch (err) {
      console.error(err);
    }
  });

  test('should show correct output with args C1-C1-R0-A -i', async () => {
    const response = await spawnCorrectProcess(correctScenarios.first);
    expect(response).toMatch(responseStrings['C1-C1-R0-A']);
  });

  test('should show correct output with args C1-C0-A-R1-R0-A-R0-R0-C1-A', async () => {
    const response = await spawnCorrectProcess(correctScenarios.second);
    expect(response).toMatch(responseStrings['C1-C0-A-R1-R0-A-R0-R0-C1-A']);
  });

  test('should show correct output with args A-A-A-R1-R0-R0-R0-C1-C1-A', async () => {
    const response = await spawnCorrectProcess(correctScenarios.third);
    expect(response).toMatch(responseStrings['A-A-A-R1-R0-R0-R0-C1-C1-A']);
  });

  test('should show correct output with args C1-R1-C0-C0-A-R0-R1-R1-A-C1', async () => {
    const response = await spawnCorrectProcess(correctScenarios.fourth);
    expect(response).toMatch(responseStrings['C1-R1-C0-C0-A-R0-R1-R1-A-C1']);
  });
});
