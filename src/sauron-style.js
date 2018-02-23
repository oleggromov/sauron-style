import { getDiff, getCopy } from './object-utils'
import { getDocumentObserver } from './document-observer'

const MutationObserver = window.MutationObserver
const getComputedStyle = window.getComputedStyle

class SauronStyle {
  constructor(node) {
    this.node = node
    this.checkDiff = this.checkDiff.bind(this)
    this.mutationObserver = new MutationObserver(this.checkDiff)
    this.mutationObserver.observe(this.node, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['style', 'class']
    })

    this.computedStyle = getComputedStyle(this.node)
    this.style = this.getStyle()

    this.documentObserver = getDocumentObserver()
    this.listenerId = this.documentObserver.addListener(this.checkDiff)
  }

  destroy() {
    this.mutationObserver.disconnect()
    this.documentObserver.removeListener(this.listenerId)
  }

  subscribe(fn) {
    this.subscriber = fn
  }

  checkDiff(mutations, instance) {
    const newStyle = this.getStyle()
    const diff = getDiff(this.style, newStyle)

    if (Object.keys(diff).length) {
      if (this.subscriber) {
        this.subscriber(diff)
      }
      this.style = newStyle
    }
  }

  getStyle() {
    return getCopy(this.computedStyle)
  }
}

export default SauronStyle
