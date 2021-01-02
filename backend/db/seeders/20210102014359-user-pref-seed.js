"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UserPreferences",
      [
        {
          userId: 1,
          theme: "light",
          profilePicUrl:
            "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
          bannerUrl:
            "https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/official/en_us/products/2017/rethinking-our-default-profile-photo/Avatar-Blog4-Progress.png.img.fullhd.medium.png",
          bioRawData: null,
        },

        {
          userId: 2,
          theme: "light",
          profilePicUrl:
            "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
          bannerUrl:
            "https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/official/en_us/products/2017/rethinking-our-default-profile-photo/Avatar-Blog4-Progress.png.img.fullhd.medium.png",
          bioRawData: null,
        },
        {
          userId: 3,
          theme: "light",
          profilePicUrl:
            "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
          bannerUrl:
            "https://cdn.cms-twdigitalassets.com/content/dam/blog-twitter/official/en_us/products/2017/rethinking-our-default-profile-photo/Avatar-Blog4-Progress.png.img.fullhd.medium.png",
          bioRawData: null,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("UserPreferences", null, {});
  },
};
