const User = require('../models/userModel')
const userSchema = require('../schema/userSchema')

module.exports = async (fastify, options) => {
  fastify.post(
    '/login',
    { schema: userSchema.loginSchema },
    async (request, reply) => {
      try {
        const userModel = new User(),
          result = await userModel.userLogin(request.body),
          token = fastify.jwt.sign(
            { userId: result._id },
            { expiresIn: process.env.jwtExpiry }
          )
        reply.success({ message: 'Logged In' }, { token })
      } catch (err) {
        console.log(err)
        reply.error({
          message: err.message
        })
      }
    }
  ),
    fastify.post(
      '/signup',
      { schema: userSchema.signupSchema },
      async (request, reply) => {
        try {
          const userName = request.body.userName,
            userModel = new User(),
            user = await userModel.getUserByUserName(userName)
          if (user) {
            reply.error({
              message: 'Already registered user'
            })
          } else {
            const result = await userModel.userCreate(request.body),
              token = fastify.jwt.sign(
                { userId: result._id },
                { expiresIn: process.env.jwtExpiry }
              )
            reply.success({ message: 'Registration Successfull' }, { token })
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
