const fastifyPlugin = require('fastify-plugin')
const replyGenerator = require('../utils/replyGenerator')

module.exports = fastifyPlugin(async function (fastify, opts, next) {
  fastify.decorateReply('success', function (response = {}, data = []) {
    response.error = response.error || false
    response.message = response.message || 'Success'

    this.type('application/json')
    this.send(replyGenerator(data, response))
  })
  fastify.decorateReply('error', function (response = {}) {
    response.statusCode = response.statusCode || 400
    response.error = response.error || true
    response.message = response.message || 'Error'

    this.code(response.statusCode)
    this.type('application/json')
    this.send(replyGenerator([], response))
  })
  next()
})
