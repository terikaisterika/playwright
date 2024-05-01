interface IDataAllure {
  [key:string]:string;
}
export const tagsAllure:IDataAllure = {
  search: "search",
  cart: "cart",
  api: "api",
  favourites: "favourites",
  personalAccount: "personal account",
  smoke: "smoke"
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
  api: "API"
}