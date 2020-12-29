"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.User, {
      through: "UserFollow",
      foreignKey: "followerUserId",
      otherKey: "targetUserId",
      as: "Following",
    });
    User.belongsToMany(models.User, {
      through: "UserFollow",
      foreignKey: "targetUserId",
      otherKey: "followerUserId",
      as: "Followers",
    });
    User.belongsToMany(models.Player, {
      through: "PlayerFollow",
      foreignKey: "userId",
      otherId: "playerId",
      as: "FollowedPlayers",
    });
    User.hasOne(models.UserPreference, { foreignKey: "userId" });
  };
  User.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, displayName, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      displayName,
      private: false,
      hashedPassword,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };
  return User;
};
