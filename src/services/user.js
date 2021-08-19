const User = require('../models/userModel')
const userSchema = require('../schema/userSchema')

module.exports = async (fastify, options) => {
  fastify.addHook('onRequest', async (req, res) => {
    try {
      await req.jwtVerify()
    } catch (err) {
      res.send('Authentication failed')
    }
  }),
    fastify.get('/profile', {}, async (req, res) => {
      res.send(req.user)
    })
}

module.exports.autoPrefix = '/user'
