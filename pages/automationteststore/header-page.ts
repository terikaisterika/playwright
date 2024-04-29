import { BasePage } from "../base-page";
import { Input } from '../../elements/input'
import { Page } from "@playwright/test";
import { Button } from "../../elements/button";
import { Link } from "../../elements/link";
export class HeaderPage extends BasePage{
  /**
   * Ссылка перехода в корзину
   */
  public goToCartLink: Link;
  public readonly searchButton: Button;
  public readonly searchInput: Input;
  constructor(protected page: Page){
    super(page);
    this.searchInput = new Input( page, 'input#filter_keyword', 'searchInput');
    this.searchButton = new Button(page, 'div[title="Go"] i', 'searchButton')
    this.goToCartLink = new Link(page, '//header//ul[contains(@class, "topcart") and contains(@class, "pull-left")]', 'goToCartLink')
  }
}