/* args.js
@Author: Daniel Flockert
Checks arguments passed via command line
*/


// define log level default value
const loglevelDefault = 'info';
// set group heading
let loglevelGroup = `Log Level [default: "--${loglevelDefault}]`;

// set argv with yargs
module.exports = require('yargs')

    // set usage message
    .usage(`$0 [--trace | --debug | --info | --warn | --error | --fatal] [-h | --help] [--version]`)

    // set example message
    .example(`$0 --info`)

    // set options
    .options({

        'trace': {
            describe: 'log option - log tracing outputs, debug outputs, information, warnings, errors and fatal errors',
            demandOption: false,
            group: loglevelGroup
        },
        'debug': {
            describe: 'log option - log debug outputs, information, warnings, errors and fatal errors',
            demandOption: false,
            group: loglevelGroup
        },
        'info': {
            describe: 'log option - log information, warnings, errors and fatal errors',
            demandOption: false,
            group: loglevelGroup
        },
        'warn': {
            describe: 'log option - log warnings, errors and fatal errors',
            demandOption: false,
            group: loglevelGroup
        },
        'error': {
            describe: 'log option - log errors and fatal errors',
            demandOption: false,
            group: loglevelGroup
        },
        'fatal': {
            describe: 'log option - log fatal errors',
            demandOption: false,
            group: loglevelGroup
        }
    })

    // map help command
    .help('h')
    .alias('h', 'help')

    // set yargs language
    .locale('en')

    // check the debug options
    .check(function (argv) {
        let loglevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
        let loglevelSetCount = 0;
        for (let i = 0; i < loglevels.length; i++) {
            // check if the given loglevel matches a possible loglevel
            if (argv[loglevels[i]]) {
                loglevelSetCount++;
                argv.loglevel = loglevels[i];
            }
        }
        // set log level to default if it was not passed by user
        if (loglevelSetCount === 0) {
            argv.loglevel = loglevelDefault;
        }
        if (loglevelSetCount > 1) {
            throw 'Too many debug options given!';
        }
        return true;
    }, true)

    // end yargs with .argv
    .argv;