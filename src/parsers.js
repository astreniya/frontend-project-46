import path from 'path';
import { load } from 'js-yaml';

const parse = (data, filepath) => {
    const format = path.extname(filepath).toLowerCase();

    if (format === '.json') {
        return JSON.parse(data);
    }

    if (format === '.yml' || format === '.yaml') {
        // Вызываем напрямую функцию load
        return load(data);
    }

    throw new Error(`Unknown format: '${format}'!`);
};

export default parse;
