const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const {
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../awsS3.js");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User,
  UserFollow,
  Player,
  PlayerFollow,
  UserPreference,
  Post,
} = require("../../db/models");

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
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, displayName } = req.body;
    const profilePicUrl = await singlePublicFileUpload(req.file);
    const user = await User.signup({ email, username, password, displayName });
    const userPreference = await UserPreference.create({
      userId: user.id,
      theme: "light",
      profilePicUrl,
      bannerUrl:
        "https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/official/en_us/products/2017/rethinking-our-default-profile-photo/Avatar-Blog4-Progress.png.img.fullhd.medium.png",
    });
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
          include: [{ model: UserPreference }],
        },
        {
          model: User,
          as: "Following",
          include: [{ model: UserPreference }],
        },
        {
          model: Player,
          as: "FollowedPlayers",
        },
        { model: UserPreference },
        {
          model: Post,
          as: "SavedPosts",
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
          include: [{ model: UserPreference }],
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

router.get(
  "/:userId/follow/:playerId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const playerId = req.params.playerId;
    await PlayerFollow.create({
      playerId,
      userId,
    });
    const player = await Player.findOne({ where: { id: playerId } });
    res.json({ player });
  })
);

router.delete(
  "/:userId/follow/:playerId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const playerId = req.params.playerId;
    const follow = await PlayerFollow.findOne({
      where: {
        playerId,
        userId,
      },
    });
    await follow.destroy();
    res.json({ message: "Unfollowed" });
  })
);

module.exports = router;
