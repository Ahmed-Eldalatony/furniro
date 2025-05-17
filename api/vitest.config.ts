// Vitest configuration for running tests.
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
      exclude: [
        'node_modules/',
        'dist/',
        'src/index.ts',
        'src/createApp.ts',
        'src/config/',
        'src/types/',
        'src/e2e/',
        '**/*.d.ts',
        '**/*.mock.ts',
      ],
    },
  },
});
