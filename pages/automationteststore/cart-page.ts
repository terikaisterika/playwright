import {BasePage} from '../base-page'
import { Input } from '../../elements/input'
import { Button } from '../../elements/button'
import { Page } from '@playwright/test';
import { Link } from "../../elements/link";
import { BlockLowercaseElements } from '../../elements/block-lowercase-elements';
import { allure } from 'allure-playwright';
import { Locator } from '@playwright/test';
export class CartPage extends BasePage{
  /**
   * tr с данными о продукте
   */
  public productInCartTr: BlockLowercaseElements;
  /**
   * Ссылка с наименованием товара в корзине
   */
  public productNameLink: Link;
  /**
   * Общая цена в
   */
  public totalPriceProduct: Locator;
  /**
   * Общая таблица стоимости
   * Для поиска остальных данных, составляющих стоимость
   * типа Sub-Total, total, flat shipping rate
   */
  public totalPriceTable: BlockLowercaseElements;
  /**
   * Sub-Total в таблице результатов цены totalPriceTable
   */
  public subTotalPriceInTable: Locator;
  /**
   * flatShippingRate в таблице результатов цены totalPriceTable
   */
  public flatShippingRateInTable: Locator;
  /**
   * Общая стоимость в таблице
   */
  public totalPriceInTable: Locator;
  constructor(public page: Page) {
    super(page);
    this.totalPriceTable = new BlockLowercaseElements(page, '//table[@id="totals_table"]', 'totalPriceTable')
    
    this.getProductPriceData();
  }
  /**
   * @param nameProduct наименование продукта товара, добавленного 
   * в корзину на предыдущем шаге. 
   */
  async productCartTr(page, nameProduct:string|null){
    
    await allure.step(`Get tr With product by ${nameProduct}`, async()=>{
      this.productInCartTr = new BlockLowercaseElements( page, `//form[@id="cart"]//a[contains(text(), "${nameProduct}")]/ancestor::tr`, 'searchInput');
    })
    await allure.step(`Get name in product card ${nameProduct}`, async()=>{
      this.productNameLink =new Link(this.productInCartTr.WebElement, `//a[contains(text(), "${nameProduct}")]`, 'productNameLink')
    })
    await allure.step(`Get price in product card ${nameProduct}`, async()=>{
      this.totalPriceProduct = this.productInCartTr.WebElement.locator(`//td[6]`)
    })
  }
  /**
   * Получить результирующие данные из блока цены
   */
  async getProductPriceData(){
    this.subTotalPriceInTable = this.totalPriceTable.WebElement.locator('//tr[1]/td[2]');
    this.flatShippingRateInTable = this.totalPriceTable.WebElement.locator('//tr[2]/td[2]');
    this.totalPriceInTable = this.totalPriceTable.WebElement.locator('//tr[3]/td[2]')
  }
  
  

  
}