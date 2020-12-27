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
            "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3054850.png&w=96&h=70&cb=1",
        },
        {
          name: "Josh Allen",
          tagName: "JoshAllen",
          teamName: "BUF",
          position: "QB",
          imgUrl:
            "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3918298.png&w=96&h=70&cb=1",
        },
        {
          name: "Tyreek Hill",
          tagName: "TyreekHill",
          teamName: "KC",
          position: "WR",
          imgUrl:
            "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3116406.png&w=96&h=70&cb=1",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Players", null, {});
  },
};
