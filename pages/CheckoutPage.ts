import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BuyerObj } from "../objects/BuyerObj";

export class CheckoutPage extends BasePage{
    constructor(page: Page){
        super(page);
    }
    
    Information = {
        FirstName: this.page.locator('//input[@id="first-name"]'),
        LastName: this.page.locator('//input[@id="last-name"]'),
        PostalCode: this.page.locator('//input[@id="postal-code"]'),
    }

    Buttons = {
        ContinueButton: this.page.locator('//input[@id="continue"]'),
        CancelButton: this.page.locator('//button[@id="cancel"]'),
    }

    async fillBuyerInformation(testCaseId: string) {
        const buyer = await this.readBuyerObjectsFromCsv(testCaseId);
        await this.Information.FirstName.fill(await buyer.getFirstName());
        await this.Information.LastName.fill(await buyer.getLastName());
        await this.Information.PostalCode.fill(await buyer.getPostalCode());
    }

    async continue(){
        await this.Buttons.ContinueButton.click();
    }

    async getPersonalInformation(){
        let firstName = await this.Information.FirstName.getAttribute('value');
        let lastName = await this.Information.LastName.getAttribute('value');
        let postalCode = await this.Information.PostalCode.getAttribute('value');
        return await new BuyerObj(firstName!, lastName!, postalCode!); 
    }

    async clickCancel(){
        await this.Buttons.CancelButton.click();
    }
}