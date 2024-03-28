import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{

    constructor(page: Page){
        super(page);
    }

    Elements = {
        UserName: this.page.locator('//input[@id="user-name"]'),
        Password: this.page.locator('//input[@id="password"]'),
        LoginButton: this.page.locator('//input[@id="login-button"]'),
        Logo: this.page.locator('//div[@class="login_logo"]'),
    };

    async login(userName: string, password: string){
        await this.Elements.UserName.waitFor();
        await this.Elements.UserName.fill(userName);
        await this.Elements.Password.fill(password);
        await this.Elements.LoginButton.click();
    }

    async getLogoText(){
        return await this.Elements.Logo.innerText();
    }
}