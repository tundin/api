var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  name: String,
  description: String
});

module.exports = mongoose.model("Tag", tagSchema);
