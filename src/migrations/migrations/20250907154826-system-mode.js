'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("role_groups", "system", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      after: "description",
    });

    await queryInterface.bulkInsert("role_groups", [
      {
        name: "SystemAdministrator",
        description: "system admin with root permissions",
        system: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkUpdate(
      "role_groups",
      {
        system: 1,
        updated_at: new Date(),
      },
      {
        name: ["NoRole", "Administrator"],
      },
    );

    await queryInterface.addColumn("users", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
      after: "name",
    });

    await queryInterface.addColumn("users", "system", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      after: "status",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("role_groups", "system");

    await queryInterface.removeColumn("users", "system");
  },
};
