const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, UserPreference } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

router.get(
  "/users/:query",
  asyncHandler(async (req, res) => {
    const query = req.params.query;
    const users = await User.findAll({
      where: {
        [Op.or]: [
          {
            displayName: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            username: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
      include: [{ model: UserPreference }],
      order: [["username", "ASC"]],
      limit: 20,
    });
    res.json({ users });
  })
);

module.exports = router;
