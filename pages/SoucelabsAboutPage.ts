import { BasePage } from "./BasePage";

export class SoucelabsAboutPage extends BasePage{
    constructor(page){
        super(page);
    }

     Navigation = {
        Products: "Products",
        Solutions: "Solutions",
        Pricing: "Pricing",
        Developers: "Developers",
        Resources: "Resources"
    }

    NavigationButton = this.page.locator('//span[contains(@class,"buttonLabelNav")]');

    async getNavigationButtonTextList(){
        await this.NavigationButton.allInnerTexts();
    }

    async hoverNavigationButton(option: string){
        const buttons = await this.NavigationButton.all();
        await buttons.filter(async elt => await elt.textContent() === option).at(0)?.hover();
    }
}