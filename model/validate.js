var typeCheck = require('../util/type')

var validateInfo = {
  'template': ['username', 'lover_name', 'photo', 'experiences', 'profess']
}

function validate (route, body) {
  var result = {
    value: false,
    msg: ''
  }

  if (validateInfo.hasOwnProperty(route) && typeCheck.isObject(body)) {
    for (var key in body) {
      if (!body.hasOwnProperty(key)) {
        result.value = false
        result.msg = key + 'is necessary'
      }
    }
    result.value = true
  } else {
    result.msg = 'the data should be an object'
  }

  return result
}

module.exports = validate