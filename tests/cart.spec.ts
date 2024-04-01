import { BaseElement } from "../elements/base-element";
import { CartPage } from "../pages/automationteststore/cart-page";
import { HomePage } from "../pages/automationteststore/home-page";
import {test, expect } from "@playwright/test"
import defineConfig  from "@playwright/test";
test.describe('Work with cart', async ()=>{
  test('Добавление товара в корзину и сверка наименования', async ({page})=>{
    const homePage = new HomePage(page);
    await homePage.visit('/');
    await homePage.getProductCardData(page)
    const expectedNameProduct = await homePage.nameProductCard.textContent();
    await homePage.addToCartLink.click();
    await homePage.goToCartLink.click();
    const cartPage = new CartPage(page);
    await cartPage.currentUrlIs(new RegExp('checkout/cart'))
    await cartPage.productCartTr(page, expectedNameProduct);
    await cartPage.productNameLink.checkText(expectedNameProduct)
  })
})