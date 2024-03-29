import {BasePage} from './base-page'
import {Div} from '../elements/div'
import { Page } from '@playwright/test';
import { allure } from 'allure-playwright';
export class YaSearchPage extends BasePage{
  public readonly rightContainer: Div;
  constructor(public page: Page) {
    super(page);
    this.rightContainer = new Div( page, 'div#maincontainer h1[class="productname"] span[class="bgnone"]');
  }
}