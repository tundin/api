var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  _id: {type: String, match: /^[a-z0-9-]*$/},
  description: String
}, {
  timestamps: true
});

tagSchema.virtual("name").get(function() {
  return this._id
});

tagSchema.virtual("name").set(function(name) {
  this._id = name
});


module.exports = mongoose.model("Tag", tagSchema);
