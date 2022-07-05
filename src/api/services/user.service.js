const User = require('../models/user.model')
const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../../configs/jwt.secret')

const encodedToken = (id) => {
  return JWT.sign(
    {
      iss: 'Bui Dai',
      sub: id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    JWT_SECRET
  )
}

const UserService = {
  signUp: async (body) => {
    const { firstName, lastName, email, password } = body
    const foundUser = await User.findOne({ email })
    if (foundUser) return { noti: 'Email is already in use.' }
    else {
      const newUser = new User({ firstName, lastName, email, password })
      newUser.save()
      return { noti: 'Your registration was successfully.' }
    }
  },
  signIn: (userId) => {
    const token = encodedToken(userId)
    return { noti: 'Your login successfully.', token: token }
  },
  secret: () => {
    return { noti: 'Success to secret.' }
  },
}

module.exports = UserService
