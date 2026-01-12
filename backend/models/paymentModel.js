const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentSessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Payment",
    timestamps: false,
  }
);

module.exports = Payment;
