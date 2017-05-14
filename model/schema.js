var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/qzb')

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
        type: Date,
        required: false,
        default: Date.now()
      },
      recalls: [String]
    }
  }, {versionKey: false})

templateSchema.pre('save', function(next) {
  var self = this
  if (this.isNew) {
    topicGenerate.increase('Template', function(err, res) {
      if (err) {
        console.log('err is' + JSON.stringify(err))
      } else{
        self.template_id = res.value.next
        next()
      }
    })
  } else {
    next()
  }
})

exports.model = {
  Template: mongoose.model('Template', templateSchema)
}
