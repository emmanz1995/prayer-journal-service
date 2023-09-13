import { generateId } from './generateId'

describe('generating a unique Id', () => {
  it('should generate a unique Id', () => {
    expect(generateId(20)).toEqual(expect.any(String))
  })

  it('should return undefined', () => {
    expect(generateId(0)).toEqual("")
  })
})