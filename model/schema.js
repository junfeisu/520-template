var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise
var templateGernate = require('./sequence')

var db = mongoose.connect('mongodb://ncuqzb:ncuqzb_@dds-bp164725c19e29c42.mongodb.rds.aliyuncs.com:3717,dds-bp164725c19e29c41.mongodb.rds.aliyuncs.com:3717/ncuqzb?replicaSet=mgset-2699659')
// var db = mongoose.connect('mongodb://ncuqzb:ncuqzb_@www.ncuos.cn:3717/ncuqzb')
db.connection.on('error', function (err) {
  console.log('数据库链接失败:' + err)
})

db.connection.on('open', function () {
  console.log('数据库链接成功')
})

var templateSchema = new Schema({
    username: {
      type: String,
      reuqired: true,
      unique: true
    },
    lover_name: {
      type: String,
      required: true
    },
    template_id: {
      type: Number,
      unique: true,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    experiences: {
      date_start: {
        type: Date,
        required: true
      },
      date_end: {
        type: String,
        required: false,
        default: 'forever'
      },
      recalls: [String]
    },
    profess: {
      type: String,
      required: true
    }
  }, {versionKey: false})

templateSchema.pre('save', function(next) {
  var self = this
  if (this.isNew) {
    templateGernate.increase('TemplateGenerate', function(err, res) {
      if (err) {
        console.log('err is' + JSON.stringify(err))
      } else{
        console.log('res is ' + JSON.stringify(res))
        self.template_id = res.value.next
        next()
      }
    })
  } else {
    next()
  }
})

module.exports = mongoose.model('Template', templateSchema)

