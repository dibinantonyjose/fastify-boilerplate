'use strict'
// require external modules
require('dotenv').config()
const Fastify = require('fastify')({ logger: true })
const path = require('path')
const AutoLoad = require('fastify-autoload')
const oas = require('fastify-oas')

// register fastify ecosystem plugins
Fastify.register(oas)

// register custom plugins
Fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins')
})

Fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'services'),
  options: Object.assign({ prefix: '/api' })
})

// start server
Fastify.listen(process.env.port || 3000, process.env.host || '0.0.0.0', err => {
  if (err) {
    Fastify.log.error(err)
    process.exit(1)
  }
})
