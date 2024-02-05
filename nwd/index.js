const { createReadStream, createWriteStream } = require("fs");
const { readdir, stat, access } = require("fs/promises");
const path = require("path");
const { stderr, stdout } = require("process");

const up = (dir) => {
    try {
        const parentPath = path.dirname(dir);
        process.chdir(parentPath);   
    } catch (error) {
        stderr.write('Operation Failed\n');
    }
}

const cd = (newPath) => {
    try {
        process.chdir(newPath);
        return `Changed directory to ${newPath}`;
    } catch (error) {
        stderr.write('Operation Failed\n');
        return error.message;
    }
}

const ls = async (dir) => {
    try {
        const files = await readdir(dir);
        const content = await Promise.all(files.map(async (file) => {
            const fullPath = path.join(dir, file);
            const fileType = (await stat(fullPath)).isDirectory() ? 'directory' : 'file';
            return [file, fileType];
        }));

        return content
    } catch (error) {
        stderr.write('Operation Failed\n');
        return `Error: ${error.message}`;
    }
}

const cat = (path) => {
    const readStream = createReadStream(path);


    readStream.on('data', (data) => {
        process.stdout.write(data);
    });

    readStream.on('end', () => {
        stdout.write('File reading completed.\n');
    });

    readStream.on('error', (err) => {
        stderr.write(`Error reading file: ${err.message}\n`);
    });
}

const add = async (fileName) => {
    const filePath = `./${fileName}`;

    try {
        await access(filePath);
        stderr.write('Operation Failed: File already exists\n');
    } catch (error) {
        if (error.code === 'ENOENT') {
            const writeStream = createWriteStream(filePath);

            writeStream.end();

            writeStream.on('finish', () => {
                stdout.write(`File "${fileName}" created successfully.\n`);
            });

            writeStream.on('error', (err) => {
                stderr.write(`Error creating file: ${err.message}\n`);
            });
        } else {
            stderr.write('Operation Failed\n');
            stderr.write(error.message);
        }
    }
};

module.exports = {
    up,
    cd,
    ls,
    cat,
    add,

}
