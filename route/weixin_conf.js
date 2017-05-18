var express = require('express')
var route = express.Router()
var axios = require('axios')

var appId = 'wxc384c224cbf19404'
var sha1 = require('sha1')
var appSecret = '8d8a19ad25664293258f6eb1f315a43d'
var generateTime = ''
var ticket = ''

function getToken (url, res) {
  axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + appSecret)
    .then(function (result) {
      getTicket(result.data.access_token, url, res)
    })
    .catch(function (err) {
      res.status(500).json({
        type: 'get token failer',
        errMsg: err.data.errmsg
      })
    })
}

function getTicket (token, url, res) {
  axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi')
    .then(function (result) {
      generateTime = Math.floor(Date.now() / 1000)
      ticket = result.data.ticket
      generateSignature(result.data.ticket, url, res)
    })
    .catch(function (err) {
      res.status(500).json({
        type: 'get ticket failer',
        errMsg: err.data.errmsg
      })
    })
}


function generateSignature (ticket, url, res) {
  var noncestr = 'Wm3WZYTPz0wzccnW'
  var timestamp = Math.floor(Date.now() / 1000)
  var string = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' +
    timestamp + '&url=' + encodeURI(url)
  var signature = sha1(string)
  res.json({
    timestamp: timestamp,
    noncestr: noncestr,
    signature: signature
  })
}

route.get('/', function (req, res) {
  let timeGap = Math.floor(Date.now() / 1000) - generateTime
  if (!ticket || timeGap > 7200) {
    getToken(req.query.url, res)
  } else {
    generateSignature(ticket, req.url, res)
  }
})

module.exports = route
