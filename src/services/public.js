'use strict'

const Sample = require('../models/sampleModel')
const sampleSchema = require('../schema/sampleSchema')

module.exports = async (fastify, options) => {
  fastify.get(
    '/sample/list',
    { schema: sampleSchema.listAllSampleDataSchema },
    async function (request, reply) {
      try {
        const sampleModel = new Sample(),
          result = await sampleModel.listAllData()
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
  ),
    fastify.get(
      '/sample/:id',
      { schema: sampleSchema.detailOfSampleData },
      async function (request, reply) {
        try {
          const sampleModel = new Sample(),
            id = request.params.id,
            result = await sampleModel.getDataBySampleId(id)
          if (!result) {
            reply.error({ message: 'Id Not Found', statusCode: 409 })
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
