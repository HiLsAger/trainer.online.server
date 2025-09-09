// eslint-disable-next-line @typescript-eslint/no-var-requires
const { config } = require("dotenv");
config();

module.exports = {
  development: {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    migrationStorageTableName: "sequelize_migrations",
  },
  test: {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    migrationStorageTableName: "sequelize_migrations",
  },
  production: {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    migrationStorageTableName: "sequelize_migrations",
  },
};
