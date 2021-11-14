# Ciphering CLI Tool

It is an application of command line. It is tool that encode and decode ONLY laters of latin alphabet by 3 substitution ciphers: Casear, ROT-8, Atbash. All other symbols remain unchanged.

## Instalation

1. Download files from repository.
2. Open downloaded folder in your IDE, or using command line.
3. Open command ine or terminal in your IDE and install dependencies using 'npm install' or 'npm i'
4. Application is ready to go.

## How use

You need to enter in the terminal following code: 'node index.js [options]' , where 'options' are command line parameters that looks like:

-c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:  
 X is a cipher mark:  
 C is for Caesar cipher (with shift 1)  
 A is for Atbash cipher  
 R is for ROT-8 cipher  
 Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)  
 1 is for encoding  
 0 is for decoding  
-i, --input: a path to input file  
-o, --output: a path to output file  
For example, config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

## Example

$ node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"

Before:

> input.txt
> 'This is secret. Message about "\_" symbol!'

> output.txt
> "empty"

After:

> input.txt
> 'This is secret. Message about "\_" symbol!'

> output.txt
> 'Myxn xn nbdobm. Tbnnfzb ferlm "\_" nhteru!'
