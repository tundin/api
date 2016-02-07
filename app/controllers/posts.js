var Post = require("../models/post");

var postsController = {
  postFinder: function(req, res, next, id){
    Post.findById(id, function(err, post) {
      if (err) {
        res.send(err); // TODO: handle this better
      } else if (post) {
        console.log("postFinder found post with id ", id, ": ", post);
        req.post = post;
        next();
      } else {
        res.send("No post with such id"); // TODO: handle this too
      }
    })
  },
  index: function(req, res){ // TODO: refactor and lock down
    console.log("request query: ", req.query);
    if (Object.keys(req.query).length > 0){
      var searchQuery = {};
      if (req.query.posts) searchQuery._id = { $in : req.query.posts };
      if (req.query.tags) searchQuery.tags = { $in : req.query.tags };
      console.log("search query: ", searchQuery);
    }
    Post.find(searchQuery || {}, function(err, posts){
      if (err) {
        res.send(err);
      }
      res.json(posts);
    })
  },
  create: function(req, res) {
    console.log("Post request body:", req.body);
    var post = new Post();

    post.title = req.body.title;
    post.body = req.body.body;
    // post.author = req.currentUser; TODO: Add logic for authorship assignment
    // post.tags = req.body.tags;
    post.save(function(err, post){
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },
  show: function(req, res){
    res.json(req.post);
  },
  update: function(req, res){
    req.post.set({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags
    });
    req.post.save(function(err, post){
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },
  destroy: function(req, res){
    req.post.remove(function(err, oldPost){
      if (err) res.send(err)
      res.send("deleted")
    });
  }
}
module.exports = postsController;
