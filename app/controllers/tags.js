var Tag = require("../models/tag");

var tagsController = {
  tagFinder: function(req, res, next, id){
    Tag.findById(id, function(err, tag) {
      if (err) {
        res.send(err); // TODO: handle this better
      } else if (tag) {
        req.tag = tag;
        next();
      } else {
        res.send("No tag with such id"); // TODO: hanle this too
      }
    })
  },
  index: function(req, res){
    Tag.find({}, function(err, tags){
      if (err) {
        res.send(err);
      }
      res.json(tags);
    })
  },
  create: function(req, res) {
    var tag = new Tag({
      name: req.body.name,
      description: req.body.description
    });
    // tag.author = req.currentUser; TODO: Add logic for authorship assignment
    tag.save(function(err, tag){
      if (err) {
        res.send(err);
      }
      res.json(tag);
    });
  },
  show: function(req, res){
    res.json(req.tag);
  },
  update: function(req, res){
    req.tag.set({
      name: req.body.name,
      description: req.body.description,
    });
    req.tag.save(function(err, tag){
      if (err) {
        res.send(err);
      }
      res.json(tag);
    });
  },
  destroy: function(req, res){
    req.tag.remove(function(err, oldTag){
      if (err) res.send(err)
      res.send("deleted")
    });
  }
}
module.exports = tagsController;
