interface Diff {
  prev: any,
  cur: any
}

interface DiffResult {
  [key: string]: Diff
}

interface Object {
  [key: string]: any
}

export const getDiff = (a: Object, b: Object): DiffResult => {
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

export const getCopy = (obj: Object): Object => {
  let result: Object = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  }
  return result
}
