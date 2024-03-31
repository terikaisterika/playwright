import { test, expect} from '@playwright/test';
import { allure } from "allure-playwright";
import { YaHomePage } from '../pages/yan/ya-home-page';
import { YaSearchPage } from '../pages/yan/ya-search-page';
import { AHomePage } from '../pages/automationteststore/a-home-page';
import {ASearchPage} from '../pages/automationteststore/a-search-page'

test('Проверка поиска на automationteststore.com', async({page,context})=>{
  const expectedCookie= {name: 'test', value: 'Terika'}
  const aHomePage = new AHomePage(page);
  aHomePage.visit('/');
  await context.addCookies([{...expectedCookie, domain: 'automationteststore.com', path: "/"}]);
  await aHomePage.searchInput.dataInput('Absolute')
  await aHomePage.searchButton.click();
  const aSearchPage = new ASearchPage(page);
  await aSearchPage.rightContainer.checkText(/Absolute/)
  context.cookies().then((cookies)=>cookies.forEach((cookie)=>console.log('Terika: ',cookie)))
  const cookies = await context.cookies();
  const installedCookie = await cookies.filter((cookie)=>cookie.name == expectedCookie.name);
  expect(installedCookie.length).toBe(1);
  expect(installedCookie[0].value).toBe(expectedCookie.value)
}),
test('Проверка поиска на ya.ru', async({page, context})=>{
  
  const expectedCookie= `test`;
  const yaHomePage = new YaHomePage(page);
  await yaHomePage.visit('https://www.ya.ru');
  await context.addCookies([{name: 'i', value: expectedCookie, domain: 'ya.ru', path: "/"}]);
  await yaHomePage.searchInput.dataInput('компания яндекс');
  await yaHomePage.searchButton.click();
  await page.locator("//button[contains(@title, 'Нет, спасибо')]").click();
  const yaSearchPage = new YaSearchPage(page);
  await yaSearchPage.rightContainer.checkText(/яндекс/i)
})
  

