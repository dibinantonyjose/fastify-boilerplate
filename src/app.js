'use strict'
// require external modules
require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const path = require('path')
const autoLoad = require('@fastify/autoload')
const oas = require('fastify-oas')
const jwt = require('@fastify/jwt')
const swagger = require('./utils/swagger')
const cors = require('@fastify/cors')

// register fastify ecosystem plugins
fastify.register(cors, {
  origin: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true
})
fastify.register(oas, swagger.options)
fastify.register(jwt, {
  secret: process.env.jwtSecret
})

// register custom plugins
fastify.register(autoLoad, {
  dir: path.join(__dirname, 'plugins')
})

fastify.register(autoLoad, {
  dir: path.join(__dirname, 'services'),
  options: Object.assign({ prefix: '/api' })
})

// start server
fastify.listen({ port: process.env.port || 3000 }, err => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
