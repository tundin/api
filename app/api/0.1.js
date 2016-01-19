var express = require("express");
var router = express.Router();
var postsController = require("../controllers/posts")


router.param("post_id", postsController.postFinder);

router.route("/posts")
  .get(postsController.index)
  .post(postsController.create);

router.route("/posts/:post_id")
  .get(postsController.show)
  .put(postsController.update)
  .delete(postsController.destroy)

module.exports = router;
