const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('AMSDemo', 'demo', 'Demo@123', {
  host: '192.168.2.78',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
