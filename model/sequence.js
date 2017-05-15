var mongoose = require('mongoose')
var Schema = mongoose.Schema

templateGenerateSchema = new Schema({
  _id: String,
  next: {
    type: Number,
    default: 1
  }
})

function increase (schemaName, callback) {
   return this.collection.findOneAndUpdate(
      {"_id": schemaName},
      {$inc: {"next": 1}}, 
      {upsert: true, returnNewDocument: true}, 
      callback
    )
}

templateGenerateSchema.statics.increase = increase

templateGenerate = mongoose.model('TemplateGenerate', templateGenerateSchema)

module.exports = templateGenerate

