import { allure } from "allure-playwright";
import {test, expect } from "../utils/pages"
import { WorkWithText } from "../elements/helpers/workWithText";
import { WorkWithErrors } from "../elements/helpers/workWithErrors";
import { tagsAllure, featuresAllureUI } from "../interfaces/for-allure";
test.describe('Work with cart', {tag: '@корзина'},async ()=>{
  
  let expectedNameProduct:string|null;
  test.beforeEach(async({header, homePage})=>{
    await allure.feature(featuresAllureUI.uiCart);
    await allure.tag(tagsAllure.cart)
    await homePage.visit('/');
    expectedNameProduct = await homePage.nameProductCard.textContent();
    await WorkWithErrors.checkForNull(expectedNameProduct, 'expectedNameProduct');
    await homePage.addToCartLink.click();
    await header.goToCartLink.click();
  })
  test('Cверка наименования в корзине', async ({cartPage})=>{
    await cartPage.currentUrlIs(new RegExp('checkout/cart'))
    await cartPage.productCartTr(expectedNameProduct);
    await allure.step(`В productNameLink должен быть текст ${expectedNameProduct}`, async ()=>{
      if(expectedNameProduct === null) throw new Error('Текст для сравнения равен null')
      await expect(cartPage.productNameLink).toHaveText(expectedNameProduct)
    })
    
  })
  test('Cверка стоимости в строке товара и в результате', async ({cartPage})=>{
    await cartPage.currentUrlIs(new RegExp('checkout/cart'))
    await cartPage.productCartTr(expectedNameProduct);
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