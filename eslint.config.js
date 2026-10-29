import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
        rules: {
            'no-console': 'off',
            'no-underscore-dangle': 'off',
            'import/extensions': 'off',
        },
    },
    {
        ignores: ['node_modules/', 'package-lock.json'],
    },
];