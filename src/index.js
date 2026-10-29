import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);

    const data1 = fs.readFileSync(absolutePath1, 'utf-8');
    const data2 = fs.readFileSync(absolutePath2, 'utf-8');

    const obj1 = parse(data1, filepath1);
    const obj2 = parse(data2, filepath2);

    const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

    const lines = keys.map((key) => {
        if (_.has(obj1, key) && !_.has(obj2, key)) {
            return `  - ${key}: ${obj1[key]}`;
        }
        if (!_.has(obj1, key) && _.has(obj2, key)) {
            return `  + ${key}: ${obj2[key]}`;
        }
        if (obj1[key] !== obj2[key]) {
            return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
        }
        return `    ${key}: ${obj1[key]}`;
    });

    return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
