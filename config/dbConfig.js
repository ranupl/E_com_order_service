const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './config/.env' });

const sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql', 
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Connected Successfully--');

    await sequelize.sync({ force: false }); 
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


module.exports = { sequelize };
