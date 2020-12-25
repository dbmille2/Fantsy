'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerFollow = sequelize.define('PlayerFollow', {
    playerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  PlayerFollow.associate = function(models) {
    // associations can be defined here
  };
  return PlayerFollow;
};