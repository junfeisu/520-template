var typeCheck = {
  isArray: function (arr) {
    return arr instanceof Array
  },
  isObject: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  },
  isNumber: function (num) {
    return typeof num === 'number'
  }
}

module.exports = typeCheck
