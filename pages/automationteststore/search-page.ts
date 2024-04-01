import {BasePage} from '../base-page'
import {BlockLowercaseElements} from '../../elements/block-lowercase-elements'
import { Page } from '@playwright/test';
export class SearchPage extends BasePage{
  public readonly rightContainer: BlockLowercaseElements;
  constructor(public page: Page) {
    super(page);
    this.rightContainer = new BlockLowercaseElements( page, 'div#maincontainer h1[class="productname"] span[class="bgnone"]', 'rightContainerSpan');
  }
}