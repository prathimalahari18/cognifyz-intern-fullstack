const router = require("express").Router();
const wrapAsync = require("../utils/wrapAsync.js");
const postsController = require("../controllers/postController.js");
const { validatePost } = require("../middleware/index.js");

router
  .route("/")
  .get(wrapAsync(postsController.allPosts))
  .post(validatePost, wrapAsync(postsController.createPost));

router.get("/new", postsController.postCreateForm);

router
  .route("/:id")
  .get(wrapAsync(postsController.showPost))
  .put(validatePost, wrapAsync(postsController.updatePost))
  .delete(wrapAsync(postsController.deletePost));

router.get("/:id/edit", wrapAsync(postsController.postEditForm));

module.exports = router;
