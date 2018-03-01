import { getDiff, getCopy, DiffResult } from './object-utils'
import { getDocumentObserver, default as DocumentObserver } from './document-observer'

class SauronStyle {
  private node: HTMLElement
  private mutationObserver: MutationObserver
  private computedStyle: CSSStyleDeclaration
  private style: Object
  private subscriber: Function|null = null
  private documentObserver: DocumentObserver
  private listenerId: number

  constructor (node: HTMLElement) {
    this.node = node
    this.checkDiff = this.checkDiff.bind(this)
    this.mutationObserver = new (<any>window).MutationObserver(this.checkDiff)
    this.mutationObserver.observe(this.node, {
      attributes: true,
      attributeFilter: ['style', 'class']
    })

    this.computedStyle = window.getComputedStyle(this.node)
    this.style = this.getStyle()

    this.documentObserver = getDocumentObserver()
    this.listenerId = this.documentObserver.addListener(this.checkDiff)
  }

  destroy (): void {
    this.mutationObserver.disconnect()
    this.documentObserver.removeListener(this.listenerId)
  }

  subscribe (fn: Function): void {
    this.subscriber = fn
  }

  checkDiff (): void {
    const newStyle = this.getStyle()
    const diff: DiffResult = getDiff(this.style, newStyle)

    if (Object.keys(diff).length) {
      if (this.subscriber) {
        this.subscriber(diff)
      }
      this.style = newStyle
    }
  }

  getStyle (): Object {
    return getCopy(this.computedStyle)
  }
}

export default SauronStyle
