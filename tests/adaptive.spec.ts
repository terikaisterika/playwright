import {test, expect, adaptiveBreakpointsOption } from "../utils/pages"
import {allure} from 'allure-playwright'
import { tagsAllure } from "../interfaces/for-allure";
import { Assistant } from "../utils/assistant";
test.describe('Проверка адаптивности', async()=>{
  test(`В адаптиве переход на страницу из меню.
  Проверки:Клик на кнопку бургер,
  клик на кнопку в выпадающем меню.
  Проверка, что url новой страницы соотвествует выбранной кнопке`, {
    tag: [`@${tagsAllure.adaptive}`, `@${tagsAllure.smoke}`]
  },async ({ header, context },workerInfo) => {
    await allure.parameter('device', workerInfo.project.name)
    await allure.parameter('viewport', context['_options'].viewport )
    await allure.parameter('browser', context['_browser']['_name'] )
    await Assistant.checkViewportWidthMax(context, 'medium')
    await header.visit()
    await header.menuButtonAdaptive.WebElement.tap()
    await header.mainMenuInputAdaptive.isVisible()
    await header.mainMenuInputAdaptive.tap();
    await header.mainMenuInputAdaptive.WebElement.selectOption("https://automationteststore.com/index.php?rt=product/special")
    await header.currentUrlIs(/special$/)
  });
})