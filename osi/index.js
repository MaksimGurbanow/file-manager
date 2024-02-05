import { EOL, cpus as _cpus, homedir, userInfo, arch as _arch } from 'os';
import { stdout } from 'process';

const eol = () => {
    return JSON.stringify(EOL);
}

const cpus = () => {
    const cpus = _cpus();
    stdout.write('CPU Information:\n');
    cpus.forEach((cpu, index) => {
        stdout.write(`CPU ${index + 1}: ${cpu.model} @ ${cpu.speed / 1000} GHz\n`);
    });
}

const homeDir = () => {
    return homedir();
}

const sysUsername = () => {
    return userInfo().username;
}

const arch = () => {
    return _arch();
};

export {
    arch,
    cpus,
    eol,
    homeDir,
    sysUsername,
}
