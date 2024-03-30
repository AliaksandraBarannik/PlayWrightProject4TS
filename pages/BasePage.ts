import {Page} from '@playwright/test';
import { Products } from '../data/products.json'
import { ProductObj } from "../objects/ProductObj";
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { BuyerObj } from "../objects/BuyerObj";

export class BasePage{
    readonly page: Page;
    readonly pageLocator: string;

    constructor(page: Page){
        this.page = page;
    }

    MenuOptions = {
        AllItems: "All Items",
        About: "About",
        Logout: "Logout",
        ResetAllState: "Reset All State"
    }

    MenuLocators = {
        OpenMenuLocator: 'button#react-burger-menu-btn',
        MenuOptionLocator: '//a[@class="bm-item menu-item"]',
        CloseMenuButton: 'button#react-burger-cross-btn',
        ParentOptionLocator: '//nav[@class="bm-item-list"]',
    }

    Cart = 'a.shopping_cart_link';

    async openMenu() {
        await this.page.locator(this.MenuLocators.OpenMenuLocator).click();
    }

    async closeMenu() {
        await this.page.locator(this.MenuLocators.CloseMenuButton).click();
    }

    async getTextFromMenuOptions() {
        return  await this.page.locator(this.MenuLocators.ParentOptionLocator).allTextContents();
    }

    async goToMenu(menuOption: string) {
        //let option = (await this.page.$$(this.MenuLocators.MenuOptionLocator))
        //            .find(async option => await option.innerText() === menuOption);
        let options = await this.page.locator(this.MenuLocators.MenuOptionLocator).all();
        for(let option of options){
            console.log('navigation option inner text is ' + option.innerText());
            console.log('navigation option text content is ' + option.textContent());

            if((await option.innerText()) === menuOption){
                await option.click();
                break;
            }
        }
    }

    async readProductObjectsFromJson() {
        let products: ProductObj[] = [];

        for(let i=0;i<Products.length;i++){
            let product: ProductObj = new ProductObj(Products[i].name, Products[i].description, Products[i].price);
            await products.push(product);
        }
        return products;
    }
    
    async goToCart() {
        await this.page.locator(this.Cart).click();
    }

    async readBuyerObjectsFromCsv(testCaseId: string) {
        let buyer;
        const buyerInformationCsv = parse (fs.readFileSync(path.join(__dirname, "../data/buyerInformation.csv")),
            {
                columns:true,
                skip_empty_lines:true,
            });

        for(const record of buyerInformationCsv){
            if(record.TestCaseId === testCaseId){

                buyer = new BuyerObj(record.FirstName, record.LastName, record.PostalCode);
                break;
            }
        }
        return buyer;
    }
}