const isLink = (node: HTMLLinkElement): boolean =>
  node.tagName === 'LINK' && node.rel === 'stylesheet'

const isStyle = (node: HTMLElement): boolean =>
  node.tagName === 'STYLE'

const getArray = (list: NodeList): Array<HTMLElement> =>
  Array.prototype.filter.call(list, (node: Node): boolean =>
    isStyle(<HTMLElement>node) || isLink(<HTMLLinkElement>node)
  )

class DocumentObserver {
  private nextId: number
  private observer: MutationObserver
  private listeners: {
    [key: number]: Function
  }

  constructor () {
    this.nextId = 0
    this.listeners = {}
    this.observer = new (<any>window).MutationObserver((mutations: Array<MutationRecord>) =>
      mutations.forEach(this.observe.bind(this))
    )
    this.observer.observe(window.document, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true
    })
  }

  addListener (listener: Function): number {
    this.listeners[this.nextId] = listener
    return this.nextId++
  }

  removeListener (id: number): void {
    delete this.listeners[id]
  }

  invokeAll (): void {
    for (let key in this.listeners) {
      if (this.listeners.hasOwnProperty(key)) {
        this.listeners[key]()
      }
    }
  }

  observe (mutation: MutationRecord): void {
    if (mutation.type === 'childList') {
      this.checkElements(mutation)
    } else if (mutation.type === 'attributes') {
      this.invokeAll()
    }
  }

  checkElements (mutation: MutationRecord): void {
    const added = getArray(mutation.addedNodes)
    const removed = getArray(mutation.removedNodes)

    if (added.length) {
      added.forEach((node: Node) => {
        if (isLink(<HTMLLinkElement>node)) {
          node.addEventListener('load', () => this.invokeAll())
        }

        if (isStyle(<HTMLElement>node)) {
          this.invokeAll()
        }
      })
    }

    if (removed.length) {
      this.invokeAll()
    }
  }
}

let instance: DocumentObserver
const getDocumentObserver = (): DocumentObserver => {
  if (!instance) {
    instance = new DocumentObserver()
  }

  return instance
}

export default DocumentObserver
export { getDocumentObserver }
