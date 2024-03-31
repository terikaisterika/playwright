import { BaseElement } from "./base-element";
import { IBaseElementInput } from "./ibase-element-input";
import { allure } from "allure-playwright";

export class Input extends BaseElement implements IBaseElementInput{
  get typeOf(): string {
    return 'input';
  }
  /**
  * Вставка данных в элементы инпутов и textarea
  */
  async dataInput( inputData: string):Promise<void>{
    await allure.step(`Input data: ${this.WebElement} in element: ${this.WebElement}. Web element: ${this.NameElement}`, async()=>{
      await this.WebElement.fill(inputData)
    })
  }
}