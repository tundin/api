var mongoose = require("mongoose")
var Schema = mongoose.Schema

var translationSchema = new Schema({
  author: {type: String, req: true},
  _id: {type: Number, req: true, unique: true},
  embed_url: {type: String, req: true},
  published: {type: Date, req: true}
})

module.exports = mongoose.model("Translation", translationSchema)
