"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("settings", [
      {
        key: "startTimeTrainingSheet",
        value: "9:00",
        group: "general",
        value_type: "string",
        name: "Стартовое время на доске тренировок",
        description:
          "Стартовое время на доске тренировок, все тренировки указаны раньше этого времени не будут показаны на доске",
        visible: true,
      },
      {
        key: "endTimeTrainingSheet",
        value: "19:00",
        group: "general",
        value_type: "string",
        name: "Конечное время на доске тренировок",
        description:
          "Конечное время на доске тренировок, все тренировки указаны позже этого времени не будут показаны на доске",
        visible: true,
      },
    ]);

    await queryInterface.bulkInsert("permissions", [
      {
        name: "getSettings",
        description: "get settings",
      },
      {
        name: "updateSettings",
        description: "update settings",
      },
    ]);

    const permissions = await queryInterface.sequelize.query(
      "SELECT id, name FROM permissions WHERE name IN (?)",
      {
        replacements: [["getSettings", "updateSettings"]],
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
    const permissions = await queryInterface.sequelize.query(
      "SELECT id FROM permissions WHERE name IN (?)",
      {
        replacements: [["getSettings", "updateSettings"]],
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    if (permissions.length > 0) {
      const permissionIds = permissions.map((p) => p.id);

      await queryInterface.bulkDelete("roles_permissions", {
        permission_id: permissionIds,
      });
    }

    await queryInterface.bulkDelete("permissions", {
      name: ["getSettings", "updateSettings"],
    });

    await queryInterface.bulkDelete("settings", {
      key: ["startTimeTrainingSheet", "endTimeTrainingSheet"],
    });
  },
};
