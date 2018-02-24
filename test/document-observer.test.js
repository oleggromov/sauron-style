import DocumentObserver, { getDocumentObserver } from '../src/document-observer'
import { MutationObserverMock } from './helpers'

describe('DocumentObserver', () => {
  global.window.MutationObserver = MutationObserverMock

  let observer, callback, id

  beforeEach(() => {
    observer = new DocumentObserver()
    callback = jest.fn()
    id = observer.addListener(callback)
  })

  it('save and invokes listener', () => {
    observer.invokeAll()
    expect(callback.mock.calls.length).toBe(1)
  })

  it('removes listener and doesn\'t call it again', () => {
    observer.removeListener(id)
    observer.invokeAll()
    expect(callback.mock.calls.length).toBe(0)
  })
})

describe('getDocumentObserver', () => {
  const instance = getDocumentObserver()

  it('returns the same instance', () => expect(getDocumentObserver()).toBe(instance))
})
