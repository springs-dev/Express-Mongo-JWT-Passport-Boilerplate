const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: 'user',
  },
  refreshToken: String,
  lastLoginAt: Date,
  lastGeoIP: String,
})

module.exports = mongoose.model('User', schema)
