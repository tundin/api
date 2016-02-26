var express = require("express");
var router = express.Router();
var postsController = require("../controllers/posts")
var tagsController = require("../controllers/tags")
var channelsController = require("../controllers/channels")


var env = require("../../env.js")

var jwt = require("express-jwt");

var jwtCheck = jwt({
  secret: new Buffer(env.auth0.secret, "base64"),
  audience: env.auth0.id
});

// Post Routes

router.param("post_id", postsController.postFinder);

router.route("/posts")
  .get(postsController.index)
  .post(jwtCheck, postsController.create);

router.route("/posts/:post_id")
  .get(postsController.show)
  .put(postsController.update)
  .delete(postsController.destroy)

// Tag Routes

router.param("tag_id", tagsController.tagFinder);

router.route("/tags")
  .get(tagsController.index)
  .post(tagsController.create);

router.route("/tags/:tag_id")
  .get(tagsController.show)
  .put(tagsController.update)
  .delete(tagsController.destroy)

// Channel Routes

router.param("channel_id", channelsController.channelFinder);

router.route("/channels")
  .get(channelsController.index)
  .post(channelsController.create);

router.route("/channels/:channel_id")
  .get(channelsController.show)
  .put(channelsController.update)
  .delete(channelsController.destroy)


module.exports = router;
