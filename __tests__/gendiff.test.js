import { test, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff flat JSON comparison', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');

    const expected = fs.readFileSync(getFixturePath('expected_flat.txt'), 'utf-8').trim();

    expect(genDiff(path1, path2).trim()).toBe(expected);
});
test('genDiff throws error on unknown format', () => {
    const path1 = getFixturePath('file1.txt'); // Файл теперь существует, fs его прочитает
    const path2 = getFixturePath('file2.json');

    expect(() => genDiff(path1, path2)).toThrow();
});


