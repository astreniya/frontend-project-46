import path from 'path';
import { load } from 'js-yaml';

const parse = (data, filepath) => {
    const format = path.extname(filepath).toLowerCase();

    switch (format) {
        case '.json':
            return JSON.parse(data);
        case '.yml':
        case '.yaml':
            return load(data);
        default:
            throw new Error(`Unknown format: '${format}'!`);
    }
};

export default parse;
