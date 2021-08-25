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
          reply.send('no data')
        } else {
          reply.send(result)
        }
      } catch (err) {
        reply.send(err)
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
          reply.send(result)
        } catch (err) {
          reply.send(err)
        }
      }
    )
}
