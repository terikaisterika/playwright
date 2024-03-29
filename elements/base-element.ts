import { Page , Locator, expect} from "@playwright/test"
import { allure } from "allure-playwright";
import { Input } from "./input";
export class BaseElement {
  WebElement:Locator;
  Locator:string;
  constructor(page: Page,locator:string){
    this.WebElement = page.locator(locator)
    this.Locator = locator;
  }
  async click(){
    await allure.step(`Click ${this.Locator}`, async ()=>{
      await this.WebElement.click();
    })
  }
  
  async checkText(textExpected:string|RegExp){
    await allure.step(`Check text: ${textExpected} in ${this.Locator} `, async ()=>{
      await expect(this.WebElement).toHaveText(textExpected);
    });
  }
  async dataInput( inputData: string):Promise<void>{
    await allure.step(`Input data: ${this.WebElement}  in element: ${this.WebElement}`, async()=>{
      await this.WebElement.fill(inputData)
    })
  }
}