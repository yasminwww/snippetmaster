const mongoose = require('mongoose')

let snippetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: String
  },
  username: {
    type: String
  }
})

let Snippet = mongoose.model('snippetData', snippetSchema)

module.exports = Snippet
