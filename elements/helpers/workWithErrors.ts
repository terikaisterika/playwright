import { expect } from "@playwright/test";
import { allure } from "allure-playwright";
export class WorkWithErrors{
  /**
   * Проверка значения на null. Для важных тестообразующих данных, 
   * без которых дальнейший тест не имеет смысла
   * @param elementForCheck элемент для сверки
   * @param nameElement наименование элемента, который поможет понять, что искали
   * @param locatorElement локатор для элемента, если это веб элемент
   */
   static async checkForNull<T>(elementForCheck:T, nameElement = 'Веб элемент', locatorElement='Не указан'){
    allure.step(`Проверка основообразующих элементов для теста на null`, async ()=>{
      if (elementForCheck === null){
        expect(false, `${nameElement} равен null. Проверьте локатор: ${locatorElement}`).toBeTruthy();
      } 
    })
  }
  
}