var express = require('express')
var getToken = require('../util/qiniu').getToken
var route = express.Router()

route.get('/', function (req, res) {
  var token = getToken()
  if (token) {
    res.send(token)
  } else {
    res.status(400).json('get token error')
  }
})

module.exports = route
