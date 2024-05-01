interface IDataAllure {
  [key:string]:string;
}
export const tagsAllure:IDataAllure = {
  search: "search",
  cart: "cart",
  api: "api",
  favourites: "favourites",
  personalAccount: "personal account"
}

export const featuresAllureUI:IDataAllure = {
  uiCart: "UI корзина",
  uiSearch: 'UI поиск'
}

export const featuresAllureAPI = {
  requestCreatePet: "Запрос create pet"
};