import { allure } from 'allure-playwright'
import { test, expect} from '../utils/pages'
import { tagsAllure } from '../interfaces/for-allure'
test.describe(`Проверка поиска`, async()=>{
  const wordForSearch = 'Absolute'
  test.beforeEach(async({header})=>{
    await header.visit('/')
  })
  test('Проверка поиска по полному слову', async({header, productPage})=>{
    allure.tag(<tagsAllure>"search")
    await header.searchInput.dataInput(wordForSearch)
    await header.searchButton.click();
    await productPage.currentUrlIs(new RegExp('product/product&product_id'))
    await productPage.rightContainer.checkText(/Absolute/)
  })
  test(`Проверка поиска по части слова. Проверки: 
  переход на страницу /search. 
  Есть товар, содержащий часть слова`, async ({header, searchPage})=>{
    allure.tag(<tagsAllure>"search")
    const partWord = wordForSearch.substring(0, 3);
    await header.searchInput.dataInput(partWord)
    await header.searchButton.click()
    await searchPage.currentUrlIs(new RegExp(`rt=product/search&keyword=${partWord}&category_id=0`))
    await allure.step(`В nameProductCard на странице поиска должен быть товар, 
    содержащий в наименовании ${partWord}`, async()=>{
      await expect(searchPage.nameProductCard).toHaveText(new RegExp(partWord, 'i'))
    })
  })
})
  

