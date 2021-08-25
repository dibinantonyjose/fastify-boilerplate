module.exports = async (fastify, options) => {
  fastify.get('/sample', {}, async function (request, reply) {
    reply.send('Public Sample')
  })
}
