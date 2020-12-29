const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, Post, TaggedUser, TaggedPlayer } = require("../../db/models");

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
    res.json({ newPost });
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
      limit: 20,
    });
    res.json({ posts });
  })
);
module.exports = router;
