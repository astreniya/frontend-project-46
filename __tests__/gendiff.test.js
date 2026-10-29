import { test, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('genDiff recursive JSON comparison', () => {
    const expected = readFile('expected_recursive.txt');
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')).trim()).toBe(expected);
});

test('genDiff recursive YAML comparison', () => {
    const expected = readFile('expected_recursive.txt');
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml')).trim()).toBe(expected);
});

test('genDiff throws error on unknown format', () => {
    expect(() => genDiff(getFixturePath('file1.txt'), getFixturePath('file2.json'))).toThrow();
});

test('genDiff throws error on unknown output format', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    expect(() => genDiff(path1, path2, 'invalid_format')).toThrow();
});

test('stylish formatter throws error on unknown node type', () => {
    const badTree = [{ key: 'key', type: 'unknown_type' }];
    expect(() => stylish(badTree)).toThrow();
});
test('genDiff plain JSON comparison', () => {
    const expected = readFile('expected_plain.txt');
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain').trim()).toBe(expected);
});

test('genDiff plain YAML comparison', () => {
    const expected = readFile('expected_plain.txt');
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain').trim()).toBe(expected);
});
test('plain formatter throws error on unknown node type', () => {
    const badTree = [{ key: 'key', type: 'unknown_type' }];
    expect(() => plain(badTree)).toThrow();
});
test('genDiff json format output validity', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');

    const result = genDiff(path1, path2, 'json');

    expect(() => JSON.parse(result)).not.toThrow();

    const parsed = JSON.parse(result);
    expect(Array.isArray(parsed)).toBe(true);
});