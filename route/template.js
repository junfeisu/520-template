var express = require('express')
var route = express.Router()
var validate = require('../model/validate')

route.get('/template', function (req, res) {
  if (err) {
    res.status(500).json(err)
  } else {

  }
})

route.post('/template', function (req, res) {
  if (validate('template', req.body)) {

  } else {
    res.status(403).json({
      msg: ''
    })
  }
})