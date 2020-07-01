const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
// user
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function (next) {
  // Only hash if the password has been modified or is new.
  if (!this.isModified('password')) return next()
  bcrypt.genSalt(saltRounds)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(err => console.log(err))
})

// to compare the password given
userSchema.methods.comparePassword = function (inputPassword, callback) {
  bcrypt.compare(inputPassword, this.password)
    .then((res) => callback(null, res))
    .catch(callback)
}

let User = mongoose.model('Users', userSchema)

module.exports = User
