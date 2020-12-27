const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, UserFollow, Player } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, displayName } = req.body;
    const user = await User.signup({ email, username, password, displayName });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.get(
  "/:username",
  asyncHandler(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: User,
          as: "Followers",
        },
        {
          model: User,
          as: "Following",
        },
        {
          model: Player,
          as: "FollowedPlayers",
        },
      ],
    });
    res.json({ user });
  })
);

router.get(
  "/:username/followers",
  asyncHandler(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: User,
          as: "Followers",
        },
      ],
    });
    const followers = user.Followers.filter(
      (follower) => follower.UserFollow.approved
    );
    res.json({ followers });
  })
);

router.get(
  "/:username/following",
  asyncHandler(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: User,
          as: "Following",
        },
      ],
    });
    const following = user.Following.filter(
      (follow) => follow.UserFollow.approved
    );
    res.json({ following });
  })
);

router.get(
  "/:username/players",
  asyncHandler(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Player,
          as: "FollowedPlayers",
        },
      ],
    });
    const followedPlayers = user.FollowedPlayers;
    res.json({ followedPlayers });
  })
);

router.post(
  "/:username/follow",
  asyncHandler(async (req, res) => {
    const { followerUserId, targetUserId } = req.body;
    console.log(followerUserId, targetUserId);
    await UserFollow.create({
      followerUserId,
      targetUserId,
      approved: true,
      viewed: false,
    });
    res.json({ message: "followed" });
  })
);

router.post(
  "/:username/unfollow",
  asyncHandler(async (req, res) => {
    const { followerUserId, targetUserId } = req.body;
    const follow = await UserFollow.findOne({
      where: {
        followerUserId,
        targetUserId,
      },
    });
    await follow.destroy();
    res.json({ message: "unfollowed" });
  })
);

module.exports = router;
