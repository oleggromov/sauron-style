export const MutationObserverMock = () => ({ observe: () => {} })
export const getComputedStyleMock = () => {
  let style = {}
  return {
    fn: () => style,
    update: newStyle => {
      for (let key in newStyle) {
        if (newStyle.hasOwnProperty(key)) {
          style[key] = newStyle[key]
        }
      }
    }
  }
}
