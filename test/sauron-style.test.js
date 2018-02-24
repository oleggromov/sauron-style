import SauronStyle from '../src/sauron-style'
import { MutationObserverMock, getComputedStyleMock } from './helpers'

describe('SauronStyle', () => {
  const getComputedStyle = getComputedStyleMock()
  global.window.getComputedStyle = getComputedStyle.fn
  global.window.MutationObserver = MutationObserverMock

  let node, styleObserver, listener

  beforeEach(() => {
    node = document.documentElement.appendChild(document.createElement('div'))
    styleObserver = new SauronStyle(node)
    listener = jest.fn()
    styleObserver.subscribe(listener)
  })

  it('checkDiff without diff doesn\'t call the listener', () => {
    styleObserver.checkDiff()
    expect(listener.mock.calls.length).toBe(0)
  })

  it('checkDiff with diff invokes the listener and passes the right diff', () => {
    getComputedStyle.update({ 'font-family': 'Times New Roman' })
    styleObserver.checkDiff()
    expect(listener.mock.calls.length).toBe(1)
    expect(listener.mock.calls[0][0]).toEqual({
      'font-family': {
        cur: 'Times New Roman',
        prev: undefined
      }
    })
  })
})
