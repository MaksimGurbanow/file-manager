import { stdout, stderr } from 'process';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

const calculateHash = async (src) => {
    const readableStream = createReadStream(src);
    const hash = createHash('sha256');

    readableStream.on('data', (data) => {
        hash.update(data);
    });

    readableStream.on('end', () => {
        stdout.write('Hash => ' + hash.digest('hex') + '\n');
    });

    readableStream.on('error', (err) => stderr.write(err + '\n'));
};

export default calculateHash;
