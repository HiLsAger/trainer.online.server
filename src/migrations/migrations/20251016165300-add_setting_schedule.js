"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE settings 
      MODIFY COLUMN value_type 
      ENUM('string', 'number', 'boolean', 'datetime', 'array', 'json', 'schedule') 
      NOT NULL
    `);

    await queryInterface.bulkInsert("settings", [
      {
        key: "dayOfWeekInTable",
        value: "1111100",
        group: "general",
        value_type: "schedule",
        name: "Дни недели на доске тренировок",
        description: "Дни недели на доске тренировок",
        visible: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("settings", {
      key: ["dayOfWeekOnTable"],
    });

    const scheduleRecords = await queryInterface.sequelize.query(
      "SELECT COUNT(*) as count FROM settings WHERE value_type = 'schedule'",
      { type: Sequelize.QueryTypes.SELECT },
    );

    if (scheduleRecords[0].count === 0) {
      await queryInterface.sequelize.query(`
        ALTER TABLE settings 
        MODIFY COLUMN value_type 
        ENUM('string', 'number', 'boolean', 'datetime', 'array', 'json') 
        NOT NULL
      `);
    }
  },
};
