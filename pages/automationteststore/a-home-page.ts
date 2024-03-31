import { BasePage } from "../base-page";
import { Input } from '../../elements/input'
import { Button } from '../../elements/button'
import { Page } from '@playwright/test';
export class AHomePage extends BasePage{
  public readonly searchButton: Button;
  public readonly searchInput: Input;
  constructor(public page: Page) {
    super(page);
    this.searchInput = new Input( page, 'input#filter_keyword', 'searchInput');
    this.searchButton = new Button(page, 'div[title="Go"]', 'searchButton')
  }
}