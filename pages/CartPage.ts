import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductObj } from "../objects/ProductObj";

export class CartPage extends BasePage{
    constructor(page: Page){
        super(page)    
    }

    ProductMainLocator = this.page.locator('//div[@class="cart_item"]');

    Product = {
        DeleteFromBasketButton: this.page.getByRole('button'),
        Price: this.page.getByTestId('inventory-item-price'),
        Name: this.page.getByTestId('inventory-item-name'),
        Description: this.page.getByTestId('inventory-item-desc'),
        CardQuantity: this.page.getByTestId('item-quantity'),
    }

    Buttons = {
        CheckoutButton: this.page.getByText('Checkout'),
        ContinueShoppingBtn: this.page.getByRole('button', {name: 'continue-shopping'}),
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

    async removeProductFromCart(productName: string){
        const product = this.ProductMainLocator.filter(
            {
                hasText: productName,
            },
        );

        await product.getByRole('button').click();
    }

    async isCartEmpty(){
        const productCount = await this.ProductMainLocator.count();
        return productCount > 0;
    }
}