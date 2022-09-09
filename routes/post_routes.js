const express = require('express');
const router = express.Router();
const checkToken = require("../middlewares/check_auth");
const postController = require("../controllers/postController");

//Creating a post
router.patch(
    "/posts",
    checkToken.checkToken,
    postController.createPost
)

//Deleting a post
router.delete(
    "/posts/:id",
    checkToken.checkToken,
    postController.deletePost
)

//Adding like to the post
router.post(
    "/like/:id",
    checkToken.checkToken,
    postController.likePost
)

//Unliking a post
router.post(
    "/unlike/:id",
    checkToken.checkToken,
    postController.unlikePost
)

//Adding comment to post
router.post(
    "/comment/:id",
    checkToken.checkToken,
    postController.addComments
)

//Getting a particular post 
router.get(
    "/posts/:id",
    checkToken.checkToken,
    postController.getPost
)

//Returning posts in descending order sorted by time
router.get(
    "/all_posts",
    checkToken.checkToken,
    postController.getAllPosts
)

module.exports = router;