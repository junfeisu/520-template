var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cons = require('consolidate')
var app = express()
var mongoose = require('mongoose')
var token = require('./route/token')
var template = require('./route/template')
var weixin = require('./route/weixin_conf')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'static/dist/')))
// app.use(formidable)

app.use('/api/token', token)
app.use('/api/template', template)
app.use('/api/conf', weixin)

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

var server = app.listen(8000, function () {
  console.log('Server start at 127.0.0.1:8000')
})
