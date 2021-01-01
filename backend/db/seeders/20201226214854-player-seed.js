"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Players",
      [
        {
          name: "Alvin Kamara",
          tagName: "AlvinKamara",
          teamName: "NO",
          position: "RB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16421/headshot/250x250.webp",
        },
        {
          name: "Josh Allen",
          tagName: "JoshAllen",
          teamName: "BUF",
          position: "QB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/17298/headshot/250x250.webp",
        },
        {
          name: "Tyreek Hill",
          tagName: "TyreekHill",
          teamName: "KC",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/15802/headshot/250x250.webp",
        },
        {
          name: "Davante Adams",
          tagName: "DavanteAdams",
          teamName: "GB",
          position: "WR",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/12123/headshot/250x250.webp",
        },
        {
          name: "Patrick Mahomes II",
          tagName: "PatrickMahomes",
          teamName: "KC",
          position: "QB",
          imgUrl:
            "https://images.fantasypros.com/images/players/nfl/16413/headshot/250x250.webp",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Players", null, {});
  },
};
