import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/automationteststore/home-page';
import {SearchPage} from '../pages/automationteststore/search-page'
import { HeaderPage } from '../pages/automationteststore/header-page';
test('Проверка поиска на automationteststore.com', async({page,context})=>{
  const expectedCookie= {name: 'test', value: 'Terika'}
  const homePage = new HomePage(page);
  const header = new HeaderPage(page);
  homePage.visit('/');
  await context.addCookies([{...expectedCookie, domain: 'automationteststore.com', path: "/"}]);
  await header.searchInput.dataInput('Absolute')
  await header.searchButton.click();
  const searchPage = new SearchPage(page);
  await searchPage.currentUrlIs(new RegExp('product/product&product_id'))
  await searchPage.rightContainer.checkText(/Absolute/)
  
  const cookies = await context.cookies();
  const installedCookie = await cookies.filter((cookie)=>cookie.name == expectedCookie.name);
  expect(installedCookie.length).toBe(1);
  expect(installedCookie[0].value).toBe(expectedCookie.value)
})

  

