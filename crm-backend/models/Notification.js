// Notification Model
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    type: DataTypes.STRING,
    recipientId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    message: DataTypes.STRING
  });
  return Notification;
};
