const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide your Username'],
    unique: [true, 'Username already exist']
  },
  email: {
    type: String,
    required: [true, 'Please provide your Email address'],
    unique: [true, 'Email address already exist']
  },
  fullname: {
    type: String,
    required: [true, 'Please provide your Fyllname']
  },
  password: {
    type: String,
    required: [true, 'Enter your password']
  }
})

// ENCRYPT PLAIN TEXT PASSWORD
userSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.password, 10, (error, encryptedPassword) => {
    user.password = encryptedPassword
    next()
  })
})

module.exports = model('User', userSchema)
