const express = require("express");
const asyncHandler = require("express-async-handler");

const { Player, Post, PlayerFollow, User } = require("../../db/models");

const router = express.Router();

router.get(
  "/:player/followers",
  asyncHandler(async (req, res) => {
    const playerName = req.params.player;
    const player = await Player.findOne({
      where: { tagName: playerName },
      include: [
        {
          model: User,
          as: "PlayersWithFollows",
        },
      ],
    });
    const playerFollowers = player.PlayersWithFollows;
    res.json({ playerFollowers });
  })
);

router.get(
  "/trending",
  asyncHandler(async (req, res) => {
    let players = await Player.findAll({
      include: [
        {
          model: Post,
          as: "PlayersWithTags",
        },
      ],
    });
    players.forEach((player) => {
      player.dataValues.tagCount = player.PlayersWithTags.length;
    });
    players.sort((a, b) =>
      a.dataValues.tagCount < b.dataValues.tagCount ? 1 : -1
    );
    players.forEach((player) => {
      delete player.dataValues.PlayersWithTags;
    });
    players = players.slice(0, 5);
    res.json({ players });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allPlayers = await Player.findAll();
    res.json({ allPlayers });
  })
);

module.exports = router;
