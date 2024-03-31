export function getNameElement<T>(webElement:T):string{
  return Object.keys({webElement})[0];
}