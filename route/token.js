var express = require('express')
var getUpToken = require('../util/qiniu').getUpToken
var getDownToken = require('../util/qiniu').getDownToken
var route = express.Router()

route.get('/up', function (req, res) {
  var upToken = getUpToken()
  if (upToken) {
    res.send(upToken)
  } else {
    res.status(400).json({
      message: 'get token error'
    })
  }
})

route.post('/down', function (req, res) {
  if (req.body.url) {
    var downToken = getDownToken(req.body.url)
    if (downToken) {
      res.send(downToken)
    }
  } else {
    res.status(400).json({
      message: 'the url param is necessary and not null'
    })
  }
})

module.exports = route
