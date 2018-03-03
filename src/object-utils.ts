export interface DiffResult {
  [key: string]: {
    prev: any,
    cur: any
  }
}

interface AnObject {
  [key: string]: any
}

export const getDiff = (a: AnObject, b: AnObject): DiffResult => {
  let diff: DiffResult = {}
  for (let key in b) {
    if (b.hasOwnProperty(key) && b[key] !== a[key]) {
      diff[key] = {
        prev: a[key],
        cur: b[key]
      }
    }
  }
  return diff
}

export const getCopy = (obj: AnObject): AnObject => {
  let result: AnObject = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  }
  return result
}
