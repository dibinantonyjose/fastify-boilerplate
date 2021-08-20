const User = require('../models/userModel')
const userSchema = require('../schema/userSchema')

module.exports = async (fastify, options) => {
  fastify.addHook('onRequest', async (request, res) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      res.send('Authentication failed')
    }
  }),
    fastify.get('/profile', {}, async (request, res) => {
      res.send(request.user)
    })
}

module.exports.autoPrefix = '/user'
