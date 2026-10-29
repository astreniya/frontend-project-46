#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .helpOption('-h, --help', 'display help for command')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format', 'stylish') // Добавили дефолт
    .action((filepath1, filepath2, options) => {
        const result = genDiff(filepath1, filepath2, options.format);
        console.log(result);
    });

program.parse(process.argv);
