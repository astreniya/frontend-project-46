import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);

    const data1 = fs.readFileSync(absolutePath1, 'utf-8');
    const data2 = fs.readFileSync(absolutePath2, 'utf-8');

    const obj1 = parse(data1, filepath1);
    const obj2 = parse(data2, filepath2);

    const tree = buildTree(obj1, obj2);

    return format(tree, formatName);
};

export default genDiff;
