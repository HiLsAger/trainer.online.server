"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("schedules", "count_cell");

    await queryInterface.addColumn(
      "schedules",
      "duration",
      {
        type: Sequelize.TIME,
        allowNull: true,
      },
      {
        after: "start_time",
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("schedules", "duration");

    await queryInterface.addColumn(
      "schedules",
      "count_cell",
      {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
      {
        after: "always",
      },
    );
  },
};
