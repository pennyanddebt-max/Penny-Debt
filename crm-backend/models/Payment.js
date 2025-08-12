// Payment Model
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    customerId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    renewal: DataTypes.BOOLEAN
  });
  return Payment;
};
