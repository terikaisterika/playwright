import {BasePage} from '../base-page'
import { Input } from '../../elements/input'
import { Button } from '../../elements/button'
import { Page } from '@playwright/test';
import { allure } from 'allure-playwright';
import { getNameElement } from '../../elements/helpers/getNameElement';
export class YaHomePage extends BasePage{
  public readonly searchButton: Button;
  public readonly searchInput: Input;
  constructor(public page: Page) {
    super(page);

    this.searchInput = new Input( page, "//input[@id='text']", 'searchInput');
    this.searchButton = new Button(page, "//button[contains(text(), 'Найти')]", 'searchButton')
  }

  
}