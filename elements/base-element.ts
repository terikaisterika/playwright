import { Page , Locator, expect} from "@playwright/test"
import { allure } from "allure-playwright";
import { Input } from "./input";
export abstract class BaseElement {
  public WebElement:Locator;
  Locator:string;
  NameElement:string;
  constructor(page: Page|Locator,locator:string, name:string){
    
    this.WebElement = page.locator(locator)
    this.Locator = locator;
    this.NameElement = name;
  }
  async click(){
    await allure.step(`Click ${this.Locator}. Name WebElement=${this.NameElement}`, 
    async ()=>{
      await this.WebElement.click();
    })
  }
  
  async checkText(textExpected:string|RegExp|null){ 
    await allure.step(`Check text: ${textExpected} in ${this.Locator}. Element: ${this.NameElement}`, async ()=>{
      if(textExpected === null) throw new Error('Текст для сравнения равен null')
      await expect(this.WebElement).toHaveText(textExpected);
    })
  }

  async checkClientHeight(page){
    await allure.step(`Проверка clientHeight для элемента с локатором ${this.Locator}`, async ()=>{
      const locatorForSearch:string = this.Locator;
      const boolCondition = await page.evaluate(locatorForSearch=>{
      const button = document.querySelector(locatorForSearch);
      console.log('Terika height', button?.clientHeight)
      const result = button === null?false: button.clientHeight > 0;
      console.log('Terika result', locatorForSearch);
      return result;
    }, locatorForSearch);
    expect(boolCondition).toBeTruthy();
    })
  }
  
  // async getInnerElement(page:Page, locator:string){
  //   await allure.step(`Get inner element from `, async ()=>{
  //     this.WebElement.locator(locator);
  //   });
  // }
}