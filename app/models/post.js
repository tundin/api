var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  body: String,
  author: {type: Schema.Types.ObjectId, ref: "User"},
  tags: [{type: Schema.Types.ObjectId, ref: "Tag"}],
});

module.exports = mongoose.model("Post", postSchema);