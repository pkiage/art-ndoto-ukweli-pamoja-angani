import { getClonesHeight, getScrollPos } from '../../src/util'
import * as fc from 'fast-check'

describe('Get current scroll position', () => {
  const input = (bottom, top) => ({
    pageYOffset: bottom,
    clientTop: top
  })
  it('gets the current position of a page', () => {
    fc.assert(
      fc.property(fc.nat(), fc.nat(), (bottom, top) => {
        expect(getScrollPos(input(bottom, top))).toBe(bottom - top)
      })
    )
  })
})

describe('Get clones height', () => {
  it('zero clones', () => {
    expect(getClonesHeight([])).toBe(0)
  })
  it('single clones', () => {
    fc.assert(fc.property(fc.array(fc.nat()), (heights) => {
      for (const height of heights) {
        expect(getClonesHeight([{ offsetHeight: height }])).toBe(height)
      }
    }))
  })
  it('multiple clones', () => {
    fc.assert(fc.property(fc.array(fc.nat()), (heights) => {
      const clones = heights.map(h => ({ offsetHeight: h }))
      const totalHeight = heights.reduce((a, b) => a + b, 0)
      expect(getClonesHeight(clones)).toBe(totalHeight)
    }))
  })
})

