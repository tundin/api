var mongoose = require("mongoose")
var Schema = mongoose.Schema

var translationSchema = new Schema({
  author: {type: String, req: true},
  _id: {type: Number, req: true, unique: true},
  source: {type: String, req: true},
  lang: {
    to: {type: String, req: true},
    from: {type: String, req: true}
  },
  published: {
    translation: {type: Date, req: true},
    source: {type: Date, req: true}
  }
})

module.exports = mongoose.model("Translation", translationSchema)
