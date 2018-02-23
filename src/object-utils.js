export const getDiff = (a, b) => {
  let diff = {}
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

export const getCopy = obj => {
  let result = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  }
  return result
}
