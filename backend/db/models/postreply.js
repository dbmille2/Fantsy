'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostReply = sequelize.define('PostReply', {
    parentPostId: DataTypes.INTEGER,
    replyPostId: DataTypes.INTEGER
  }, {});
  PostReply.associate = function(models) {
    // associations can be defined here
  };
  return PostReply;
};