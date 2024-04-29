import {test as base } from '@playwright/test';
import { HeaderPage } from '../pages/automationteststore/header-page';
import { ProductPage } from '../pages/automationteststore/product-page';
import { HomePage } from '../pages/automationteststore/home-page';
import { CartPage } from '../pages/automationteststore/cart-page';
import { SearchPage } from '../pages/automationteststore/search-page';
type pages = {
  header: HeaderPage;
  productPage: ProductPage;
  homePage: HomePage;
  cartPage: CartPage;
  searchPage: SearchPage;
}
/**
 * Содержит страницы header, productPage,
 * homePage, cartPage, searchPage
 */
export const test = base.extend<pages>({
  header: async ({page}, use)=>{
    await use(new HeaderPage(page))
  },
  productPage: async ({page}, use)=>{
    await use(new ProductPage(page))
  },
  homePage: async ({page}, use)=>{
    await use (new HomePage(page))
  }, 
  cartPage: async ({page}, use)=>{
    await use(new CartPage(page))
  },
  searchPage: async ({page}, use)=>{
    await use(new SearchPage(page))
  }
})

export const expect = base.expect;