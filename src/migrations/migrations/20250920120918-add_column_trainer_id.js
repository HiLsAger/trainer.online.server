'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("trainings", "trainer_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: "description",
    });

    await queryInterface.addConstraint("trainings", {
      fields: ["trainer_id"],
      type: "foreign key",
      name: "fk_trainings_trainer_id",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "trainings",
      "fk_trainings_trainer_id",
    );

    await queryInterface.removeColumn("trainings", "trainer_id");
  },
};
