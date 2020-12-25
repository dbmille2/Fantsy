'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Players", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      tagName: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      teamName: {
        allowNull: false,
        type: Sequelize.STRING(5),
      },
      position: {
        allowNull: false,
        type: Sequelize.STRING(5),
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.STRING(250),
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
    return queryInterface.dropTable('Players');
  }
};