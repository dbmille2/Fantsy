'use strict';
module.exports = (sequelize, DataTypes) => {
  const SavedPost = sequelize.define('SavedPost', {
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  SavedPost.associate = function(models) {
    // associations can be defined here
  };
  return SavedPost;
};