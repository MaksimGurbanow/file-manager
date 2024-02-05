import { createReadStream, createWriteStream, unlink } from 'fs';
import { stderr } from 'process';
import { createGzip, createUnzip } from 'zlib';

const compress = async (src, dest) => {
    const readableStream = createReadStream(src);
    const gZip = createGzip();
    const writableStream = createWriteStream(dest);

    readableStream.pipe(gZip).pipe(writableStream);

    writableStream.on('finish', () => {
        unlink(src, (err) => {
            if (err) {
                stderr.write(err + '\n');
            }
        });
    });
};

const decompress = async (src, dest) => {
    const readableStream = createReadStream(src);
    const unZip = createUnzip();
    const writableStream = createWriteStream(dest);

    readableStream.pipe(unZip).pipe(writableStream);

    writableStream.on('finish', () => {
        unlink(src, (err) => {
            if (err) {
                stderr.write(err + '\n');
            }
        });
    });
};

export {
    compress,
    decompress,
}