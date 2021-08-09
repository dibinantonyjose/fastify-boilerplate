'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
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

UserSchema.statics = {
  load: async function (options) {
    return this.findOne(options.criteria).select(options.select)
  },
  list: function (options) {
    return this.find(options.criteria)
      .select(options.select)
      .sort({ createdAt: -1 })
      .lean()
      .exec()
  },
  userLogin: async function (data) {
    try {
      const user = await this.findOne({ userName: data.userName })
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
  }
}

module.exports = mongoose.model('User', UserSchema)
