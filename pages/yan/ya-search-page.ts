import {BasePage} from '../base-page'
import {BlockLowercaseElements} from '../../elements/block-lowercase-elements'
import { Page } from '@playwright/test';
import { allure } from 'allure-playwright';
export class YaSearchPage extends BasePage{
  public readonly rightContainer: BlockLowercaseElements;
  constructor(public page: Page) {
    super(page);
    this.rightContainer = new BlockLowercaseElements( page, '//div[@id="search-result-aside"]//div[@role="heading" and @aria-level="2"]', 'rightContainerSpan');
  }
}