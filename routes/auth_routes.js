const express = require('express');
const router = express.Router();
const authController = require("../controllers/userController");
const checkToken = require("../middlewares/check_auth");

//registering user
router.post(
    "/register",
    authController.register
)

//authenticating user
router.post(
    "/authenticate",
    authController.authenticate
)

//following a user
router.patch(
    "/follow/:id",
    checkToken.checkToken,
    authController.followUser
)

//unfollowing a user
router.patch(
    "/unfollow/:id",
    checkToken.checkToken,
    authController.unfollowUser
)

//getting user details
router.get(
    "/user",
    checkToken.checkToken,
    authController.getUserDetails
)

//getting other user details
router.get(
    "/user/:id",
    checkToken.checkToken,
    authController.getOtherUserDetails
)

module.exports = router;