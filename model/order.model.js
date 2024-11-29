const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Order = sequelize.define('Order', {
  userId: { type: DataTypes.STRING, allowNull: false },
  products: { type: DataTypes.JSON, allowNull: false }, 
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Pending' }, 
});

module.exports = Order;
