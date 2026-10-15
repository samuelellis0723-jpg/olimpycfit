import { defineConfig } from 'vitest/config';
export default defineConfig({test:{environment:'node',fileParallelism:false,testTimeout:15000,hookTimeout:60000,env:{DATABASE_URL:'file:./test.db',NODE_ENV:'test'}}});
