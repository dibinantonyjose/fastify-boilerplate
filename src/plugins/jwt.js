const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async (fastify, opts) => {
  fastify.decorate('authenticate', async function (req, res) {
    try {
      await req.jwtVerify()
    } catch (err) {
      res.send(err)
    }
  })
})
