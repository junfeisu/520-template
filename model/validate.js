var typeCheck = require('../util/type')

var validateInfo = {
  'template': ['username', 'lover_name', 'photo', 'experiences', 'profess']
}

function validate (route, body) {
  var result = {
    value: true,
    msg: ''
  }

  if (validateInfo.hasOwnProperty(route) && typeCheck.isObject(body)) {
    for (var key in body) {
      if (body[key] === '') {
        result.value = false
        result.msg = key + 'is necessary'
      }
    }
  } else {
    result.value = false
    result.msg = 'the data should be an object'
  }

  return result
}

module.exports = validate