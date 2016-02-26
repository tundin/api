var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  _id: String,
  description: String
});

tagSchema.virtual("name").get(function() {
  return this._id
});

tagSchema.virtual("name").set(function(name) {
  this._id = name;
});


module.exports = mongoose.model("Tag", tagSchema);
