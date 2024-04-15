export class WorkWithText{
  static getPriceFloat(priceText:string|null):number|null{
    if (priceText=== null) throw new Error('Передан null вместо текста с ценой')
    const result = priceText.match(/\d+.\d{2}/g);
    return result?parseFloat(result[0]):null;
  }

  
}