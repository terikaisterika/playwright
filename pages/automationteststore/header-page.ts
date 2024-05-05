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
  /**
   * Кнопка поиска в поле поиска
   */
  public readonly searchButton: Button;
  /**
   * Поле поиска (для ввода текста)
   */
  public readonly searchInput: Input;
  /**
   * Кнопка меню в адаптивном варианте.
   * В последний раз появлялась при ширине меньше 768px
   */
  public readonly menuButtonAdaptive: Button;
  /**
   * Поле main menu в адаптивном варианте.
   * Обращаться к элементу только после клика на menuButtonAdaptive, (это скрываемый элемент)
   * В последний раз появлялась при ширине меньше 768px
   */
  public readonly mainMenuInputAdaptive: Input;
  public readonly specialsOption:Button;
  constructor(protected page: Page){
    super(page);
    this.searchInput = new Input( page, 'input#filter_keyword', 'searchInput');
    this.searchButton = new Button(page, 'div[title="Go"] i', 'searchButton')
    this.goToCartLink = new Link(page, '//header//ul[contains(@class, "topcart") and contains(@class, "pull-left")]', 'goToCartLink')
    this.menuButtonAdaptive = new Button(page, '//button[@data-target=".navbar-collapse"]', 'menuButtonAdaptive')
    this.mainMenuInputAdaptive = new Input(page, '//*[@id="topnav"]//select', 'mainMenuInputAdaptive');
  }
  async getMenuOptionsAdaptive(selectLocator:string=''){
    return {
      specials: new Button(this.page, `${selectLocator}//option[@value="https://automationteststore.com/index.php?rt=product/special"]`, 'specials')
    }
  }
}