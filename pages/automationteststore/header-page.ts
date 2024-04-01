import { BasePage } from "../base-page";
import { Input } from '../../elements/input'
import { Page } from "@playwright/test";
import { Button } from "../../elements/button";
export class HeaderPage extends BasePage{
  public readonly searchButton: Button;
  public readonly searchInput: Input;
  constructor(protected page: Page){
    super(page);
    this.searchInput = new Input( page, 'input#filter_keyword', 'searchInput');
    this.searchButton = new Button(page, 'div[title="Go"]', 'searchButton')
  }
}