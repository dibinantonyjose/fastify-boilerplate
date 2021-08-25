'use strict'

const mongoose = require('mongoose')

const SampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: String,
    required: true
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'user' }
})

SampleSchema.methods = {
  addData: async function (data, userId) {
    try {
      const Sample = mongoose.model('Sample'),
        sampleModel = new Sample()
      sampleModel.name = data.name
      sampleModel.age = data.age
      sampleModel.user = userId
      return await sampleModel.save()
    } catch (err) {
      throw err
    }
  },
  getDataBySampleId: async function (id) {
    const sampleModel = mongoose.model('Sample'),
      querry = { _id: id },
      options = {
        criteria: querry
      }
    return sampleModel.load(options)
  },
  listAllDataByUser: async function (userId) {
    const sampleModel = mongoose.model('Sample'),
      querry = { user: userId },
      options = {
        criteria: querry,
        select: ''
      }
    return sampleModel.list(options)
  },
  listAllData: async function () {
    const sampleModel = mongoose.model('Sample'),
      options = {
        criteria: {},
        select: ''
      }
    return sampleModel.list(options)
  }
}

SampleSchema.statics = {
  load: function (options) {
    return this.findOne(options.criteria).select(options.select)
  },
  list: function (options) {
    return this.find(options.criteria)
      .select(options.select)
      .sort({ createdAt: -1 })
      .lean()
      .exec()
  }
}
module.exports = mongoose.model('Sample', SampleSchema)
