var Post = require("../models/post");
var Tag = require("../models/tag");
var async = require("async")
var AWS = require("aws-sdk")


var mediaBucket = new AWS.S3({params: {Bucket: 'tundin-media'}})

function uploadToS3(file, callback) {
  mediaBucket
    .upload({
      ACL: 'public-read',
      Body: file.buffer,
      Key: `${file.uploader}/${file.originalname}`,
      ContentType: file.mimetype
    })
    .send(function(err, data) {
      // console.log(`START S3 response ${file.originalname}=======================`);
      // console.log("err:", err);
      // console.log("data:", data);
      // console.log(`END S3 response ${file.originalname}=======================`);
      if (err) return callback(err)
      console.log("Hooray! no error. response data: ", data);
      return callback(null, data)
    })
}


var postsController = {
  postFinder: function(req, res, next, id){
    Post.findById(id, function(err, post) {
      if (err) {
        res.send(err); // TODO: handle this better
      } else if (post) {
        req.post = post;
        next();
      } else {
        res.send("No post with such id"); // TODO: handle this too
      }
    })
  },
  index: function(req, res){ // TODO: refactor and lock down
    console.log("query: ", req.query);
    if (Object.keys(req.query).length > 0){
      var searchQuery = {};
      if (req.query.posts) searchQuery._id = { $in : req.query.posts };
      if (req.query.tags) searchQuery.tags = { $in : req.query.tags };
    }
    Post.find(searchQuery || {}, function(err, posts){
      if (err) {
        res.send(err);
      }
      res.json(posts);
    })
  },
  create: function(req, res) {
    var post = new Post({
      title: req.body.title,
      body: req.body.body,
      tags: JSON.parse(req.body.tags),
      author: req.user.sub
    })
    if (!req.files || req.files.length === 0) {
      return post.save(function(err, post){
        console.log("post save arguments (no imgUrls): ", arguments);
        if (err) return res.status(403).send(err).end()
        return res.json(post)
      })
    }
    // add uploader to file object
    var files = req.files.map(file => Object.assign({}, file, {uploader: req.user.sub}))
    async.map(files, uploadToS3, function(err, results) {
      console.log("err:", err);
      console.log("results:", results);
      if (err) return res.status(500).send(err).end() // How to go about partial successes
      console.log("CONSTRUCT NEW POST ==========================================");
      post.imgUrls = results.map(result => result.Location)
      post.save(function(err, post){
        console.log("post save arguments (w. imgUrls): ", arguments);
        if (err) return res.status(500).send(err).end()
        return res.json(post)
      })
    })
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
