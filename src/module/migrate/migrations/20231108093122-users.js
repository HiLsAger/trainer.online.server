'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      login: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      hash: {
        type: Sequelize.STRING(255),
      },
      name: {
        type: Sequelize.STRING(255),
      },
      role_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('auth_tokens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      token: {
        type: Sequelize.STRING(128),
        unique: true,
      },
      ip: {
        type: Sequelize.STRING(15),
      },
      created_at: {
        type: Sequelize.DATE,
      },
      life_time: {
        type: Sequelize.INTEGER,
      },
    });

    await queryInterface.createTable('role_groups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      description: {
        type: Sequelize.STRING(1024),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
    });

    await queryInterface.createTable('roles_permissions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'role_groups',
          key: 'id',
        },
      },
      permission_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'permissions',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('times', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      start_time: {
        type: Sequelize.STRING(10),
      },
      end_time: {
        type: Sequelize.STRING(10),
      },
      created_at: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('statuses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      value: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
    });

    await queryInterface.createTable('trainings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      description: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING(7),
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        unique: true,
      },
      description: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      count_days: {
        type: Sequelize.INTEGER,
      },
      count_trainings: {
        type: Sequelize.INTEGER,
      },
      free_count_trainings: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'statuses',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable('users_subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      subscription_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subscriptions',
          key: 'id',
        },
      },
      date_from: {
        type: Sequelize.DATE,
      },
      date_to: {
        type: Sequelize.DATE,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING(512),
        allowNul: true,
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'statuses',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable('training_rooms', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      sort: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      color: {
        type: Sequelize.STRING(7),
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable('schedules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      training_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'trainings',
          key: 'id',
        },
      },
      trainer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      training_room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'training_rooms',
          key: 'id',
        },
      },
      time_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'times',
          key: 'id',
        },
      },
      day_of_week: {
        type: Sequelize.INTEGER,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'statuses',
          key: 'id',
        },
      },
      price: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable('registers_trainings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      schedule_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'schedules',
          key: 'id',
        },
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'statuses',
          key: 'id',
        },
      },
      user_subscription_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users_subscriptions',
          key: 'id',
        },
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint('users', {
      fields: ['role_id'],
      type: 'FOREIGN KEY',
      references: {
        table: 'role_groups',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('roles_permissions', {
      type: 'unique',
      fields: ['role_id', 'permission_id'],
      name: 'unique_role_permission',
    });

    await queryInterface.addConstraint('registers_trainings', {
      type: 'check',
      name: 'user_subscription_id_or_price',
      fields: ['user_subscription_id', 'price'],
      where: {
        [Sequelize.Op.or]: [
          { user_subscription_id: { [Sequelize.Op.not]: null } },
          { price: { [Sequelize.Op.not]: null } },
        ],
      },
    });

    await queryInterface.bulkInsert('role_groups', [
      {
        name: 'NoRole',
        description: 'base role havent permissions',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Administrator',
        description: 'super admin, have all permissions',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('permissions', [
      {
        name: 'getUser',
        description: 'Gives the right to will get information about the users',
      },
    ]);

    await queryInterface.bulkInsert('roles_permissions', [
      {
        role_id: 2,
        permission_id: 1,
        created_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('users', [
      {
        login: 'admin',
        hash: '81dc9bdb52d04dc20036dbd8313ed055',
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('times', [
      {
        start_time: '07:00',
        end_time: '08:00',
        created_at: new Date(),
      },
      {
        start_time: '08:00',
        end_time: '09:00',
        created_at: new Date(),
      },
      {
        start_time: '09:00',
        end_time: '10:00',
        created_at: new Date(),
      },
      {
        start_time: '10:00',
        end_time: '11:00',
        created_at: new Date(),
      },
      {
        start_time: '11:00',
        end_time: '12:00',
        created_at: new Date(),
      },
      {
        start_time: '12:00',
        end_time: '13:00',
        created_at: new Date(),
      },
      {
        start_time: '13:00',
        end_time: '14:00',
        created_at: new Date(),
      },
      {
        start_time: '15:00',
        end_time: '16:00',
        created_at: new Date(),
      },
      {
        start_time: '16:00',
        end_time: '17:00',
        created_at: new Date(),
      },
      {
        start_time: '17:00',
        end_time: '18:00',
        created_at: new Date(),
      },
      {
        start_time: '18:00',
        end_time: '19:00',
        created_at: new Date(),
      },
      {
        start_time: '19:00',
        end_time: '20:00',
        created_at: new Date(),
      },
      {
        start_time: '07:00',
        end_time: '08:00',
        created_at: new Date(),
      },
      {
        start_time: '20:00',
        end_time: '21:00',
        created_at: new Date(),
      },
      {
        start_time: '21:00',
        end_time: '22:00',
        created_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('training_rooms', [
      {
        name: 'Зал №1',
        description: 'Стандартный зал',
        color: '#FFFFFF',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles_permissions');
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('role_groups');
    await queryInterface.dropTable('auth_tokens');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('registers_trainings');
    await queryInterface.dropTable('schedules');
    await queryInterface.dropTable('statuses');
    await queryInterface.dropTable('subscriptions');
    await queryInterface.dropTable('times');
    await queryInterface.dropTable('trainings');
    await queryInterface.dropTable('training_rooms');
    await queryInterface.dropTable('users_subscriptions	');
  },
};
