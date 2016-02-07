var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var channelSchema = new Schema({
  name: String,
  description: String,
  author: {type: Schema.Types.ObjectId, ref: "User"},
  tags: [{type: Schema.Types.ObjectId, ref: "Tag"}]
});

module.exports = mongoose.model("Channel", channelSchema)
