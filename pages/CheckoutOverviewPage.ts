import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class CheckoutOverviewPage extends BasePage{
    constructor(page: Page){
        super(page);
    }

    Locators={
        TotalPrice: this.page.getByTestId('total-label'),
        Tax: this.page.getByTestId('tax-label'),
        BasePrice: this.page.getByTestId('subtotal-label'),
        ShippingInformation: this.page.locator('//div[@data-test="shipping-info-value"]'),
    }

    async getShippingInformation(){
        return await this.Locators.ShippingInformation.innerText();
    }

    async getPrice(){
        let text = await this.Locators.BasePrice.allTextContents();
        return text[0].replace('Item total: $', '');
    }

    async getTax(){
        let text = await this.Locators.Tax.allTextContents();
        return text[0].replace('Tax: $', '');
    }

    async getTotalPrice(){
        let text = await this.Locators.TotalPrice.allTextContents();
        return text[0].replace('Total: $', '');
    }

    async getExpectedTotalPrice(basePrice: number){
        return basePrice*0.08;
    }
}