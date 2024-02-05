import { stderr, stdin, stdout, cwd } from 'process';
import { defineCommand } from './defineCommand/index.js';

const username = process.argv[2].slice(process.argv[2].indexOf('=') + 1);

stdout.write(`Welcome to the File Manager, ${username}!\n`);
stdout.write(`You are currently in ${cwd()}\n`);

stdin.on('data', async (data) => {
    const formatedData = data.toString().trim();
    const [command, ...arg] = formatedData.split(' ');

    await defineCommand(command, arg)

    stdout.write(`You are currently in ${cwd()}\n`);
});

process.on('exit', (code) => {
    stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
});

process.on('SIGINT', () => process.exit(0));
