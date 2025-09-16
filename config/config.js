const path = require('path');

module.exports = {
  development: {
    username: 'demo',
    password: 'Demo@123',
    database: 'AMSDemo',
    host: '192.168.2.78',
    dialect: 'mysql',
    migrationStorage: 'json',
    migrationStoragePath: path.resolve(__dirname, '../migrations/.migrate.json')
  },
  production: {
    username: 'prod_user',
    password: 'Prod@123',
    database: 'ProdDB',
    host: '192.168.2.78',
    dialect: 'mysql',
    migrationStorage: 'json',
    migrationStoragePath: path.resolve(__dirname, '../migrations/.prod_migrate.json')
  }
};
