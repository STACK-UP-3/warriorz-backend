import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  DB_HOST,
  DB_NAME_TEST,
  DATABASE_URL,
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT,
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT,
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT,
    use_env_variable: 'DATABASE_URL',
    url: DATABASE_URL,

    // // Use a different storage. Default: none
    // seederStorage: "json",
    // // Use a different file name. Default: sequelize-data.json
    // seederStoragePath: "sequelizeData.json",

    // Use a different table name. Default: SequelizeData
    seederStorageTableName: 'sequelize_data',
  },
};
