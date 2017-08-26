const composeUpdate = (updateMap): (model, msg) => any => {
  return (model, msg) => {
    return Object.keys(updateMap).reduce((acc, key) => {
      const subUpdate = updateMap[key]
      acc[key] = subUpdate(model[key], msg)[0]

      return acc
    }, {})
  }
}

export default composeUpdate
