"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("settings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      value_type: {
        type: Sequelize.ENUM(
          "string",
          "number",
          "boolean",
          "datetime",
          "array",
          "json",
        ),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });

    await queryInterface.bulkInsert("settings", [
      {
        key: "timeSectionPeriod",
        value: "15",
        group: "general",
        value_type: "number",
        name: "Период секций времени в минутах",
        description:
          "Период времени в минутах на доске тренировок, период в списке выбора времени для тренировок",
        visible: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("settings");
  },
};
