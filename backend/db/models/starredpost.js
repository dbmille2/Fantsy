'use strict';
module.exports = (sequelize, DataTypes) => {
  const StarredPost = sequelize.define('StarredPost', {
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  StarredPost.associate = function(models) {
    // associations can be defined here
  };
  return StarredPost;
};