'use strict'

const userModel = require('../models/userModel')

const loginControl = async (req, res) => {
  try {
    const userName = req.body.userName,
      querry = { userName: userName },
      options = {
        criteria: querry,
        select: 'userName'
      },
      user = await userModel.load(options)
    if (user == null || user.userName !== userName) {
      const result = await userModel.create(req.body)
      res.send({ message: 'signed', data: result })
    } else {
      const result = await userModel.userLogin(req.body)
      res.send({ message: 'logged', data: result })
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  loginControl
}
