/**
 * Sequelize instance
 */

import { Sequelize } from 'sequelize-typescript';
import sequelizeOptions from '../configs/database.config';

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;
