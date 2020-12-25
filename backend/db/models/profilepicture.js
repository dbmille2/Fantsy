"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProfilePicture = sequelize.define(
    "ProfilePicture",
    {
      userId: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      current: DataTypes.BOOLEAN,
    },
    {}
  );
  ProfilePicture.associate = function (models) {
    // associations can be defined here
    ProfilePicture.belongsTo(models.User, { foreignKey: "userId" });
  };
  return ProfilePicture;
};
