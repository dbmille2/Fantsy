"use strict";
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define(
    "Player",
    {
      name: DataTypes.STRING,
      tagName: DataTypes.STRING,
      teamName: DataTypes.STRING,
      position: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
    },
    {}
  );
  Player.associate = function (models) {
    // associations can be defined here
    Player.belongsToMany(models.User, {
      through: "PlayerFollow",
      foreignKey: "playerId",
      otherId: "userId",
      as: "PlayersWithFollows",
    });
  };
  return Player;
};
