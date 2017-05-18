var express = require('express')
var route = express.Router()
var axios = require('axios')

var appId = 'wxc384c224cbf19404'
var sha1 = require('sha1')
var appSecret = '8d8a19ad25664293258f6eb1f315a43d'

function getToken (res) {
  axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + appSecret)
    .then(function (result) {
      getTicket(result.data.access_token, res)
    })
    .catch(function (err) {
      res.status(500).json({
        type: 'get token failer',
        errMsg: err.data.errmsg
      })
    })
}

function getTicket (token, res) {
  axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi')
    .then(function (result) {
      generateSignature(result.data.ticket, res)
    })
    .catch(function (err) {
      res.status(500).json({
        type: 'get ticket failer',
        errMsg: err.data.errmsg
      })
    })
}


function generateSignature (ticket, res) {
  var noncestr = 'Wm3WZYTPz0wzccnW'
  var timestamp = Math.floor(Date.now() / 1000)
  var url = 'http://ncuqzb.ncuos.com'
  var string = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' +
    timestamp + '&url=' + url
  var signature = sha1(string)
  res.json({
    timestamp: timestamp,
    noncestr: noncestr,
    signature: signature
  })
}

route.get('/', function (req, res) {
  getToken(res)
})

module.exports = route
