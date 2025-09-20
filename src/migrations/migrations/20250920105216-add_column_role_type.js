"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("role_groups", "type", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      after: "description",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("role_groups", "type");
  },
};
