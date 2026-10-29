import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100,
            },
            exclude: [
                'bin/**',
                'vitest.config.js',
                'eslint.config.js',
            ],
        },
    },
});
