"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("schedules", "trainer_id");
    await queryInterface.removeColumn("schedules", "time_id");
    await queryInterface.removeColumn("schedules", "day_of_week");
    await queryInterface.removeColumn("schedules", "status_id");
    await queryInterface.removeColumn("schedules", "deleted_at");

    await queryInterface.removeColumn("schedules", "price");

    await queryInterface.addColumn(
      "schedules",
      "price",
      {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      {
        after: "training_room_id",
      },
    );

    await queryInterface.addColumn(
      "schedules",
      "start_time",
      {
        type: Sequelize.TIME,
        allowNull: false,
      },
      {
        after: "start_date",
      },
    );

    await queryInterface.addColumn(
      "schedules",
      "end_date",
      {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      {
        after: "start_time",
      },
    );

    await queryInterface.addColumn(
      "schedules",
      "always",
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      {
        after: "end_date",
      },
    );

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

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("schedules", "count_cell");
    await queryInterface.removeColumn("schedules", "always");
    await queryInterface.removeColumn("schedules", "end_date");
    await queryInterface.removeColumn("schedules", "start_time");

    await queryInterface.addColumn("schedules", "price", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });

    await queryInterface.addColumn("schedules", "trainer_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("schedules", "time_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("schedules", "day_of_week", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("schedules", "status_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("schedules", "deleted_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
