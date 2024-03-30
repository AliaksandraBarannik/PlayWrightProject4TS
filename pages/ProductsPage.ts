import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductObj } from "../objects/ProductObj";

export class ProductsPage extends BasePage{
    constructor(page: Page){
        super(page);
    }

    FilterOptions = {
        NameAZ: 'Name (A to Z)',
        NameZA: 'Name (Z to A)',
        PriceLowToHigh: 'Price (low to high)',
        PriceHightToLow: 'Price (high to low)',
    }

    Filter = this.page.locator('select.product_sort_container');

    Product = {
        AddToCardButton: this.page.locator('//button[contains(@id,"add-to-cart")]'),
        Price: this.page.locator('div.inventory_item_price'),
        Name: this.page.locator('//div[@class="inventory_item_name "]'),
        Description: this.page.locator('div.inventory_item_desc'),
        Image: this.page.locator('img.inventory_item_img'),
    }

    async filterBy(option: string) {
        await this.Filter.selectOption(option);
    }

    async getAllFilterOptions(){
        const list = await this.Filter.locator('//option').allTextContents();
        return list;
    }

    async addProductToCart(productName: string) {
        const position = await this.getProductPosition(productName);
        if(position >- 1){
            await this.Product.AddToCardButton.nth(position).click();
        }
    }

    async isProductAddedToCart(productName: string){
        const productCard = this.page.locator('//div[@data-test="inventory-item"]').filter(
            {
                hasText: productName,
            },
        );
        const button = productCard.getByRole('button');
        return await button.textContent() === 'Remove';
    }

    async getProductPosition(productName: string){
        const items = await this.Product.Name.all();
        let position = -1;
        for (const [index, item] of items.entries()) {
            if (await item.textContent() === productName) {
                position = index;
                break;
            }
        }
        return position;
    }

    async getProductsFromShop(){
        let products: ProductObj[] = [];

        let arraySize = (await this.Product.Name.all()).length;
        for(let i=0; i<arraySize; i++){
            let name = await this.Product.Name.nth(i).innerText();
            let description = await this.Product.Description.nth(i).innerText();
            let price = await this.Product.Price.nth(i).innerText();
            let product: ProductObj = new ProductObj(name, description, price);
            products.push(product);
        }
        return products;
    }

    //just to learn
    async getDateTime(){
        let year = new Date().getFullYear().toString();
        let date = new Date().getDate().toString();
        let time = new Date().getTime().toString();
        console.log('Today is ' + date,', year is:' + year, ', current time is ' + time);
    }
}