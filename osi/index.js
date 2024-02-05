const os = require('os');
const { stdout } = require('process');

const eol = () => {
    return JSON.stringify(os.EOL);
}

const cpus = () => {
    const cpus = os.cpus();
    stdout.write('CPU Information:\n');
    cpus.forEach((cpu, index) => {
        stdout.write(`CPU ${index + 1}: ${cpu.model} @ ${cpu.speed / 1000} GHz\n`);
    });
}

const homeDir = () => {
    return os.homedir();
}

const sysUsername = () => {
    return os.userInfo().username;
}

const arch = () => {
    return os.arch();
};

module.exports = {
    arch,
    cpus,
    eol,
    homeDir,
    sysUsername,
}
