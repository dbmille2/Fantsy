"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UserPreferences", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
        },
      },
      theme: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "light",
      },
      profilePicUrl: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue:
          "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
      },
      bannerUrl: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue:
          "https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/official/en_us/products/2017/rethinking-our-default-profile-photo/Avatar-Blog4-Progress.png.img.fullhd.medium.png",
      },
      bioRawData: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("UserPreferences");
  },
};
