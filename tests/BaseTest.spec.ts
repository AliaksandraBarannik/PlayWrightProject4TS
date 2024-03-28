import { test as base} from '@playwright/test';
import { PageManager } from '../pages/PageManager'
import * as dotenv from 'dotenv'

dotenv.config();

type MyFixtures = {
    pageManager: PageManager;
}

export const test = base.extend<MyFixtures>({
    
    page: async({page}, use)=>{
        await page.goto(String(process.env.BASE_URL));
        await use(page);
    },

    pageManager: async ({page}, use)=>{
        const pageManager = new PageManager(page);
        await pageManager.loginPage.login(process.env.USER_NAME, process.env.PASSWORD);
        await use(pageManager);
    }
});