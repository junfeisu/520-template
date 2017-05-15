var express = require('express')
var getToken = require('../util/qiniu').getToken
var route = express.Router()

route.get('/', function (err, res) {
  if (err) {
    res.status(500).json(err)
  } else {
    var token = getToken()
    if (token) {
      res.send()
    } else {
      res.status(400).json('get token error')
    }
  }
})

module.exports = route