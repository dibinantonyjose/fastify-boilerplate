'use strict'

// read .env files
require('dotenv').config()

// require the framework
const Fastify = require('fastify')({ logger: true })

// Require external modules
const path = require('path')
const AutoLoad = require('fastify-autoload')
const oas = require('fastify-oas')

Fastify.register(oas)

Fastify.listen(process.env.port || 3000, process.env.host || '0.0.0.0', err => {
  if (err) {
    Fastify.log.error(err)
    process.exit(1)
  }
})
