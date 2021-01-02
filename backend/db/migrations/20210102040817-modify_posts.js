"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Posts", // table name
      "contentUrl", // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn("Posts", "contentUrl"),
};
