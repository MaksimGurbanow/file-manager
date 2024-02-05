const os = require('os');
const path = require('path');
const { stderr, stdin, stdout, cwd } = require('process');
const { up, cd, ls, cat, add } = require('./nwd');
const { formatTable } = require('./utils');

const username = process.argv[2].slice(process.argv[2].indexOf('=') + 1);

stdout.write(`Welcome to the File Manager, ${username}!\n`);
stdout.write(`You are currently in ${cwd()}\n`);

stdin.on('data', async (data) => {
    const formatedData = data.toString().trim();
    const [command, arg] = formatedData.split(' ');

    switch (command) {
        case '.exit':
            process.exit(0);
        case 'up':
            up(cwd());
            break;
        case 'cd':
            const cdResult = await cd(arg);
            stdout.write(`${cdResult}\n`);
            break;
        case 'ls':
            const lsResult = await ls(cwd());
            stdout.write(`${formatTable(lsResult)}\n`);
            break;
        case 'cat':
            cat(arg)
            break;
        case 'add':
            add(arg)
            break;
        default:
            stderr.write('Invalid input\n');
            break;
    }

    stdout.write(`You are currently in ${cwd()}\n`);
});

process.on('exit', (code) => {
    stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
});

process.on('SIGINT', () => process.exit(0));
