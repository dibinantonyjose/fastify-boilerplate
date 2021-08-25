const User = require('../models/userModel')
const userSchema = require('../schema/userSchema')

module.exports = async (fastify, options) => {
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send('Authentication failed')
    }
  }),
    fastify.get('/profile', {}, async (request, reply) => {
      try {
        const userModel = new User(),
          userId = request.user.userId,
          result = await userModel.getUserById(userId)
        reply.send(result)
      } catch (err) {
        reply.send(err)
      }
    })
}

module.exports.autoPrefix = '/user'
