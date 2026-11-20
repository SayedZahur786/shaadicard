import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:60000,workers:1,use:{baseURL:process.env.TEST_BASE_URL||'http://127.0.0.1:3024',trace:'retain-on-failure'},webServer:process.env.TEST_BASE_URL?undefined:{command:'npm run start',url:'http://127.0.0.1:3024',reuseExistingServer:true,timeout:60000},reporter:'list'});
