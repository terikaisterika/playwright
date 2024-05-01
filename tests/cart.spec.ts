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
    allure.step(`Проверка расчетов: 
    totalPrice - FlatShippingRate из таблицы расчета общей стоимости 
    должна быть равна totalPrice из строки товара`,async()=>{
      if (totalPriceInTable === null || flatShippingRateInTable === null) {
        expect(false, `typeof totalPriceInTable: ${typeof totalPriceInTable}, typeof flatShippingRateInTable: ${typeof flatShippingRateInTable}`).toBeTruthy()
      } else {
        expect(totalPriceProductInTr).toBe(totalPriceInTable - flatShippingRateInTable)
      }
    }) 
  })
  test(`Удаление товара из корзины`, async ({cartPage})=>{
    await cartPage.productCartTr(expectedNameProduct);
    await allure.step(`Проверка, что в корзине есть товар с наименованием ${expectedNameProduct}`, async ()=>{
      await expect(cartPage.productInCartTr.WebElement).toBeVisible();
    });
    await allure.step(`Проверка, что в корзине есть блок расчета стоимости`, async ()=>{
      await expect(cartPage.totalPriceTable.WebElement).toBeVisible();
    })
    await allure.step(`Удаление товара из корзины`, async()=>{
      
      await cartPage.deleteButtonInCartTr.click()
    })
    await allure.step(`Проверка, что в корзине нет товара`, async ()=>{
      await expect(cartPage.productInCartTr.WebElement).toHaveCount(0);
    })
    await allure.step(`Проверка, что в корзине нет блока расчета стоимости`, async ()=>{
      await expect(cartPage.totalPriceTable.WebElement).toHaveCount(0);
    })
  })
})