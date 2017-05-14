var qiniu = require('qiniu')
var http = require('http')

qiniu.conf.ACCESS_KEY = 'Mnlo7G1Xa5PiY-Oxw_D9vzVIEqjRXKmB4n1uxPg-'
qiniu.conf.SECRET_KEY = 'aG9p_jQru8bQy7e_XY91WXYv1t2ObDms9VvT6zzf'

var bucket = 'ncuqzb'
var url = 'opxiq069b.bkt.clouddn.com'

exports.getToken = function () {
  var putPolicy = new qiniu.rs.PutPolicy(bucket)
  return putPolicy.token()
}