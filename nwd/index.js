import { readdir, stat} from "fs/promises";
import { dirname, join } from "path";
import { stderr } from "process";

const up = (dir) => {
    try {
        const parentPath = dirname(dir);
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
            const fullPath = join(dir, file);
            const fileType = (await stat(fullPath)).isDirectory() ? 'directory' : 'file';
            return [file, fileType];
        }));

        return content
    } catch (error) {
        stderr.write('Operation Failed\n');
        return `Error: ${error.message}`;
    }
}



export {
    up,
    cd,
    ls,
}
