import validateUpdate from './validateUpdate'

describe('validateUpdate()', () => {
  it('will throw if the function does not have an arity of 2', () => {
    const updateFn = (x) => ({})
    expect(() => validateUpdate(updateFn)).toThrow()
  })

  it('will not throw if the function has an arity of 2', () => {
    const updateFn = (x, y) => ({})
    expect(validateUpdate(updateFn)).not.toThrow()
  })
})
