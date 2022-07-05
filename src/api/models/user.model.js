const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  decks: [{ type: Schema.Types.ObjectId }],
})

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const passwordHashed = await bcrypt.hash(this.password, salt)
    this.password = passwordHashed
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

const User = mongoose.model('User', UserSchema)

module.exports = User
