var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var channelSchema = new Schema({
  _id: {type: String, match: /^[a-zA-Z0-9_]*$/},
  description: String,
  author: {type: String, ref: "User"},
  tags: [{type: String, ref: "Tag"}]
}, {
  timestamps: true
});

channelSchema.virtual("name").get(function() {
  return this.id
})

channelSchema.virtual("name").set(function(name) {
  this._id = name
})

channelSchema.pre("validate", function(next) {
  this.name = this.name.trim().replace(" ", "_")
  next()
})



module.exports = mongoose.model("Channel", channelSchema)
