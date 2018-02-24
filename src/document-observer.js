const isLink = node => node.tagName === 'LINK'
const isStyle = node => node.tagName === 'STYLE'
const getArray = list => Array.prototype.filter.call(list, node => isStyle(node) || isLink(node))

class DocumentObserver {
  constructor () {
    this.nextId = 0
    this.listeners = {}
    this.observer = new window.MutationObserver(mutations => mutations.forEach(this.observe.bind(this)))
    this.observer.observe(window.document, {
      childList: true,
      subtree: true
    })
  }

  addListener (listener) {
    this.listeners[this.nextId] = listener
    return this.nextId++
  }

  removeListener (id) {
    delete this.listeners[id]
  }

  invokeAll () {
    for (let key in this.listeners) {
      if (this.listeners.hasOwnProperty(key)) {
        this.listeners[key]()
      }
    }
  }

  observe (mutation) {
    const added = getArray(mutation.addedNodes)
    const removed = getArray(mutation.removedNodes)

    if (added.length) {
      added.forEach(node => {
        if (isLink(node)) {
          node.addEventListener('load', () => this.invokeAll())
        }

        if (isStyle(node)) {
          this.invokeAll()
        }
      })
    }

    if (removed.length) {
      this.invokeAll()
    }
  }
}

let instance
const getDocumentObserver = () => {
  if (!instance) {
    instance = new DocumentObserver()
  }

  return instance
}

export default DocumentObserver
export { getDocumentObserver }
