import { BaseElement } from "./base-element"; 
export class Input extends BaseElement {
  get typeOf(): string {
    return 'input';
  }
}