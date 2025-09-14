"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("permissions", [
      {
        name: "getStyles",
        description: "get styles",
      },
      {
        name: "updateStyles",
        description: "update styles",
      },
      {
        name: "deleteStyles",
        description: "delete styles",
      },
    ]);

    const permissions = await queryInterface.sequelize.query(
      "SELECT id, name FROM permissions WHERE name IN (?)",
      {
        replacements: [["getStyles", "updateStyles", "deleteStyles"]],
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
    const permissionsToDelete = await queryInterface.sequelize.query(
      "SELECT id FROM permissions WHERE name IN (?)",
      {
        replacements: [["getStyles", "updateStyles", "deleteStyles"]],
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    const permissionIds = permissionsToDelete.map(
      (permission) => permission.id,
    );

    if (permissionIds.length > 0) {
      await queryInterface.bulkDelete("roles_permissions", {
        permission_id: permissionIds,
      });

      await queryInterface.bulkDelete("permissions", {
        id: permissionIds,
      });
    }
  },
};
