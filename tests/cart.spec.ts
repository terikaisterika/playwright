import { BaseElement } from "../elements/base-element";
import { CartPage } from "../pages/automationteststore/cart-page";
import { HomePage } from "../pages/automationteststore/home-page";
import {test, expect } from "@playwright/test"
import { WorkWithText } from "../elements/helpers/workWithText";
import { WorkWithErrors } from "../elements/helpers/workWithErrors";
test.describe('Work with cart', async ()=>{
  let expectedNameProduct:string|null;
  test.beforeEach(async({page})=>{
    const homePage = new HomePage(page);
    await homePage.visit('/');
    await homePage.getProductCardData(page)
    expectedNameProduct = await homePage.nameProductCard.textContent();
    //expectedNameProduct = null
    await WorkWithErrors.checkForNull(expectedNameProduct, 'expectedNameProduct');
    await homePage.addToCartLink.click();
    await homePage.goToCartLink.click();
  })
  test('Cверка наименования в корзине', async ({page})=>{
    const cartPage = new CartPage(page);
    await cartPage.currentUrlIs(new RegExp('checkout/cart'))
    await cartPage.productCartTr(page, expectedNameProduct);
    await cartPage.productNameLink.checkText(expectedNameProduct)
    
  })
  test('Cверка стоимости в строке товара и в результате', async ({page})=>{
    const cartPage = new CartPage(page);
    await cartPage.currentUrlIs(new RegExp('checkout/cart'))
    await cartPage.productCartTr(page, expectedNameProduct);
    //await cartPage.productNameLink.checkText(expectedNameProduct)
    const totalPriceProductInTr= WorkWithText.getPriceFloat(await cartPage.totalPriceProduct.textContent());
    await WorkWithErrors.checkForNull(totalPriceProductInTr, 'totalPriceProductInTr')
    const flatShippingRateInTable = WorkWithText.getPriceFloat(await cartPage.flatShippingRateInTable.textContent());
    const totalPriceInTable = WorkWithText.getPriceFloat(await cartPage.totalPriceInTable.textContent());
    if (totalPriceInTable === null || flatShippingRateInTable === null) {
      expect(false, `typeof totalPriceInTable: ${typeof totalPriceInTable}, typeof flatShippingRateInTable: ${typeof flatShippingRateInTable}`).toBeTruthy()
    } else {
      expect(totalPriceProductInTr).toBe(totalPriceInTable - flatShippingRateInTable)
    } 
  })
})