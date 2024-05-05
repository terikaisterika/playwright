import {allure} from "allure-playwright"
import { WorkerInfo } from "@playwright/test";
interface IDataAllure {
  [key:string]:string;
}
export const tagsAllure:IDataAllure = {
  search: "search",
  cart: "cart",
  api: "api",
  favourites: "favourites",
  personalAccount: "personal account",
  smoke: "smoke",
  adaptive: "adaptive"
}

export const featuresAllureUI:IDataAllure = {
  uiCart: "UI корзина",
  uiSearch: 'UI поиск'
}

export const featuresAllureAPI:IDataAllure = {
  requestCreatePet: "Запрос create pet"
};
export const suiteAllure:IDataAllure = {
  ui: "UI",
  api: "API",
  adaptive: "ADAPTIVE"
}
