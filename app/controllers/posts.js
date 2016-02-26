var Post = require("../models/post");
var Tag = require("../models/tag")
var multiparty = require("multiparty");
var azure = require("azure-storage");
var blobService = azure.createBlobService();

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

    // File upload

    var blobService = azure.createBlobService();
    var form = new multiparty.Form();
    var post = new Post({ author: req.user.sub });
    var fileStatuses = {reqParsed: false};
    console.log("req: ========================");


    form.on("field", function(key, value) {
      console.log(key, ":", value);
      post[key] = (key === "tags") ? JSON.parse(value) : value;
    });

    form.on('part', function(part) {
      if (!part.filename) return
      fileStatuses[part.filename] = false;
      var size = part.byteCount;
      var name = req.user.sub + "/" + part.filename;
      var container = 'blobContainerName';

      // response sent after response recieved from azure -- this needs some work and the async could get messy quick
      blobService.createBlockBlobFromStream("images", name, part, size, function(error, result, azureResponse) {
        if (error) {
          fileStatuses[part.filename] = {"error": error}
        } else {
          fileStatuses[part.filename] = ("https://tundinmedia.blob.core.windows.net/images/" + result);
        }
        var fileNames = Object.keys(fileStatuses)
        if (fileStatuses.reqParsed && fileNames.every(function(fileName){return fileStatuses[fileName]})){

          post.imgUrls = fileNames.filter(function(fileName){
            var fileStatus = fileStatuses[fileName];
            if (typeof fileStatus !== "string" && fileStatus !== "reqParsed" ){
              res.status(500);
              res.append("Warning", "Error in uploading " + fileName);
              return false;
            } else {
              return true;
            }
          }).map(function(fileName){
            return fileStatuses[fileName];
          });
          console.log("post pre-save:", post);
          post.save(function(err, post){
            if (err) {
              res.status(500);
              res.json(err);
            } else {
              res.status(200);
              res.json(post);
            }
          });

        }
      });

    });

    form.on("close", function(){
      fileStatuses.reqParsed = true;
    })

    form.parse(req);
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
