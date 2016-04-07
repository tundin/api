var express = require("express");
var router = express.Router();
var postsController = require("../controllers/posts")
var tagsController = require("../controllers/tags")
var channelsController = require("../controllers/channels")
var translationsController = require("../controllers/translations")

var env = require("../../env.js")

var jwt = require("express-jwt");
var multer = require("multer");

var storage = multer.memoryStorage()
var upload = multer({ storage: storage }) //careful w/ memory

var jwtCheckConfig = {
  secret: new Buffer(process.env.AUTH0_SECRET, "base64"),
  audience: process.env.AUTH0_ID
};

var jwtCheck = jwt(jwtCheckConfig)

var jwtCheckNotReq = jwt(Object.assign(
  {},
  jwtCheckConfig,
  { credentialsRequired: false }
))

// Post Routes

router.param("post_id", postsController.postFinder);

router.route("/posts")
  .get(postsController.index)
  .post(jwtCheck, upload.array('file[]', 5), postsController.create);

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
  .get(jwtCheckNotReq, channelsController.index)
  .post(channelsController.create);

router.route("/channels/:channel_id")
  .get(channelsController.show)
  .put(channelsController.update)
  .delete(channelsController.destroy)

// Translation Routes

router.route("/translations")
  .get(translationsController.index)

module.exports = router;
