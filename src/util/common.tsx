
export const splitArr = (arr: any, chunks: any, number: any) =>
 [...Array(chunks)].map((el, index) =>
  arr.filter((n: any, i: any) => i < ((index + 1) * number) && i >= number * index))


export function setAppsInLocalStorage(array: any, key: string) {
 let word = ''
 array.forEach((element: any, index: Number) => {
  if (index === 0) {
   word = word + `${element.name},${element.x},${element.y}`
  }
  else word = word + `☕${element.name},${element.x},${element.y}`
 });
 localStorage.setItem(key, word)
}

export function getAppsInLocalStorage(word: any) {
 let items = localStorage.getItem(word);
 let array
 if (items === null) {
  return []
 }
 else {
  array = items.split('☕').map(el => {
   let item = el.split(',')
   return { name: item[0], x: Number(item[1]), y: Number(item[2]) }
  })
  return array
 }
}