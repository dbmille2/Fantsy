'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFollow = sequelize.define('UserFollow', {
    followerUserId: DataTypes.INTEGER,
    targetUserId: DataTypes.INTEGER,
    approved: DataTypes.BOOLEAN,
    viewed: DataTypes.BOOLEAN
  }, {});
  UserFollow.associate = function(models) {
    // associations can be defined here
  };
  return UserFollow;
};