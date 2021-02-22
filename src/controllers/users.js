const express = require('express')
const bcrypt = require('bcryptjs')
const { createAndSaveAuthTokens } = require('../config/passport')
const User = require('../models/users')

const router = express.Router()

const checkIfAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).send({ message: "You don't have access to perform this action" })
  }
  next()
}

router.get('/', checkIfAdmin, async (req, res, next) => {
  try {
    const users = await User.find()
    return res.json(users)
  } catch (error) {
    return next(error)
  }
})

router.post('/', checkIfAdmin, async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    })

    await createAndSaveAuthTokens(user, req)
    return res.json(user)
  } catch (error) {
    return next(error)
  }
})

router.patch('/:id', checkIfAdmin, async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send({
        message: `user not found with id ${id}`,
      })
    }

    user.name = req.body.name
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    user.save()

    return res.json(user)
  } catch (err) {
    return next(err)
  }
})

router.delete('/:id', checkIfAdmin, async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send({
        message: `user not found with id ${id}`,
      })
    }

    await User.deleteOne({ _id: user._id })

    return res.json(user)
  } catch (error) {
    return next(error)
  }
})

module.exports = router
