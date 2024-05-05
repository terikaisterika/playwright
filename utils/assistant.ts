import { allure } from "allure-playwright"
import { BrowserContext, test } from "@playwright/test"
import {adaptiveBreakpoints, adaptiveBreakpointsOption} from '../utils/pages'
export class Assistant {
  /**
   * Скипит тесты, которые по ширине экрана больше или равны maxWidth
   * @param context context из теста
   * @param maxWidth максимальная ширина, которая подходит для теста
   * @param secondСondition дополнительная информация
   * context['_options'].viewport.width >= minWidth
   */
  static async checkViewportWidthMax(context:BrowserContext, maxWidth:number|adaptiveBreakpointsOption, secondСondition:string=''){
    const addInformation =secondСondition ===''?secondСondition:`Причина: ${secondСondition}`
    if (typeof maxWidth=='number'){
      if (context['_options'].viewport.width >= maxWidth){
        await allure.logStep(`Для экранов с шириной больше ${maxWidth} данный тест не нужен. ${addInformation}`)
        test.skip()
      }
    } else {
      if (context['_options'].viewport.width >= adaptiveBreakpoints[maxWidth].value){
        await allure.logStep(`Для экранов с шириной больше ${adaptiveBreakpoints[maxWidth].value} данный тест не нужен. ${addInformation}`)
        test.skip()
      }
    } 
  }
  /**
   * Скипит тесты, у которых экран меньше minWidth
   * @param context context из теста
   * @param minWidth минимальная ширина, которая подходит для теста
   * context['_options'].viewport.width < minWidth
   */
  static async checkViewportWidthMin(context:BrowserContext, minWidth:number|adaptiveBreakpointsOption, secondСondition:string=''){
    const addInformation =secondСondition ===''?secondСondition:`Причина: ${secondСondition}`
    if (typeof minWidth=='number'){
      
      if (context['_options'].viewport.width < minWidth){
        await allure.logStep(`Для экранов с шириной меньше ${minWidth} данный тест не нужен. ${addInformation}`)
        test.skip()
      }
    } else {
      if (context['_options'].viewport.width < adaptiveBreakpoints[minWidth].value){
        await allure.logStep(`Для экранов с шириной меньше ${adaptiveBreakpoints[minWidth].value} данный тест не нужен. ${addInformation}`)
        test.skip()
      }
    }
  }
  static async skipOneTypeProject(nameProject:string, secondСondition:string=''){
    const addInformation =secondСondition ===''?secondСondition:`Причина: ${secondСondition}`
    if (nameProject!=='chromium'){
      await allure.logStep(`Данный тест только для тестов с ${nameProject}. ${addInformation}`)
        test.skip()
    }
}
}