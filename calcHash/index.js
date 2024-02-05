const path = require('path');
const { stdout, stderr } = require('process');
const { createReadStream } = require('fs');
const crypto = require('crypto');

const calculateHash = async (src) => {
    const readableStream = createReadStream(src);
    const hash = crypto.createHash('sha256');

    readableStream.on('data', (data) => {
        hash.update(data);
    });

    readableStream.on('end', () => {
        stdout.write('Hash => ' + hash.digest('hex') + '\n');
    });

    readableStream.on('error', (err) => stderr.write(err + '\n'));
};

module.exports = calculateHash;
