const User = require('../models/userModel')
const authControl = require('../controls/authControl')

module.exports = async (fastify, options) => {
  fastify.post('/login', authControl.loginControl)
}
