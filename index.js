import process from 'process';
import { getArgsFromCommandLine } from './modules/arguments.js';
import { streamsPipe } from './modules/streams/streamsPipe.js';

const commandLineArguments = getArgsFromCommandLine(process.argv.slice(2));
streamsPipe(...commandLineArguments);
