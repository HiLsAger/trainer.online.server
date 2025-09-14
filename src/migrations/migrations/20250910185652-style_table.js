"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("styles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },
      background_color: {
        type: Sequelize.STRING(7),
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING(7),
        allowNull: true,
      },
      font_size: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      css: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });

    await queryInterface.addColumn("trainings", "style_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "styles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.removeColumn("trainings", "color");
    await queryInterface.addIndex("trainings", ["style_id"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("trainings", "style", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn("trainings", "style_id");
    await queryInterface.dropTable("styles");
  },
};
