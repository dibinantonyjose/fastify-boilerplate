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
      console.log(err)
      reply.error({ message: 'Authentication failed' })
    }
  }),
    fastify.get(
      '/profile',
      { schema: userSchema.getProfileSchema },
      async (request, reply) => {
        try {
          const userModel = new User(),
            userId = request.user.userId,
            result = await userModel.getUserById(userId)
          reply.success({ message: 'Success' }, result)
        } catch (err) {
          console.log(err)
          reply.error({
            message: 'Internal Server Error',
            statusCode: 500
          })
        }
      }
    ),
    fastify.post(
      '/sample',
      { schema: sampleSchema.addDataSampleSchema },
      async function (request, reply) {
        try {
          const sampleModel = new Sample(),
            data = request.body,
            userId = request.user.userId,
            result = await sampleModel.addData(data, userId)
          reply.success({ message: 'Added Successfully' }, result)
        } catch (err) {
          console.log(err)
          reply.error({
            message: 'Internal Server Error',
            statusCode: 500
          })
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
            reply.success({ message: 'No Data' })
          } else {
            reply.success({ message: 'Success' }, result)
          }
        } catch (err) {
          console.log(err)
          reply.error({
            message: 'Internal Server Error',
            statusCode: 500
          })
        }
      }
    )
}

module.exports.autoPrefix = '/user'
