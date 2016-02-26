var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  body: String,
  imgUrls: [{type: String, req: true}],
  author: {type: String, ref: "User"},
  tags: [{type: Schema.Types.String, ref: "Tag"}],
});

module.exports = mongoose.model("Post", postSchema);
