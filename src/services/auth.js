const User = require('../models/userModel')
const userSchema = require('../schema/userSchema')

module.exports = async (fastify, options) => {
  fastify.post(
    '/login',
    { schema: userSchema.loginSchema },
    async (request, reply) => {
      try {
        const userName = request.body.userName,
          userModel = new User(),
          user = await userModel.getUserByUserName(userName)
        if (user == null || user.userName !== userName) {
          let result = await userModel.userCreate(request.body),
            token = fastify.jwt.sign(
              { userId: result._id },
              { expiresIn: process.env.jwtExpiry }
            )
          reply.send({ message: 'Signed In', data: token })
        } else {
          const result = await userModel.userLogin(request.body),
            token = fastify.jwt.sign(
              { userId: result._id },
              { expiresIn: process.env.jwtExpiry }
            )
          reply.send({ message: 'Logged In', data: token })
        }
      } catch (err) {
        console.log(err)
      }
    }
  )
}
