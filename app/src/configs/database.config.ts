/**
 * Database configuration for Sequelize ORM
 */

import process from 'node:process';
import { SequelizeOptions } from 'sequelize-typescript';

// Database configuration for Sequelize ORM
const sequelizeOptions: SequelizeOptions = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  logging: false,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10_000,
  },
  models: [__dirname + '/../models/*.model.js', __dirname + '/../models/*.model.ts'],
  modelMatch: (filename: string, member: string) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
};

export default sequelizeOptions;
