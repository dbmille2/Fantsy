const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  User,
  Post,
  TaggedUser,
  TaggedPlayer,
  StarredPost,
  UserPreference,
} = require("../../db/models");

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId, rawData, isReply } = req.body;
    const newPost = await Post.create({
      userId,
      rawData,
      isReply,
    });
    const fullPost = await Post.findOne({
      where: { id: newPost.id },
      include: [
        { model: User, include: [{ model: UserPreference }] },
        { model: User, as: "Stars" },
      ],
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

module.exports = router;
