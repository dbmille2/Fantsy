const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  User,
  Post,
  Player,
  TaggedUser,
  TaggedPlayer,
  StarredPost,
  SavedPost,
  UserPreference,
} = require("../../db/models");
const {
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../awsS3.js");

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      userId,
      mentionedUsers,
      mentionedPlayers,
      rawData,
      contentUrl,
      isReply,
    } = req.body;
    const newPost = await Post.create({
      userId,
      rawData,
      isReply,
      contentUrl,
    });

    mentionedUsers.forEach(async (user) => {
      await TaggedUser.create({
        userId: user,
        postId: newPost.id,
        viewedNotification: false,
      });
    });
    mentionedPlayers.forEach(async (player) => {
      await TaggedPlayer.create({
        playerId: player,
        postId: newPost.id,
      });
    });
    const fullPost = await Post.findOne({
      where: { id: newPost.id },
      include: [{ model: User, include: [{ model: UserPreference }] }],
    });
    res.json({ fullPost });
  })
);

router.post(
  "/image",
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    let {
      userId,
      mentionedUsers,
      mentionedPlayers,
      rawData,
      isReply,
    } = req.body;
    const contentUrl = await singlePublicFileUpload(req.file);
    const newPost = await Post.create({
      userId,
      rawData,
      isReply,
      contentUrl,
    });
    mentionedUsers = [...mentionedUsers];
    mentionedPlayers = [...mentionedPlayers];
    mentionedUsers &&
      mentionedUsers.forEach(async (user) => {
        await TaggedUser.create({
          userId: Number(user),
          postId: newPost.id,
          viewedNotification: false,
        });
      });
    mentionedPlayers &&
      mentionedPlayers.forEach(async (player) => {
        await TaggedPlayer.create({
          playerId: Number(player),
          postId: newPost.id,
        });
      });
    const fullPost = await Post.findOne({
      where: { id: newPost.id },
      include: [{ model: User, include: [{ model: UserPreference }] }],
    });
    res.json({ fullPost });
  })
);

router.get(
  "/:id/feed",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "Following",
        },
      ],
    });
    let followingIds = user.Following.map((follow) => follow.id);
    followingIds = [...followingIds, id];
    const posts = await Post.findAll({
      where: {
        userId: followingIds,
      },
      include: [
        { model: User, include: [{ model: UserPreference }] },
        { model: User, as: "Stars" },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    res.json({ posts });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await Post.findAll({
      include: [
        { model: User, include: [{ model: UserPreference }] },
        { model: User, as: "Stars" },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    res.json({ posts });
  })
);

router.get(
  "/:id/feed/:page",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const page = Number(req.params.page);
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "Following",
        },
      ],
    });
    let followingIds = user.Following.map((follow) => follow.id);
    followingIds = [...followingIds, id];
    const posts = await Post.findAll({
      where: {
        userId: followingIds,
      },
      include: [
        { model: User, include: [{ model: UserPreference }] },
        { model: User, as: "Stars" },
      ],
      order: [["createdAt", "DESC"]],
      offset: (page - 1) * 20,
      limit: 20,
    });
    res.json({ posts });
  })
);

router.get(
  "/:id/likes",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Post,
          as: "StarredPosts",
          include: [
            { model: User, include: [{ model: UserPreference }] },
            { model: User, as: "Stars" },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    const posts = user.StarredPosts;
    res.json({ posts });
  })
);

router.put(
  "/:postId/star",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const { userId } = req.body;
    await StarredPost.create({
      postId,
      userId,
    });
    const updatedPost = await Post.findOne({
      where: { id: postId },
      include: [
        { model: User, include: [{ model: UserPreference }] },
        { model: User, as: "Stars" },
      ],
    });
    res.json({ updatedPost });
  })
);

router.put(
  "/:postId/unstar",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const { userId } = req.body;
    const post = await StarredPost.findOne({
      where: {
        postId,
        userId,
      },
    });
    await post.destroy();
    res.json({ message: "deleted" });
  })
);

router.put(
  "/:postId/save",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const { userId } = req.body;
    await SavedPost.create({
      postId,
      userId,
    });
    const updatedPost = await Post.findOne({
      where: { id: postId },
      include: [
        { model: User, include: [{ model: UserPreference }] },
        { model: User, as: "Stars" },
      ],
    });
    res.json({ updatedPost });
  })
);

router.put(
  "/:postId/unsave",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const { userId } = req.body;
    const post = await SavedPost.findOne({
      where: {
        postId,
        userId,
      },
    });
    await post.destroy();
    res.json({ message: "deleted" });
  })
);

router.get(
  "/:id/saved",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Post,
          as: "SavedPosts",
          include: [
            { model: User, include: [{ model: UserPreference }] },
            { model: User, as: "Stars" },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    const posts = user.SavedPosts;
    res.json({ posts });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const posts = await Post.findAll({
      where: {
        userId: id,
      },
      include: [
        { model: User, include: [{ model: UserPreference }] },
        { model: User, as: "Stars" },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    res.json({ posts });
  })
);

router.get(
  "/players/:id/all",
  asyncHandler(async (req, res) => {
    const playerId = req.params.id;
    const player = await Player.findOne({
      where: {
        id: playerId,
      },
      include: [
        {
          model: Post,
          as: "PlayersWithTags",
          include: [
            { model: User, include: [{ model: UserPreference }] },
            { model: User, as: "Stars" },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    const posts = player.PlayersWithTags;
    res.json({ posts });
  })
);

router.get(
  "/players/:id/following/:userId",
  asyncHandler(async (req, res) => {
    const playerId = req.params.id;
    const userId = req.params.userId;
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: User,
          as: "Following",
        },
      ],
    });
    let followingIds = user.Following.map((follow) => follow.id);
    const following = {};
    followingIds.forEach((follow) => {
      following[follow] = follow;
    });
    console.log(following);
    const player = await Player.findOne({
      where: {
        id: playerId,
      },
      include: [
        {
          model: Post,
          as: "PlayersWithTags",
          include: [
            { model: User, include: [{ model: UserPreference }] },
            { model: User, as: "Stars" },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    let posts = player.PlayersWithTags;
    posts = posts.filter((post) => {
      return following[post.userId] !== undefined;
    });
    res.json({ posts });
  })
);

router.get(
  "/explore/:userId",
  asyncHandler(async (req, res) => {
    const id = req.params.userId;
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Player,
          as: "FollowedPlayers",
        },
      ],
    });
    const followedPlayers = user.FollowedPlayers;
    let playerIds = user.FollowedPlayers.map((player) => player.id);
    const players = await Player.findAll({
      where: {
        id: playerIds,
      },
      include: [
        {
          model: Post,
          as: "PlayersWithTags",
          include: [
            { model: User, include: [{ model: UserPreference }] },
            { model: User, as: "Stars" },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    let posts = [];
    players.forEach((player) => {
      player.PlayersWithTags.forEach((post) => {
        posts.push(post);
      });
    });

    res.json({ posts });
  })
);

module.exports = router;
