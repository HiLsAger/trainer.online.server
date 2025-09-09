"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("roles_permissions", "condition", {
      type: Sequelize.ENUM("self", "priority", "%", ""),
      allowNull: false,
      defaultValue: "self",
      charset: "utf8mb4",
      collate: "utf8mb4_0900_ai_ci",
    });

    queryInterface.bulkInsert("permissions", [
      {
        name: "editStatus",
        description: "Edit Profile post",
      },
      {
        name: "getUsers",
        description: "Get users list",
      },
      {
        name: "updateUser",
        description: "Update user data",
      },
      {
        name: "deleteUser",
        description: "Delete user data",
      },
      {
        name: "getPermissions",
        description: "Get permissions list",
      },
      {
        name: "updatePermissions",
        description: "update permission",
      },
      {
        name: "deletePermissions",
        description: "delete permission",
      },
      {
        name: "getRoles",
        description: "get Roles Table",
      },
      {
        name: "updateRoles",
        description: "Update role row",
      },
      {
        name: "deleteRoles",
        description: "Delete role row",
      },
    ]);

    const AdministratorPermissionNameList = [
      "getUser",
      "editStatus",
      "getUsers",
      "updateUser",
      "deleteUser",
      "getPermissions",
      "updatePermissions",
      "getRoles",
      "updateRoles",
      "deleteRoles",
    ];

    const SystemAdministratorPermissionNameList = [
      ...AdministratorPermissionNameList,
      "deletePermissions",
    ];

    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM role_groups WHERE name IN ('SystemAdministrator', 'Administrator')`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    const roleMap = {};
    roles.forEach((role) => {
      roleMap[role.name] = role.id;
    });

    const permissions = await queryInterface.sequelize.query(
      `SELECT id, name FROM permissions WHERE name IN (?)`,
      {
        replacements: [
          [
            ...SystemAdministratorPermissionNameList,
            ...AdministratorPermissionNameList,
          ],
        ],
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    const permissionMap = {};
    permissions.forEach((permission) => {
      permissionMap[permission.name] = permission.id;
    });

    const createRolePermissions = (roleName, permissionNames) => {
      return permissionNames.map((name) => ({
        role_id: roleMap[roleName],
        permission_id: permissionMap[name],
        condition: "%",
        created_at: new Date(),
      }));
    };

    const rolesPermissions = [
      ...createRolePermissions(
        "SystemAdministrator",
        SystemAdministratorPermissionNameList,
      ),
      ...createRolePermissions(
        "Administrator",
        AdministratorPermissionNameList,
      ),
    ];
    await queryInterface.bulkDelete("roles_permissions", {});
    await queryInterface.bulkInsert("roles_permissions", rolesPermissions);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("permissions", {
      name: [
        "editStatus",
        "getUsers",
        "updateUser",
        "deleteUser",
        "getPermissions",
        "updatePermissions",
        "deletePermissions",
        "getRoles",
        "updateRoles",
        "deleteRoles",
      ],
    });
  },
};
