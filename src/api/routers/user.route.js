const express = require('express')
const router = express.Router()
const { validateBody, authSignUpSchema, authSignInSchema } = require('../middlewares/validate')
const passport = require('passport')
require('../middlewares/passport')
const UserController = require('../controllers/user.controller')

router
  .post('/signup', validateBody(authSignUpSchema), UserController.SignUp)
  .post(
    '/signin',
    validateBody(authSignInSchema),
    passport.authenticate('local', { session: false }),
    UserController.SignIn
  )
  .get('/secret', passport.authenticate('jwt', { session: false }), UserController.secret)

module.exports = router
