import path from 'path';

const parse = (data, filepath) => {
    const format = path.extname(filepath).toLowerCase();

    if (format === '.json') {
        return JSON.parse(data);
    }

    throw new Error(`Unknown format: '${format}'!`);
};

export default parse;
