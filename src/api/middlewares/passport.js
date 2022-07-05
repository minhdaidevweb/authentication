const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const { JWT_SECRET } = require('../../configs/jwt.secret')
const User = require('../models/user.model')

// JWT
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub)
        if (!user) return done(null, false)
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  )
)

// Local
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) return done(null, false)
        const isCorrectPassword = await user.isValidPassword(password)
        if (!isCorrectPassword) return done(null, false)
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  )
)
