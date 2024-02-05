import { cwd, stderr, stdout } from "process";
import { formatTable } from "../utils/index.js";
import { arch, cpus, eol, homeDir, sysUsername } from "../osi/index.js";
import calculateHash from "../calcHash/index.js";
import { compress, decompress } from "../zip/index.js";
import { cd, ls, up } from "../nwd/index.js";
import { add, cat, rn, cp, rm, mv } from "../fs/index.js";

const defineCommand = async (command, arg) => {
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
            try {
                const lsResult = await ls(cwd());
                console.log(lsResult);
                stdout.write(`${await formatTable(lsResult)}\n`);
            } catch (error) {
                stderr.write(`Error: ${error.message}\n`);
            }
        case 'cat':
            await cat(arg.join(' '));
            break;
        case 'add':
            await add(arg.join(' '));
            break;
        case 'rn':
            await rn(arg[0], arg[1]);
            break;
        case 'cp':
            await cp(arg[0], arg[1]);
            break;
        case 'rm':
            await rm(arg[0]);
            break;
        case 'mv':
            await mv(arg[0], arg[1]);
            break;
        case 'os':
            switch (arg[0]) {
                case '--EOL':
                    stdout.write(eol() + '\n');
                    break;
                case '--cpus':
                    stdout.write(cpus() + '\n');
                    break;
                case '--homedir':
                    stdout.write(homeDir() + '\n');
                    break;
                case '--username':
                    stdout.write(sysUsername() + '\n');
                    break;
                case '--architecture':
                    stdout.write(arch() + '\n')
                    break;
                default:
                    stderr.write('Invalid input\n');
                    break;
            }
            break;
        case 'hash':
            calculateHash(arg[0])
            break;
        case 'compress':
            await compress(arg[0], arg[1]);
            break;
        case 'decompress':
            await decompress(arg[0], arg[1]);
            break;
        default:
            stderr.write('Invalid input\n');
            break;
    }
}

export { defineCommand };
