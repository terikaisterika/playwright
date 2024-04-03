import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/automationteststore/home-page';
import {SearchPage} from '../pages/automationteststore/search-page'
import { HeaderPage } from '../pages/automationteststore/header-page';

test('Проверка поиска по полному слову', async({page,context})=>{
  const header = new HeaderPage(page);
  await header.visit('/')
  
  await header.searchInput.checkClientHeight(page)
  await header.searchInput.dataInput('Absolute')
  //await expect(header.searchButton.WebElement).toBeVisible();
  await header.searchButton.checkClientHeight(page)
  await header.searchButton.click();
  const searchPage = new SearchPage(page);
  await searchPage.currentUrlIs(new RegExp('product/product&product_id'))
  await searchPage.rightContainer.checkText(/Absolute/)
})

  

