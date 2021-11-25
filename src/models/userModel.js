'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

//Mongoose Hooks for hashing password
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods = {
  getUserByUserName: async userName => {
    const userModel = mongoose.model('User'),
      querry = { userName: userName },
      options = {
        criteria: querry,
        select: 'userName'
      }
    return userModel.load(options)
  },
  userCreate: async data => {
    try {
      const userModel = mongoose.model('User')
      return await userModel.create(data)
    } catch (err) {
      throw err
    }
  },
  userLogin: async function (data) {
    try {
      const userModel = mongoose.model('User'),
        querry = { userName: data.userName },
        options = {
          criteria: querry,
          select: 'userName password'
        }
      const user = await userModel.load(options)
      if (user) {
        const auth = await bcrypt.compare(data.password, user.password)
        if (auth) {
          return user
        }
        throw Error('Incorrect Password')
      }
      throw Error('Incorrect Username')
    } catch (err) {
      throw err
    }
  },
  getUserById: async function (userId) {
    const userModel = mongoose.model('User'),
      querry = { _id: userId },
      options = {
        criteria: querry,
        select: '_id userName name'
      }
    return userModel.load(options)
  }
}

UserSchema.statics = {
  load: function (options) {
    const select = options.select || ' -__v'
    const criteria = options.criteria || {}
    return this.findOne(criteria).select(select)
  },
  list: function (options) {
    const select = options.select || ' -__v'
    const criteria = options.criteria || {}
    return this.find(criteria)
      .select(select)
      .sort({ createdAt: -1 })
      .lean()
      .exec()
  }
}
module.exports = mongoose.model('User', UserSchema)
