const User = require('../models/userModel')
const userSchema = require('../schema/userSchema')

module.exports = async (fastify, options) => {
  fastify.post(
    '/login',
    { schema: userSchema.loginSchema },
    async (req, res) => {
      try {
        const userName = req.body.userName,
          userModel = new User(),
          user = await userModel.getUserByUserName(userName)
        if (user == null || user.userName !== userName) {
          let result = await userModel.userCreate(req.body),
            token = fastify.jwt.sign(
              { userId: result._id },
              { expiresIn: process.env.jwtExpiry }
            )
          res.send({ message: 'Signed In', data: token })
        } else {
          const result = await userModel.userLogin(req.body),
            token = fastify.jwt.sign(
              { userId: result._id },
              { expiresIn: process.env.jwtExpiry }
            )
          res.send({ message: 'Logged In', data: token })
        }
      } catch (err) {
        console.log(err)
      }
    }
  )
}
