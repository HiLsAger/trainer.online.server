"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("training_rooms", "style_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "sort",
      defaultValue: null,
      references: {
        model: "styles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.removeColumn("training_rooms", "color");
    await queryInterface.addIndex("training_rooms", ["style_id"]);

    await queryInterface.bulkInsert("permissions", [
      {
        name: "getTrainingRooms",
        description: "get training rooms",
      },
      {
        name: "updateTrainingRooms",
        description: "update training rooms",
      },
      {
        name: "deleteTrainingRooms",
        description: "delete training rooms",
      },
    ]);

    const permissions = await queryInterface.sequelize.query(
      "SELECT id, name FROM permissions WHERE name IN (?)",
      {
        replacements: [
          ["getTrainingRooms", "updateTrainingRooms", "deleteTrainingRooms"],
        ],
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    const roles = await queryInterface.sequelize.query(
      "SELECT id, name FROM role_groups WHERE name IN (?)",
      {
        replacements: [["Administrator", "SystemAdministrator"]],
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    let data = [];
    roles.forEach((role) => {
      permissions.forEach((permission) => {
        data.push({
          role_id: role.id,
          permission_id: permission.id,
          condition: "%",
          created_at: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert("roles_permissions", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("training_rooms", "style", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.removeColumn("training_rooms", "style_id");
  },
};
