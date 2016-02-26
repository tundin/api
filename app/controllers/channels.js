var Channel = require("../models/channel");

var channelsController = {
  channelFinder: function(req, res, next, id){
    Channel.findById(id, function(err, channel) {
      if (err) {
        res.send(err); // TODO: handle this better
      } else if (channel) {
        req.channel = channel;
        next();
      } else {
        res.send("No channel with such id"); // TODO: hanle this too
      }
    })
  },
  index: function(req, res){
    Channel.find({}, function(err, channels){
      if (err) {
        res.send(err);
      }
      res.json(channels);
    })
  },
  create: function(req, res) {
    var channel = new Channel({
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags
    });
    // channel.author = req.currentUser; TODO: Add logic for authorship assignment
    channel.save(function(err, channel){
      if (err) {
        res.send(err);
      }
      res.json(channel);
    });
  },
  show: function(req, res){
    res.json(req.channel);
  },
  update: function(req, res){
    req.channel.set({
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags
    });
    req.channel.save(function(err, channel){
      if (err) {
        res.send(err);
      }
      res.json(channel);
    });
  },
  destroy: function(req, res){
    req.channel.remove(function(err, oldChannel){
      if (err) res.send(err)
      res.send("deleted")
    });
  }
}
module.exports = channelsController;
