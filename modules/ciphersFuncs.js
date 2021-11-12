import {
  cipherCasear,
  encrypt,
  codeOfFirstSmallLetter,
  codeOfLastSmallLetter,
  codeBeforeTheFirstSmallLetter,
  cipherCasearStep,
  cipherROT_8_Step,
  regExString,
} from './helpers/constVariables.js';

export const cipherCasearEncoding = (str, cipher, mode) => {
  const strArray = str.split('');
  const shift = cipher === cipherCasear ? cipherCasearStep : cipherROT_8_Step;
  const shiftFromMode = mode === encrypt ? shift : -shift;

  return strArray
    .map((word) => {
      if (word === '') return word;

      return word
        .split('')
        .map((char) => {
          if (!char.match(regExString)) return char;

          const charToLowerCase = char.toLowerCase();
          const isLowerCase = char === charToLowerCase;
          const charCode = charToLowerCase.charCodeAt(0);
          let resultChar;

          if (charCode + shiftFromMode > codeOfLastSmallLetter) {
            resultChar = String.fromCharCode(
              ((charCode + shiftFromMode) % codeOfLastSmallLetter) +
                codeBeforeTheFirstSmallLetter
            );
          } else if (charCode + shiftFromMode < codeOfFirstSmallLetter) {
            resultChar = String.fromCharCode(
              codeOfLastSmallLetter -
                (codeBeforeTheFirstSmallLetter - (charCode + shiftFromMode))
            );
          } else {
            resultChar = String.fromCharCode(charCode + shiftFromMode);
          }

          return isLowerCase ? resultChar : resultChar.toUpperCase();
        })
        .join('');
    })
    .join('');
};

export const cipherAtbashEncoding = (str) => {
  const strArray = str.split('');
  return strArray
    .map((word) => {
      if (word === '') return word;

      return word
        .split('')
        .map((char) => {
          if (!char.match(regExString)) return char;

          const charToLowerCase = char.toLowerCase();
          const isLowerCase = char === charToLowerCase;
          const charCode = charToLowerCase.charCodeAt(0);
          const resultChar = String.fromCharCode(
            codeOfLastSmallLetter - charCode + codeOfFirstSmallLetter
          );
          return isLowerCase ? resultChar : resultChar.toUpperCase();
        })
        .join('');
    })
    .join('');
};
