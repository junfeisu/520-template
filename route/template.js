var express = require('express')
var route = express.Router()
var validate = require('../model/validate')
var templateModel = require('../model/schema')
var operate = require('../model/operate').mongoOperate

route.get('/', function (req, res) {
  if (req.query.template_id) {
    operate.search(templateModel, {template_id: req.query.template_id}, function (err, template) {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json(template[0])
      }
    })
  }
})

route.put('/add', function (req, res) {
  var validateResult = validate('template', req.body)
  if (validateResult.value) {
    operate.add(new templateModel(req.body), function (err, template) {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json(template)
      }
    })
  } else {
    res.status(403).json(validateResult.msg)
  }
})

route.post('/update', function (req, res) {
  var validateResult = validate('template', req.body)
  if (validateResult.value) {
    let newTemplateMes = {
      template_id: req.body.template_id,
      username: req.body.username,
      lover_name: req.body.lover_name,
      experiences: req.body.experiences,
      photo: req.body.photo
    }
    operate.update(templateModel, ({template_id: req.body.template_id}, {
      $set: newTemplateMes
    }), function (err, template) {
      if (err) {
        res.status(500).json(err)
      } else {
        if (template.n > 0) {
          res.json({
            status: 'OK',
            msg: 'update success'
          })
        }
      }
    })
  } else {
    res.status(403).json(validateResult.msg)
  }
})

module.exports = route
