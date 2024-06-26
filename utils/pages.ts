import {test as base, BrowserContext} from '@playwright/test';
import { HeaderPage } from '../pages/automationteststore/header-page';
import { ProductPage } from '../pages/automationteststore/product-page';
import { HomePage } from '../pages/automationteststore/home-page';
import { CartPage } from '../pages/automationteststore/cart-page';
import { SearchPage } from '../pages/automationteststore/search-page';
import { allure } from 'allure-playwright';

type adaptiveBreakpointsType = {
  [key:string]:{
    value: number,
    description:string
  }
}
/**
 * Для сравнений Breakpoints ширины.
 * Появление и пропадание некоторых элементов будет зависеть от ширины экрана.
 * Точки нужны для сравнений с context['_options'].viewport - шириной экрана в тесте
 */
export const adaptiveBreakpoints= {
  xSmall: {
    value: 576,
    description: 'xSmall < 576px'
  },
  small: {
    value: 576,
    description: 'small >= 768px'
  },
  medium: {
    value: 768,
    description: 'medium >= 768px'
  },
  large: {
    value: 992,
    description: 'large >= 992px'
  }
}
export type adaptiveBreakpointsOption = keyof typeof adaptiveBreakpoints;


type pages = {
  header: HeaderPage;
  productPage: ProductPage;
  homePage: HomePage;
  cartPage: CartPage;
  searchPage: SearchPage;
  adaptiveBreakpoints: adaptiveBreakpointsType;
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
  },
  adaptiveBreakpoints: async ({}, use)=>{
    await use(adaptiveBreakpoints);
  }
})

export const expect = base.expect;