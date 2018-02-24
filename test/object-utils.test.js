import { getDiff, getCopy } from '../src/object-utils'

describe('getDiff', () => {
  const original = { a: 'new', b: 2 }
  const changed = { a: 3, b: 'something' }

  it('returns a diff between objects', () => {
    expect(getDiff(original, changed)).toEqual({
      a: {
        cur: 3,
        prev: 'new'
      },
      b: {
        cur: 'something',
        prev: 2
      }
    })
  })
})

describe('getCopy', () => {
  const source = { a: 'a', b: 2 }
  const copy = getCopy(source)

  it('creates a shallow copy', () => expect(copy).toEqual(source))
  it('returns a different object', () => expect(copy).not.toBe(source))
})
