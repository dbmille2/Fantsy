const express = require("express");
const asyncHandler = require("express-async-handler");

const { Player, PlayerFollow, User } = require("../../db/models");

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
  "/",
  asyncHandler(async (req, res) => {
    const allPlayers = await Player.findAll();
    res.json({ allPlayers });
  })
);

module.exports = router;
