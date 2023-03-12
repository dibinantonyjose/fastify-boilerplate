const fastifyPlugin = require('fastify-plugin')
const mongoose = require('mongoose')

module.exports = fastifyPlugin(async () => {
  try {
    const url = process.env.mongoURI
    if (url) {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log('Database is connected')
    } else {
      console.log('Error connecting database')
    }
  } catch (err) {
    console.log(err)
  }
})
