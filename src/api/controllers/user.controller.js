const UserService = require('../services/user.service')

const UserController = {
  SignUp: async (req, res, next) => {
    const result = await UserService.signUp(req.body)
    const { noti } = result
    res.status(200).json(noti)
  },
  SignIn: async (req, res, next) => {
    const result = UserService.signIn(req.user._id)
    const { noti, token } = result
    res.setHeader('Authorization', token)
    res.status(200).json(noti)
  },
  secret: async (req, res, next) => {
    const result = UserService.secret()
    const { noti } = result
    res.status(200).json(noti)
  },
}

module.exports = UserController
