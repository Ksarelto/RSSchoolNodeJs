import {
  cipherCasearEncoding,
  cipherAtbashEncoding,
} from '../modules/ciphersFuncs.js';
import {
  cipherCasear,
  cipherAtbash,
  cipherROT_8,
  encrypt,
  discrypt,
} from '../modules/helpers/constVariables.js';

describe('Casear cipher test', () => {
  test('should return correct string after Casear cipher encrypt', () => {
    const args = [' Hello   az!', cipherCasear, encrypt];
    expect(cipherCasearEncoding(...args)).toBe(' Ifmmp   ba!');
  });
  test('should return correct string after Casear cipher discript', () => {
    const args = [' Hello   az!', cipherCasear, discrypt];
    expect(cipherCasearEncoding(...args)).toBe(' Gdkkn   zy!');
  });
  test('should return empty string after Casear cipher', () => {
    const args = ['', cipherCasear, discrypt];
    expect(cipherCasearEncoding(...args)).toBe('');
  });
  test('should return correct string after ROT-8 cipher encrypt', () => {
    const args = [' Hello   az!', cipherROT_8, encrypt];
    expect(cipherCasearEncoding(...args)).toBe(' Pmttw   ih!');
  });
  test('should return correct string after ROT-8 cipher discrypt', () => {
    const args = [' Hello   az!', cipherROT_8, discrypt];
    expect(cipherCasearEncoding(...args)).toBe(' Zwddg   sr!');
  });
  test('should return correct string after Atbash cipher encrypt', () => {
    const args = [' Hello   az!', cipherAtbash, encrypt];
    expect(cipherAtbashEncoding(...args)).toBe(' Svool   za!');
  });
  test('should return correct string after Atbash cipher discrypt', () => {
    const args = [' Hello   az!', cipherAtbash, discrypt];
    expect(cipherAtbashEncoding(...args)).toBe(' Svool   za!');
  });
  test('should return empty string after Atbash cipher discrypt', () => {
    const args = ['', cipherAtbash, discrypt];
    expect(cipherAtbashEncoding(...args)).toBe('');
  });
});
