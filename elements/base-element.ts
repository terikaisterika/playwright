import { Page , Locator, expect} from "@playwright/test"
import { allure } from "allure-playwright";
import { Input } from "./input";
export abstract class BaseElement {
  WebElement:Locator;
  Locator:string;
  NameElement:string;
  constructor(page: Page,locator:string, name:string){
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
  
  async checkText(textExpected:string|RegExp){
    await allure.step(`Check text: ${textExpected} in ${this.Locator}. Element: ${this.NameElement}`, async ()=>{
      await expect(this.WebElement).toHaveText(textExpected);
    });
  }
  
}