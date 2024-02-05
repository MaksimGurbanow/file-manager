const os = require('os');
const path = require('path');
const { stderr, stdin, stdout } = require('process');

const username = process.argv[2].slice(process.argv[2].indexOf('=') + 1);

stdout.write(`Welcome to the File Manager, ${username}!\n`);
stdout.write(`You are currently in ${process.cwd()}\n`);

stdin.on('data', (data) => {
    stdout.write(`You are currently in ${process.cwd()}\n`);

    const formatedData = data.toString().trim();

    switch (formatedData) {
        case '.exit':
            process.exit(0);
            break;
        case 'hui':
            stdout.write('Ty hui\n');
        default:
            stderr.write('Invalid input')
            break;
    }
})

process.on('exit', (code) => {
    stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
});

process.on('SIGINT', () => process.exit(0));
