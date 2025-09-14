"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        login: "root",
        hash: "202cb962ac59075b964b07152d234b70",
        name: "root",
        system: 1,
        role_id: 3,
      },
      {
        login: "test",
        hash: "202cb962ac59075b964b07152d234b70",
        name: "Test User",
        system: 1,
        role_id: 1,
      },
    ]);

    await queryInterface.bulkUpdate("users",
      {
        hash: "202cb962ac59075b964b07152d234b70",
        name: "Administrator",
      },
      {
        login: "admin",
      },
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("users", {
      name: ["root", "test"],
    });
  },
};
