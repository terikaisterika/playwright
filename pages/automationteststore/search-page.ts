import { BasePage } from "../base-page";
import { Input } from '../../elements/input'
import { Button } from '../../elements/button'
import { Locator, Page } from '@playwright/test';
import { Link } from "../../elements/link";
import { BlockLowercaseElements } from "../../elements/block-lowercase-elements";
export class SearchPage extends BasePage{
  /**
   * Карточка товара
   */
  public productСard: BlockLowercaseElements;
  /**
   * Кнопка (элемент ссылка) добавления в корзину в определенной карточке товара
   * Ищется через карточку товара
   */
  public addToCartLink: Locator;
  
  /**
   * Наименование продукта с типом локатор
   * Нужен для кейсов, чтобы сравнивать, что товар добавленный из списка есть в корзине
   */
  public nameProductCard: Locator;
  constructor(protected page: Page) {
    super(page)
    this.getProductCardData(page);
    
    
  }

  async getProductCardData(page:Page){
    this.productСard = new BlockLowercaseElements(page, '//*[@id="maincontainer"]//div[contains(@class, "thumbnails")]/div[1]', 'productCardDiv');
    this.addToCartLink = this.productСard.WebElement.locator('//a[@data-id]');
    this.nameProductCard = this.productСard.WebElement.locator('//a[@class="prdocutname" and @title]')
    
  }
}