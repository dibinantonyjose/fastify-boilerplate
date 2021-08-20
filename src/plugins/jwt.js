const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async (fastify, opts) => {
  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})
