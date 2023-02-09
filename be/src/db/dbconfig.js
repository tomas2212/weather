const mongoose = require('mongoose')
const config = require('config')
const dbconfig = config.get('mongoURI')

mongoose.set('strictQuery', false)

const connectDB = async () => {
  try {
    await mongoose.connect(dbconfig, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true
      // useFindAndModify: false
    })
    console.log('Mongo DB connected...')
    // const xxx = mongoose.get('patients')
    // console.log('xxx', xxx)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB
