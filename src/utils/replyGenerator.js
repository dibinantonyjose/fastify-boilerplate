const baseStructure = {
  response: {
    statusCode: 200,
    message: null,
    error: false
  },
  data: []
}

module.exports = (data, response) => {
  const baseT = { ...baseStructure }
  baseT.response = { ...baseStructure.response, ...response }
  baseT.data = data
  return baseT
}
