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
    res.status(403).json({
      message: validateResult.msg
    })
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
      photo: req.body.photo,
      profess: req.body.profess
    }
    templateModel.findOneAndUpdate({template_id: req.body.template_id}, {$set: newTemplateMes}, function (err, template) {
      if (err) {
        res.status(500).json(err)
      } else {
        if (template.template_id === req.body.template_id) {
          res.json({
            status: 'OK',
            message: 'update success'
          })
        } else {
          res.status(400).json({
            status: 'Failer',
            message: 'update failer'
          })
        }
      }
    })
  } else {
    res.status(403).json({
      message: validateResult.msg
    })
  }
})

module.exports = route
