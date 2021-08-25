'use strict'

const User = require('../models/userModel')
const Sample = require('../models/sampleModel')
const userSchema = require('../schema/userSchema')
const sampleSchema = require('../schema/sampleSchema')

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
    }),
    fastify.post(
      '/sample',
      { schema: sampleSchema.addDataSampleSchema },
      async function (request, reply) {
        try {
          const sampleModel = new Sample(),
            data = request.body,
            userId = request.user.userId,
            result = await sampleModel.addData(data, userId)
          reply.send(result)
        } catch (err) {
          reply.send(err)
        }
      }
    ),
    fastify.get(
      '/sample',
      { schema: sampleSchema.listUserSampleDataSchema },
      async function (request, reply) {
        try {
          const sampleModel = new Sample(),
            userId = request.user.userId,
            result = await sampleModel.listAllDataByUser(userId)
          if (result.length === 0) {
            reply.send('no data')
          } else {
            reply.send(result)
          }
        } catch (err) {
          reply.send(err)
        }
      }
    )
}

module.exports.autoPrefix = '/user'
