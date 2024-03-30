import { Page } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage'
import { CartPage } from './CartPage'
import {CheckoutPage} from '../pages/CheckoutPage'
import { ProductsPage } from '../pages/ProductsPage'
import { SoucelabsAboutPage } from "./SoucelabsAboutPage";

export class PageManager{
    page: Page;
    loginPage;
    cartPage;
    checkoutPage;
    productsPage;
    soucelabsAboutPage;

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.productsPage = new ProductsPage(page);
        this.soucelabsAboutPage = new SoucelabsAboutPage(page);
    }
}