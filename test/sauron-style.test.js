import SauronStyle from '../src/sauron-style'
import { MutationObserverMock, getComputedStyleMock } from './helpers'

describe('SauronStyle', () => {
  global.window.MutationObserver = MutationObserverMock
  global.window.getComputedStyle = getComputedStyleMock

  let node, styleObserver

  beforeEach(() => {
    node = document.documentElement.appendChild(document.createElement('div'))
    styleObserver = new SauronStyle(node)
  })

  it('test', () => {
    expect(typeof styleObserver).toBe('object')
  })
})
