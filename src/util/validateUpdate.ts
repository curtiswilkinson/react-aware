const validateUpdate = (updateFn) => {
  if (updateFn.length !== 2) {
    throw new Error('Update functions must take two arguments: model, and message')
  }

  return updateFn
}

export default validateUpdate
