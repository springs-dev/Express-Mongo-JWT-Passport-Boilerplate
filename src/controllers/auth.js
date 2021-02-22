const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const { createAndSaveAuthTokens } = require('../config/passport')

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name })

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      res.status(400).json({ message: 'No such user or password is invalid' })
      return
    }

    const tokenData = await createAndSaveAuthTokens(user, req)
    res.json(tokenData)
  } catch (e) {
    next(e)
  }
})

router.post('/refresh', async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
      refreshToken: req.body.refreshToken,
    })
    if (!user) return res.status(401).json({ message: 'Token invalid or expired' })

    const tokenData = await createAndSaveAuthTokens(user, req)
    res.json(tokenData)
  } catch (error) {
    next(error)
  }
})

module.exports = router
