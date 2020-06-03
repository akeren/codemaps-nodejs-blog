const {Schema, model} = require('mongoose')

const postSchema = new Schema({
  title: String,
  subtitle: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = model('Post', postSchema)
