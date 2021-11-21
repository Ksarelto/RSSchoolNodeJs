export const codeOfLastSmallLetter = 122;
export const codeOfFirstSmallLetter = 97;
export const codeBeforeTheFirstSmallLetter = 96;
export const encrypt = 'ENCRYPT';
export const discrypt = 'DISCRYPT';
export const cipherCasear = 'Casear';
export const cipherROT_8 = 'ROT-8';
export const cipherAtbash = 'Atbash';
export const INPUT = ['-i', '--input'];
export const OUTPUT = ['-o', '--output'];
export const CONFIG = ['-c', '--config'];
export const regExString = new RegExp('[a-z]', 'gi');
export const regExOptions = new RegExp(
  '(^--input$)|(^--output$)|(^--config$)|(^-i$)|(^-o$)|(^-c$)',
  'g'
);
export const regExArgs = new RegExp('[CR][01]{1}', 'g');
export const cipherCasearStep = 1;
export const cipherROT_8_Step = 8;
