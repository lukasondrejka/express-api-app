/**
 * Setup helper function which run before the server starts
 */

import appConfig from '../configs/app.config';
import sequelize from './database.helper';

export default async function setup() {
  // Sync database
  await sequelize.sync();

  // Admin user creation
  if (appConfig.adminUser.email && appConfig.adminUser.password && !(await sequelize.model('User').findOne({ where: { email: appConfig.adminUser.email } }))) {
    await sequelize.model('User').scope('withPassword').create({
      email: appConfig.adminUser.email,
      firstName: 'Admin',
      lastName: 'Admin',
      password: appConfig.adminUser.password,
      isAdmin: 'true',
      status: 'active',
    });
  }
}
