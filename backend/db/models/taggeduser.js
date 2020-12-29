'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaggedUser = sequelize.define('TaggedUser', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    viewedNotification: DataTypes.BOOLEAN
  }, {});
  TaggedUser.associate = function(models) {
    // associations can be defined here
  };
  return TaggedUser;
};