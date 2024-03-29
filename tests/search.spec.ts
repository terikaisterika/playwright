import { test, expect} from '@playwright/test';
import { allure } from "allure-playwright";
import { YaHomePage } from '../pages/ya-home-page';
import { YaSearchPage } from '../pages/ya-search-page';
  test('search automationteststore.com', async({page,context})=>{
    await allure.description('Проверка поиска на automationteststore.com')
    await allure.tags('searchTest')
    await allure.suite('old feature')
    await allure.feature('main search')
    await page.goto('https://automationteststore.com/')
    await context.addCookies([{name: 'test', value: 'Terika', domain: 'automationteststore.com', path: "/"}]);
    await page.locator('input#filter_keyword').fill('Absolute')
    await page.locator('div[title="Go"]').click();
    await expect(page.locator('div#maincontainer h1[class="productname"] span[class="bgnone"]')).toHaveText(/Absolute/)
    context.cookies().then((cookies)=>cookies.forEach((cookie)=>console.log('Terika: ',cookie)))
    const cookies = await context.cookies();
    const installedCookie = await cookies.filter((cookie)=>cookie.name == 'test');
    expect(installedCookie.length).toBe(1);
    expect(installedCookie[0].value).toBe('Terika')
  }),
  test('search ya.ru', async({page, context})=>{
    await allure.description('Проверка поиска на ya.ru')
    await allure.tags('searchTest');
    await allure.suite('old feature')
    await allure.feature('main search')
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
  

