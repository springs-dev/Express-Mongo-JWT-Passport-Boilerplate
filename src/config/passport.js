/* eslint-disable comma-dangle */
const passport = require('passport')
const passportJwt = require('passport-jwt')
const jsonWebToken = require('jsonwebtoken')
const randToken = require('rand-token')

passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    (payload, done) => done(null, payload)
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.createAndSaveAuthTokens = async (user, req) => {
  const payload = {
    id: user._id,
    role: user.role,
    name: user.name,
  }
  const accessToken = jsonWebToken.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '4h',
  })
  const refreshToken = randToken.uid(255)

  user.refreshToken = refreshToken
  user.lastLoginAt = Date.now()
  user.lastGeoIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress
  await user.save()

  return {
    userId: user._id,
    accessToken,
    refreshToken,
    name: user.name,
    role: user.role,
  }
}

module.exports = passport
