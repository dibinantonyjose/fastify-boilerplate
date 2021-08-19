exports.options = {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Nodejs Fastify Mongo Boilerplate',
      description: `</br>
          <b>In most cases a success response will be in the following structure</b>
          <pre><code>
            {
              "response": {
                &nbsp;&nbsp;"statusCode": 200,
                &nbsp;&nbsp;"message": "Success",
                &nbsp;&nbsp;"error": false
              },
              "data": []
          </code></pre>`
    },
    host: process.env.SWAGGER_DOMAIN || 'localhost:3000',
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
}
