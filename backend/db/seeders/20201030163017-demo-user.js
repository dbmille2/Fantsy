"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "demo",
          displayName: "Demo User",
          hashedPassword: bcrypt.hashSync("password"),
          
        },
        {
          email: faker.internet.email(),
          username: "FakeUser1",
          displayName: "Fake User",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: "FakeUser2",
          displayName: "Fake User2",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["dbmille2", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
