import composeUpdate from './composeUpdate'

const updateSecondFn = (model, msg) => {
  switch (msg.type) {
  case 'updateSecond':
    return [{ ...model, property: 'changed' }]
  default:
    return [ model ]
  }
}

const updateSecondMsg = { type: 'updateSecond' }

describe('composeUpdate()',  () => {
  it('generates an update function that delegates correctly', () => {
    const updateMap = {
      first: (model,  msg) => [model, msg],
      second: updateSecondFn
    }

    const model = {
      first: 'unchanged',
      second: {
        property: ''
      }
    }

    const result = composeUpdate(updateMap)

    const expected = {
      first: 'unchanged',
      second: {
        property: 'changed'
      }
    }

    expect(result(model, updateSecondMsg)).toEqual(expected)
  })

  it('allows the same message to operate on different model properties', () => {
    const updateMap = {
      second: updateSecondFn,
      second2: updateSecondFn
    }

    const result = composeUpdate(updateMap)

    const model = {
      second: {},
      second2: {}
    }

    const expected = {
      second: {
        property: 'changed'
      },
      second2: {
        property: 'changed'
      }
    }

    expect(result(model, updateSecondMsg)).toEqual(expected)

  })
})
