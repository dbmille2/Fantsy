"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userId: DataTypes.INTEGER,
      rawData: DataTypes.STRING,
      isReply: DataTypes.BOOLEAN,
      contentUrl: DataTypes.STRING,
    },
    {}
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.belongsToMany(models.User, {
      through: "StarredPost",
      otherKey: "userId",
      foreignKey: "postId",
      as: "Stars",
    });
    Post.belongsToMany(models.User, {
      through: "SavedPost",
      otherKey: "userId",
      foreignKey: "postId",
      as: "Saves",
    });
    Post.belongsToMany(models.Player, {
      through: "TaggedPlayer",
      otherKey: "playerId",
      foreignKey: "postId",
      as: "PlayerTags",
    });
    Post.belongsToMany(models.User, {
      through: "TaggedUser",
      otherKey: "userId",
      foreignKey: "postId",
      as: "UserTags",
    });
    Post.belongsToMany(models.Post, {
      through: "PostReply",
      foreignKey: "parentPostId",
      otherKey: "replyPostId",
      as: "ParentPost",
    });
    Post.belongsToMany(models.Post, {
      through: "PostReply",
      foreignKey: "replyPostId",
      otherKey: "parentPostId",
      as: "Replies",
    });
  };
  return Post;
};
