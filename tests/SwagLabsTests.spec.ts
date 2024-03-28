import { test } from '../tests/BaseTest.spec'
import { expect } from '@playwright/test';
import { ProductObj } from "../objects/ProductObj";
import * as dotenv from 'dotenv'

dotenv.config();

const productName = 'Sauce Labs Fleece Jacket';
const testCaseId = 'TC_01';

test.afterEach(async ({page})=>{
    await page.close();
});

test('Buy smth', async ({ pageManager }) => {
    const filterOptions: [] = await pageManager.productsPage.getAllFilterOptions();
    const expectedFilterOptions = await pageManager.productsPage.FilterOptions;
    expect(filterOptions, 'Check filter options').toEqual(expect.arrayContaining(Object.values(expectedFilterOptions))); 

    //Verify products
    let expectedProducts:ProductObj[] = await pageManager.productsPage.readProductObjectsFromJson();
    let actualProducts:ProductObj[] = await pageManager.productsPage.getProductsFromShop();
    expect(actualProducts, 'Products should be equal').toEqual(expectedProducts); 

    //Add a product to the cart
    await pageManager.productsPage.addProductToCart(productName);
    expect(await pageManager.productsPage.isProductAddedToCart(productName), 'Product should be added to the cart').toEqual(true);

    //Filter by a price(from low to high)
    await pageManager.productsPage.filterBy(pageManager.productsPage.FilterOptions.PriceLowToHigh);
    actualProducts = await pageManager.productsPage.getProductsFromShop();
    let actualPrices: number[] = actualProducts
                                .map(product=>product.price)
                                .map(price=>price.replace('$', ''))
                                .map(price=>Number(price));
    let sortedPrices: number[] = expectedProducts
                                .map(product=>product.price)
                                .map(price=>price.replace('$', ''))
                                .map(price=>Number(price))
                                .sort(function(a, b){return a - b});
    expect(actualPrices, 'Products should be sorted by price(low to high)').toEqual(sortedPrices);

    //Verify the product in the cart
    await pageManager.productsPage.goToCart();
    const actualCartQuantity = await pageManager.cartPage.getCardQuantity();
    expect(actualCartQuantity).toEqual('1');
    let products: ProductObj[] = await pageManager.cartPage.getProductsFromCart();
    expect(products.at(0), 'List of pdoducts should be equal').toEqual(expectedProducts[3]);

    //Fill and check personal infromation
    await pageManager.cartPage.checkout();
    await pageManager.checkoutPage.fillBuyerInformation(testCaseId);
    const actualPersonalInformation = await pageManager.checkoutPage.getPersonalInformation();
    const expectedPersonalInformation = await pageManager.checkoutPage.readBuyerObjectsFromCsv(testCaseId);
    expect(actualPersonalInformation, 'Personal data should be equal').toEqual(expectedPersonalInformation);
});