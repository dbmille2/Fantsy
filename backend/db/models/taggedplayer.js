'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaggedPlayer = sequelize.define('TaggedPlayer', {
    playerId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  TaggedPlayer.associate = function(models) {
    // associations can be defined here
  };
  return TaggedPlayer;
};