import {test, Page} from '@playwright/test';
import { allure } from 'allure-playwright';
export class BasePage{
  
  constructor(protected page: Page){

  }
  async visit(url: string):Promise<void>{
    await allure.step(`Go to ${url}`, async()=>{
      await this.page.goto(url)
      
    })
  }
  async addCookies(context){}
}