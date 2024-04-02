import {test, Page, expect} from '@playwright/test';
import { allure } from 'allure-playwright';
export class BasePage  {
  
  constructor(protected page: Page){

  }
  async visit(url: string):Promise<void>{
    await allure.step(`Go to ${url}`, async()=>{
      await this.page.goto(url, {waitUntil: 'domcontentloaded'})
      
    })
  }
  async currentUrlIs(partUrl:string |RegExp){
    await allure.step(`The url must contain ${partUrl}. Current url: ${this.page.url()}`, async()=>{
      await expect(this.page).toHaveURL(partUrl);
      
    })
  }

  
}