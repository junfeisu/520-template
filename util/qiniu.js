var qiniu = require('qiniu')
var crypto = require('crypto')

qiniu.conf.ACCESS_KEY = 'Mnlo7G1Xa5PiY-Oxw_D9vzVIEqjRXKmB4n1uxPg-'
qiniu.conf.SECRET_KEY = 'aG9p_jQru8bQy7e_XY91WXYv1t2ObDms9VvT6zzf'

var bucket = 'ncuqzb'
var url = 'opzuvzih3.bkt.clouddn.com'

exports.getToken = function () {
  var putPolicy = new qiniu.rs.PutPolicy(bucket)
  return putPolicy.token()
}

exports.getDownloadToken = function (baseUrl) {
  var hamc = crypto.createHamc('sha1', qiniu.conf.ACCESS_KEY)
  hamc.update(flags)
  return hamc.digest('base64').replace(/\//g, '_').replace(/\+/g, '_')
}