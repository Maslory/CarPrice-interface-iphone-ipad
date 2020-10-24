
 export const splitArr = (arr: any, chunks: any, number: any) => 
 [...Array(chunks)].map((el, index) =>
  arr.filter((n: any, i: any) => i < ((index + 1) * number) && i >= number * index ))

