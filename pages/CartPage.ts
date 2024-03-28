import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductObj } from "../objects/ProductObj";

export class CartPage extends BasePage{
    constructor(page: Page){
        super(page)    
    }

    Product = {
        DeleteFromBasketButton: this.page.locator('//button[@id="remove-sauce-labs-backpack"]'),
        Price: this.page.locator('//div[@class="inventory_item_price"]'),
        Name: this.page.locator('//div[@class="inventory_item_name"]'),
        Description: this.page.locator('//div[@class="inventory_item_desc"]'),
        CardQuantity: this.page.locator('//div[@class="cart_quantity"]'),
    }

    Buttons = {
        CheckoutButton: this.page.locator('//button[@id="checkout"]'),
        ContinueShoppingBtn: this.page.locator('//button[@id="continue-shopping"]')
    }

    async continueShopping(){
        await this.Buttons.ContinueShoppingBtn.click();
    }

    async checkout(){
        await this.Buttons.CheckoutButton.click();
    }
    
    async getCardQuantity(){
        return await this.Product.CardQuantity.textContent();
    }

    async getProductsFromCart(){
        let products: ProductObj[] = [];

        let arraySize  = (await this.Product.Name.all()).length;
        for(let i=0; i<arraySize; i++){
            let name = await this.Product.Name.nth(i).innerText();
            let description = await this.Product.Description.nth(i).innerText();
            let price = await this.Product.Price.nth(i).innerText();
            let product: ProductObj = new ProductObj(name, description, price);
            products.push(product);
        }
        return products;
    }
}