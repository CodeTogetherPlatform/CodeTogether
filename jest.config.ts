import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    roots: ['./tests'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
};

export default config;
