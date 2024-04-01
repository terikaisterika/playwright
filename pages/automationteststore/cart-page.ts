import {BasePage} from '../base-page'
import { Input } from '../../elements/input'
import { Button } from '../../elements/button'
import { Page } from '@playwright/test';
import { Link } from "../../elements/link";
import { BlockLowercaseElements } from '../../elements/block-lowercase-elements';
import { allure } from 'allure-playwright';
import { Locator } from '@playwright/test';
export class CartPage extends BasePage{
  public productInCartTr: BlockLowercaseElements;
  public productNameLink: Link;
  public totalPriceProduct: Locator;
  public totalPriceTable: BlockLowercaseElements;
  public subTotalPriceInTable: Locator;
  public flatShippingRate: Locator;
  constructor(public page: Page) {
    super(page);
    this.totalPriceTable = new BlockLowercaseElements(page, '//table[@id="totals_table"]', 'totalPriceTable')
    this.subTotalPriceInTable = this.totalPriceTable.WebElement.locator('//tr[1]/td[2]');
    this.flatShippingRate = this.totalPriceTable.WebElement.locator('//tr[2]/td[2]');
    this.totalPriceProduct = this.totalPriceTable.WebElement.locator('//tr[3]/td[2]')
  }

  async productCartTr(page, nameProduct:string|null){
    
    await allure.step(`Get tr With product by ${nameProduct}`, async()=>{
      this.productInCartTr = new BlockLowercaseElements( page, `//form[@id="cart"]//a[contains(text(), "${nameProduct}")]/ancestor::tr`, 'searchInput');
    })
    await allure.step(`Get name in product card ${nameProduct}`, async()=>{
      this.productNameLink =new Link(this.productInCartTr.WebElement, `//a[contains(text(), "${nameProduct}")]`, 'productNameLink')
    })
    await allure.step(`Get price in product card ${nameProduct}`, async()=>{
      this.totalPriceProduct = this.productInCartTr.WebElement.locator('/td[5]')
    })
  }
  
  

  
}