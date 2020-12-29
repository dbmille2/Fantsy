"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserPreference = sequelize.define(
    "UserPreference",
    {
      userId: DataTypes.INTEGER,
      theme: DataTypes.STRING,
      profilePicUrl: DataTypes.STRING,
      bannerUrl: DataTypes.STRING,
      bioRawData: DataTypes.STRING,
    },
    {}
  );
  UserPreference.associate = function (models) {
    // associations can be defined here
    UserPreference.belongsTo(models.User, { foreignKey: "userId" });
  };
  return UserPreference;
};
