// Chat Model
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    timestamp: DataTypes.DATE
  });
  return Chat;
};
