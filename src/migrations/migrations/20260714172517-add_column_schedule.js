"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("schedules", "day_of_week", {
      type: Sequelize.ENUM(
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ),
      allowNull: false,
      defaultValue: "monday",
    });

    await queryInterface.addIndex("schedules", ["day_of_week"], {
      name: "schedules_day_of_week_idx",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("schedules", "schedules_day_of_week_idx");
    await queryInterface.removeColumn("schedules", "day_of_week");
  },
};
